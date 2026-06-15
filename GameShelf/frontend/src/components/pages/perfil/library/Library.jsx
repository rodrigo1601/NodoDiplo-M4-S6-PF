import { useState } from "react";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useUserGames } from "../../../../hooks/userGames/useUserGames";
import { useAuth } from "../../../../hooks/users/useAuth";
import { useTheme } from "../../../../hooks/useTheme";
import { handleDeleteFromCollection } from "../../../../utils/handleGame";
import Sidebar from "../../../layout/Sidebar";
import GameLibraryCard from "../GameLibraryCard";
import LoadingSpinner from "../../../common/LoadingSpinnes";
import { usePagination } from "../../../../hooks/UsePagination";
import Pagination from "../../../layout/Pagination";

const FILTERS = ["Todos", "Jugado", "En progreso", "Pendiente", "Abandonado"];

const Library = () => {
    useDocumentTitle("Librería | GameShelf");
    const [activeFilter, setActiveFilter] = useState("Todos");
    const { userGames, updateUserGame, deleteUserGame, loading } = useUserGames();
    const { user } = useAuth();
    const { isDark } = useTheme();

    const libraryGames = userGames.filter(g => g.inLibrary);
    const filtered = activeFilter === "Todos"
        ? libraryGames
        : libraryGames.filter(g => g.status === activeFilter);

    const pagination = usePagination(filtered, 12);

    const handleFilter = (f) => { setActiveFilter(f); pagination.reset(); };
    const handleUpdate = async (userGameId, update) => {
        const res = await updateUserGame(userGameId, update);
        if (!res.success) alert(res.message);
    };
    const handleDelete = (userGame) => handleDeleteFromCollection(user, userGame, deleteUserGame);

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className={`border-b px-6 py-6 ${isDark ? "border-white/4" : "border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">Colección</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">Mi librería</h1>
                <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    Todos los juegos que compraste o jugaste.
                </p>
            </div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5">
                    {loading ? <LoadingSpinner /> : (
                        <>
                            <div className="flex items-center gap-2 mb-5 flex-wrap">
                                <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>Filtrar por estado</span>
                                {FILTERS.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => handleFilter(f)}
                                        className={`text-xs px-3 py-1.5 rounded-md border transition-all cursor-pointer
                                            ${activeFilter === f
                                                ? "border-violet-500/40 text-violet-400 bg-violet-500/10"
                                                : isDark
                                                    ? "border-white/7 text-gray-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10"
                                                    : "border-gray-200 text-gray-400 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50"
                                            }`}
                                    >
                                        {f}
                                        {f !== "Todos" && (
                                            <span className={`ml-1.5 text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                                {libraryGames.filter(g => g.status === f).length}
                                            </span>
                                        )}
                                    </button>
                                ))}
                                <span className={`ml-auto text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                    <span className="text-violet-500 font-semibold">{filtered.length}</span> juegos
                                </span>
                            </div>

                            {filtered.length === 0 ? (
                                <div className={`flex flex-col items-center justify-center py-20 text-center border rounded-xl
                                    ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200"}`}>
                                    <span className="text-3xl mb-3">🎮</span>
                                    <p className={`font-semibold text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Sin juegos aquí</p>
                                    <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                        {activeFilter === "Todos"
                                            ? "Comprá juegos en la tienda para empezar."
                                            : `No tenés juegos con el estado "${activeFilter}".`}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {pagination.paginated.map(ug => (
                                            <GameLibraryCard key={ug._id} userGame={ug} onUpdate={handleUpdate} onDelete={handleDelete} />
                                        ))}
                                    </div>
                                    <Pagination {...pagination} />
                                </>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Library;