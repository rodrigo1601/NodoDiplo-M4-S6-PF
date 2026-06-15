import { useEffect, useState } from "react";
import { getGameSlugRequest } from "../../services/gamesService";

export const useGameBySlug = (slug) => {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchGame = async () => {
            try {
                setLoading(true);

                const res = await getGameSlugRequest(slug);

                setGame(res.data.juego);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [slug]);

    return {
        game,
        loading,
    };
};