import { useEffect, useState } from "react";
import { getGamesTypeAndSlugRequest } from "../../services/gamesService";

export const useGamesByCategory = (type, slug) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!type || !slug) return;

        const fetchGames = async () => {
            try {
                setLoading(true);

                const res = await getGamesTypeAndSlugRequest(type, slug);

                setGames(res.data.juegos);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [type, slug]);

    return {
        games,
        loading,
    };
};