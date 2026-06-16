import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import GameForm from "../../../forms/game/GameForm";
import { useGames } from "../../../../hooks/games/useGames";
import { handleActivateGame, handleAddGame, handleEditGame } from "../../../../utils/admin/handleGame";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GameTable from "./GamesTable";
import { usePagination } from "../../../../hooks/UsePagination";
import AdminPagination from "../common/AdminPagination";
import AdminPageSkeleton from "../../../common/AdminPageSkeleton";
import LoadingOverlay from "../../../common/LoadingOverlay";

const EmptyState = ({ message, isDark }) => (
    <div className={`flex items-center justify-center py-12 border rounded-xl
        ${isDark ? "bg-white/2 border-white/6" : "bg-white border-gray-200"}`}>
        <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>{message}</p>
    </div>
);

const GamesPage = () => {
    const { isDark } = useTheme();
    const { allGames, loading, actionLoading, actionMessage, createGame, updateGame, activateGame } = useGames();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    const activeGames   = allGames.filter(g => g.isActive);
    const inactiveGames = allGames.filter(g => !g.isActive);

    const paginationActive = usePagination(activeGames, 10);
    const paginationInactive = usePagination(inactiveGames, 10);

    if (loading) return <AdminPageSkeleton />

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader
                title="Juegos"
                subtitle="Trabajá con el catálogo de juegos disponible en la plataforma."
                buttonText="+ Nuevo juego"
                onClick={() => setCreatingStatus(true)}
            />
            <div className="p-6 space-y-8">
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Activos</span>
                        <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                            <span className="text-cyan-500 font-semibold">{activeGames.length}</span> juegos
                        </span>
                    </div>
                    {activeGames.length === 0
                        ? <EmptyState message="Sin juegos activos." isDark={isDark} />
                        :   <>
                                <GameTable data={paginationActive.paginated} setSelected={setSelectedGame} seteditingStatus={setEditingStatus} handleActivate={handleActivateGame} activate={activateGame} />
                                <AdminPagination {...paginationActive} />    
                            </>
                    }
                </section>
                {inactiveGames.length > 0 && (
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-bold text-gray-500">Inactivos</span>
                            <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-gray-500 font-semibold">{inactiveGames.length}</span> juegos
                            </span>
                        </div>
                        <GameTable data={paginationInactive.paginated} setSelected={setSelectedGame} seteditingStatus={setEditingStatus} handleActivate={handleActivateGame} activate={activateGame} />
                    </section>
                )}
            </div>

            <AdminModal open={creatingStatus} title="Nuevo juego" onClose={() => setCreatingStatus(false)}>
                <GameForm label="Crear juego" onSubmit={(data) => handleAddGame(data, createGame, () => setCreatingStatus(false))} />
            </AdminModal>
            <AdminModal open={editingStatus} title="Editar juego" onClose={() => setEditingStatus(false)}>
                <GameForm label="Guardar cambios" game={selectedGame} onSubmit={(data) => handleEditGame(selectedGame._id, data, updateGame, () => setEditingStatus(false))} />
            </AdminModal>
            <LoadingOverlay
                open={actionLoading}
                message={actionMessage}
            />
        </div>
    );
};

export default GamesPage;