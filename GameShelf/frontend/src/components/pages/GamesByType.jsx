import Sidebar from "../layout/Sidebar";
import CardGame from "../common/CardGame";
import { useParams } from "react-router-dom";
import { useGamesByCategory } from "../../hooks/games/useGamesByCategory";
import { useTheme } from "../../hooks/useTheme";
import { usePagination } from "../../hooks/UsePagination";
import Pagination from "../layout/Pagination";

const CATEGORY_META = {
    platforms:  { label: "Plataforma",    eyebrow: "Plataforma"    },
    genres:     { label: "Género",        eyebrow: "Género"        },
    developers: { label: "Desarrollador", eyebrow: "Desarrollador" },
};

const GamesByType = () => {
    const { type, slug } = useParams();
    const { games, loading } = useGamesByCategory(type, slug);
    const { isDark } = useTheme();
    const meta = CATEGORY_META[type] ?? { label: "Categoría", eyebrow: "Categoría" };
    const displayName = slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    const pagination = usePagination(games, 12);

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className={`border-b px-6 py-6 ${isDark ? "border-white/4" : "border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">{meta.eyebrow}</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">{displayName}</h1>
                <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    Explorando todos los juegos en esta {meta.label.toLowerCase()}.
                </p>
            </div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={`rounded-xl overflow-hidden animate-pulse ${isDark ? "bg-[#1a1d27]" : "bg-gray-200"}`}>
                                    <div className={`aspect-video ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                    <div className="p-3 space-y-2">
                                        <div className={`h-3 rounded w-3/4 ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                        <div className={`h-2.5 rounded w-1/2 ${isDark ? "bg-white/4" : "bg-gray-300"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : games.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <img src="/icons/game-controller.svg" alt="" className={`h-12 mb-3 opacity-30 ${isDark ? "invert" : ""}`} />
                            <p className={`font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>No se encontraron juegos</p>
                            <p className={`text-sm mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>Intentá con una categoría diferente.</p>
                        </div>
                    ) : (
                        <>
                            <div className={`flex items-center mb-4 text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-violet-500 font-semibold mr-1">{games.length}</span> juegos encontrados
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {pagination.paginated.map(game => (
                                    <CardGame key={game._id} game={game} type={type} />
                                ))}
                            </div>
                            <Pagination {...pagination} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default GamesByType;