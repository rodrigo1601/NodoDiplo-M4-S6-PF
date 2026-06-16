import { useEffect, useState } from "react";

import { GameContext } from "./GameContext";

import { getGamesRequest, uploadGameRequest, updateGameRequest, activateGameRequest } from "../../services/gamesService";

export const GameProvider = ({ children }) => {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionMessage, setActionMessage] = useState("");

    useEffect(() => {

        const fetchGames = async () => {
            try {
                const res = await getGamesRequest();
                setGames(res.data.juegos);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();

    }, []);

    const activeGames = games.filter(g => g.isActive);
    const allGames = games;

    const createGame = async (data) => {
                try {

                    setActionLoading(true);
                    setActionMessage("Actualizandojuego...");
                    
                    const formData = new FormData();
    
                    formData.append("nombre", data.nombre);
                    formData.append("slug", data.slug);
                    formData.append("description", data.description);
                    formData.append("releaseDate", data.releaseDate);
                    formData.append("developer", data.developer);
                    formData.append("ageRating", data.ageRating);

                    formData.append("portada", data.portada[0]);

                    data.genres.forEach(id => {
                        formData.append("genres[]", id);
                    });

                    data.platforms.forEach(id => {
                        formData.append("platforms[]", id);
                    });

                    formData.append(
                        "requirements",
                        JSON.stringify(data.requirements)
                    );

                    Array.from(data.images || []).forEach(image => {
                        formData.append("images", image.file);
                    });
    
                    const res = await uploadGameRequest(formData);
        
                    const { juego } = res.data;
                    
                    setGames(prev => [...prev, juego]);
    
                    return { success: true };
                } catch (error) {
                    console.error("Error en registro:", error);
                    return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                } finally {
                    setActionLoading(false);
                }
    };

    const updateGame = async (id, data) => {
                    try {
        
                        setActionLoading(true);
                        setActionMessage("Actualizando juego...");
                        
                        const formData = new FormData();

                        formData.append("nombre", data.nombre);
                        formData.append("slug", data.slug);
                        formData.append("description", data.description);
                        formData.append("releaseDate", data.releaseDate);
                        formData.append("developer", data.developer);
                        formData.append("ageRating", data.ageRating);
                        formData.append("isActive", data.isActive);

                        formData.append("portada", data.portada[0]);

                        data.genres.forEach(id => {
                            formData.append("genres[]", id);
                        });

                        data.platforms.forEach(id => {
                            formData.append("platforms[]", id);
                        });

                        formData.append(
                            "requirements",
                            JSON.stringify(data.requirements)
                        );

                        const images = Array.isArray(data.images) ? data.images : [];

                        const existing = images.filter(i => i.type === "existing").map(i => i.value);
                        const newFiles = images.filter(i => i.type === "new").map(i => i.file);

                        formData.append(
                            "existingImages",
                            JSON.stringify(existing)
                        );

                        newFiles.forEach(file => {
                            formData.append("images", file);
                        });

                        
                        const res = await updateGameRequest(id, formData);
            
                        const { juego } = res.data;
        
                        setGames(prev =>
                            prev.map(game =>
                                game._id === juego._id
                                    ? juego
                                    : game
                            )
                        );
        
        
                        return { success: true };
                    } catch (error) {
                        console.error("Error en registro:", error);
                        return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                    } finally {
                        setActionLoading(false);
                    }
    };

    const activateGame = async (id, status) => {
        try {
                
            setActionMessage(status ? "Activando juego..." : "Desactivando juego...");
            setActionLoading(true);
            const formData = new FormData();
                
            formData.append("isActive", status);
                                
            const res = await activateGameRequest(id, status);
                    
            const { juego } = res.data;
                
            setGames(prev =>
                prev.map(game =>            
                            game._id === juego._id
                            ? juego
                            : game
                        )
            );
                
            return { success: true };
        } catch (error) {
            console.error("Error en registro:", error);
            return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
        } finally { 
            setActionLoading(false);
        }
    };

    return (
        <GameContext.Provider value={{
            games: activeGames,
            allGames,
            loading,
            actionLoading,
            actionMessage,
            createGame,
            updateGame,
            activateGame
        }}>
            {children}
        </GameContext.Provider>
    );
};