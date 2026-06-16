import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import GameForm from "../../../forms/game/GameForm";
import { useGames } from "../../../../hooks/games/useGames";
import { handleAddGame, handleEditGame } from "../../../../utils/admin/handleGame";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GameTable from "./GamesTable";
import { usePagination } from "../../../../hooks/UsePagination";
import AdminPagination from "../common/AdminPagination";

const GamesPage = () => {
    const { isDark } = useTheme();
    const { games, createGame, updateGame } = useGames();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const pagination = usePagination(games, 10);

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader
                title="Juegos"
                subtitle="Trabajá con el catálogo de juegos disponible en la plataforma."
                buttonText="+ Nuevo juego"
                onClick={() => setCreatingStatus(true)}
            />
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Todos los juegos</span>
                    <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        <span className="text-cyan-500 font-semibold">{games.length}</span> títulos
                    </span>
                </div>
                {games.length === 0 ? (
                    <div className={`flex items-center justify-center py-12 border rounded-xl
                        ${isDark ? "bg-white/2 border-white/6" : "bg-white border-gray-200"}`}>
                        <p className={`text-sm ${isDark ? "text-gray-600" : "text-gray-400"}`}>Sin juegos aún. Añadí el primero.</p>
                    </div>
                ) : (
                    <>
                        <GameTable data={pagination.paginated} setSelected={setSelectedGame} seteditingStatus={setEditingStatus} />
                        <AdminPagination {...pagination} />
                    </>
                )}
            </div>

            <AdminModal open={creatingStatus} title="Nuevo juego" onClose={() => setCreatingStatus(false)}>
                <GameForm label="Crear juego" onSubmit={(data) => handleAddGame(data, createGame, () => setCreatingStatus(false))} />
            </AdminModal>
            <AdminModal open={editingStatus} title="Editar juego" onClose={() => setEditingStatus(false)}>
                <GameForm label="Guardar cambios" game={selectedGame} onSubmit={(data) => handleEditGame(selectedGame._id, data, updateGame, () => setEditingStatus(false))} />
            </AdminModal>
        </div>
    );
};

export default GamesPage;