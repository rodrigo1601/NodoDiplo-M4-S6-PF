import { useState, useMemo } from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import Sidebar from "../layout/Sidebar";
import CardGame from "../common/CardGame";
import { useGames } from "../../hooks/games/useGames";
import { useAuth } from "../../hooks/users/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { usePagination } from "../../hooks/UsePagination";
import Pagination from "../layout/Pagination";

const SORT_OPTIONS = [
    { label: "Novedades",       key: "nuevo"       },
    { label: "Fecha de salida", key: "releaseDate" },
    { label: "Nombre",          key: "name"        },
];

const sortGames = (games, sortBy) => {
    const sorted = [...games];
    switch (sortBy) {
        case "releaseDate": return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        case "name":        return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
        default:            return sorted;
    }
};

const Home = () => {
    useDocumentTitle("Tienda | GameShelf");
    const { games, loading } = useGames();
    const { isAdult } = useAuth();
    const { isDark } = useTheme();
    const [sortBy, setSortBy] = useState("nuevo");

    const visibleGames = useMemo(() => {
        const filtered = games.filter(game => isAdult || game.ageRating < 17);
        return sortGames(filtered, sortBy);
    }, [games, isAdult, sortBy]);

    const pagination = usePagination(visibleGames, 12);

    const handleSort = (key) => { setSortBy(key); pagination.reset(); };

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className={`border-b px-6 py-6 ${isDark ? "border-white/4" : "border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">Destacados</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">Nuevos y tendencia</h1>
                <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    Descubrí los últimos lanzamientos y los juegos más jugados ahora mismo.
                </p>
            </div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={`rounded-xl overflow-hidden animate-pulse ${isDark ? "bg-[#1a1d27]" : "bg-gray-200"}`}>
                                    <div className={`aspect-video ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                    <div className="p-3 space-y-2">
                                        <div className={`h-3 rounded w-3/4 ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                        <div className={`h-2.5 rounded w-1/2 ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>Ordenar por</span>
                                {SORT_OPTIONS.map(({ label, key }) => (
                                    <button
                                        key={key}
                                        onClick={() => handleSort(key)}
                                        className={`text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer
                                            ${sortBy === key
                                                ? "border-violet-500/40 text-violet-400 bg-violet-500/10"
                                                : isDark
                                                    ? "border-white/7 text-gray-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10"
                                                    : "border-gray-200 text-gray-400 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50"
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                                <span className={`ml-auto text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                    <span className="text-violet-500 font-semibold">{visibleGames.length}</span> juegos
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {pagination.paginated.map(game => <CardGame key={game._id} game={game} />)}
                            </div>
                            <Pagination {...pagination} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;