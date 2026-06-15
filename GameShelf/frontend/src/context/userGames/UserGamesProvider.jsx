import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useAuth } from "../../hooks/users/useAuth";
import { UserGamesContext } from "./UserGamesContext";

import { getUserGamesByUserRequest, createUserGameRequest, updateUserGameRequest, deleteUserGameRequest } from "../../services/userGamesService";

export const UserGamesProvider = ({ children }) => {

    const { user } = useAuth();

    const [userGames, setUserGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserGames = async (userId) => {

        setLoading(true);

        try {
            const res = await getUserGamesByUserRequest(userId);
            setUserGames(res.data.userGames);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user?.id) {
            setUserGames([]);
            setLoading(false);
            return;
        }
        fetchUserGames(user.id);
    }, [user]);

    
    const collectionMap = useMemo(() => {
        const map = new Map();

        userGames.forEach(userGame => {
            map.set(userGame.gameId._id, {
                inLibrary: userGame.inLibrary,
                inWishlist: userGame.inWishlist
            });
        });

        return map;
    }, [userGames]);

    const inLibrary = (gameId) => {
        return collectionMap.get(gameId)?.inLibrary || false;
    };

    const inWishlist = (gameId) => {
        return collectionMap.get(gameId)?.inWishlist || false;
    }

    const createUserGame = async (newUserGame) => {

        setLoading(true);

        try {
            const res = await createUserGameRequest(newUserGame);
            setUserGames(prev => [...prev, res.data.userGame]);

            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.response?.data?.mensaje || "Error al agregar el juego a tu colección" };
        } finally {
            setLoading(false);
        }
    };

    const updateUserGame = async (id, updatedUserGame) => {
        setLoading(true);
        try {
            const res = await updateUserGameRequest(id, updatedUserGame);
            setUserGames(prev => prev.map(ug => ug._id === id ? res.data.userGame : ug));
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.response?.data?.mensaje || "Error al actualizar el juego" };
        } finally {
            setLoading(false);
        }
    };

    const deleteUserGame = async (id) => {
        setLoading(true);
        try {
            await deleteUserGameRequest(id);
            setUserGames(prev => prev.filter(ug => ug._id !== id));
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.response?.data?.mensaje || "Error al eliminar el juego de tu colección" };
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserGamesContext.Provider value={{
            userGames,
            loading,
            inLibrary,
            inWishlist,
            fetchUserGames,
            createUserGame,
            updateUserGame,
            deleteUserGame
        }}>
            {children}
        </UserGamesContext.Provider>
    );
};