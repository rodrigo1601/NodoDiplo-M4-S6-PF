import { useState } from "react";
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useUserGames } from "../../../../hooks/userGames/useUserGames";
import { useAuth } from "../../../../hooks/users/useAuth";
import { handleDeleteFromCollection } from "../../../../utils/handleGame";
import Sidebar from "../../../layout/Sidebar";
import GameLibraryCard from "../GameLibraryCard";
import LoadingSpinner from "../../../common/LoadingSpinnes";
import { usePagination } from "../../../../hooks/UsePagination";
import Pagination from "../../../layout/Pagination";

const FILTERS = ["Todos", "Jugado", "En progreso", "Pendiente", "Abandonado"];

const Library = () => {
    useDocumentTitle("Library | GameShelf");

    const [activeFilter, setActiveFilter] = useState("Todos");
    const { userGames, updateUserGame, deleteUserGame, loading } = useUserGames();
    const { user } = useAuth();

    const libraryGames = userGames.filter(g => g.inLibrary);
    const filtered = activeFilter === "Todos"
        ? libraryGames
        : libraryGames.filter(g => g.status === activeFilter);

    const pagination = usePagination(filtered, 12);
    
    const handleFilter = (f) => {
        setActiveFilter(f);
        pagination.reset(); // ← vuelve a página 1 al cambiar filtro
    };

    const handleUpdate = async (userGameId, update) => {
        const res = await updateUserGame(userGameId, update);
        if (!res.success) alert(res.message);
    };

    const handleDelete = (userGame) =>
        handleDeleteFromCollection(user, userGame, deleteUserGame);

    return (
        <div className="bg-[#0f1117] min-h-screen text-white font-sans">
            <div className="border-b border-white/4 px-6 py-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">Collection</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">My Library</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    All the games you own or have played.
                </p>
            </div>

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-5">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            {/* Filters */}
                            <div className="flex items-center gap-2 mb-5 flex-wrap">
                                <span className="text-xs text-gray-600">Filtrar por status</span>
                                {FILTERS.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => handleFilter(f)}
                                        className={`text-xs px-3 py-1.5 rounded-md border transition-all
                                            ${activeFilter === f
                                                ? "border-violet-500/40 text-violet-400 bg-violet-500/10"
                                                : "border-white/7 text-gray-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10"
                                            }`}
                                    >
                                        {f}
                                        {f !== "Todos" && (
                                            <span className="ml-1.5 text-[10px] text-gray-600">
                                                {libraryGames.filter(g => g.status === f).length}
                                            </span>
                                        )}
                                    </button>
                                ))}
                                <span className="ml-auto text-xs text-gray-600">
                                    <span className="text-violet-500 font-semibold">{filtered.length}</span> games
                                </span>
                            </div>

                            {/* Empty state */}
                            {filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1a1d27] border border-white/6 rounded-xl">
                                    <span className="text-3xl mb-3">🎮</span>
                                    <p className="text-gray-400 font-semibold text-sm">Sin juegos aquí</p>
                                    <p className="text-gray-600 text-xs mt-1">
                                        {activeFilter === "Todos"
                                            ? "Compra juegos en la tienda para empezar a jugar."
                                            : `No tienes juegos con el status "${activeFilter}".`}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                        {pagination.paginated.map(ug => (
                                            <GameLibraryCard
                                                key={ug._id}
                                                userGame={ug}
                                                onUpdate={handleUpdate}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </div>
                                    <Pagination {...pagination}/>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Library;