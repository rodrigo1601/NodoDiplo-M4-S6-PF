import { useEffect, useState } from "react";

import { GenreContext } from "./GenreContext";

import { getGenresRequest, uploadGenreRequest, updateGenreRequest, activateGenreRequest } from "../../services/genresService";

export const GenreProvider = ({ children }) => {

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchGenres = async () => {
            try {
                const res = await getGenresRequest();
                setGenres(res.data.generos);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();

    }, []);

    const activeGenres = genres.filter(g => g.isActive);
    const allGenres = genres;

    const createGenre = async (data) => {
                try {
    
                    const formData = new FormData();
    
                    formData.append("nombre", data.nombre);
                    formData.append("slug", data.slug);
                    formData.append("descripcion", data.descripcion);
                    formData.append("logo", data.logo[0]);
    
                    const res = await uploadGenreRequest(formData);
        
                    const { genero } = res.data;
    
                    setGenres(prev => [...prev, genero]);
    
                    return { success: true };
                } catch (error) {
                    console.error("Error en registro:", error);
                    return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                }
    };

    const updateGenre = async (id, data) => {
                try {
    
                    const formData = new FormData();
    
                    formData.append("nombre", data.nombre);
                    formData.append("slug", data.slug);
                    formData.append("descripcion", data.descripcion);
                    formData.append("isActive", data.isActive);
    
                    if (data.logo?.[0]){
                        formData.append("logo", data.logo[0]);
                    }
                    
                    const res = await updateGenreRequest(id, formData);
        
                    const { genero } = res.data;
    
                    setGenres(prev =>
                        prev.map(genre =>
                            genre._id === genero._id
                                ? genero
                                : genre
                        )
                    );
    
    
                    return { success: true };
                } catch (error) {
                    console.error("Error en registro:", error);
                    return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                }
    };

    const activateGenre = async (id, status) => {
                try {
    
                    const formData = new FormData();
    
                    formData.append("isActive", status);
                    
                    const res = await activateGenreRequest(id, status);
        
                    const { genero } = res.data;
    
                    setGenres(prev =>
                        prev.map(genre =>
                            genre._id === genero._id
                                ? genero
                                : genre
                        )
                    );
    
                    return { success: true };
                } catch (error) {
                    console.error("Error en registro:", error);
                    return { success: false, message: error.response?.data?.mensaje || "Error en registro" };
                }
    };

    return (
        <GenreContext.Provider value={{
            genres: activeGenres,
            allGenres,
            loading,
            createGenre,
            updateGenre,
            activateGenre
        }}>
            {children}
        </GenreContext.Provider>
    );
};