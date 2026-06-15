import { useState } from "react";
import GameForm from "../../../forms/game/GameForm";
import { useGames } from "../../../../hooks/games/useGames";
import { handleAddGame, handleEditGame } from "../../../../utils/admin/handleGame";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminModal from "../common/AdminModal";
import GameTable from "./GamesTable";
import { usePagination } from "../../../../hooks/UsePagination";
import AdminPagination from "../common/AdminPagination";

const GamesPage = () => {
    const { games, createGame, updateGame } = useGames();
    const [creatingStatus, setCreatingStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    const pagination = usePagination(games, 10);

    return (
        <div className="bg-[#0a0c10] min-h-screen text-white font-sans">
            <AdminPageHeader
                title="Juegos"
                subtitle="Trabaja con el catalogo de juegos disponible en la plataforma."
                buttonText="+ Nuevo juego"
                onClick={() => setCreatingStatus(true)}
            />

            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-bold text-white">Todos los juegos</span>
                    <span className="text-xs text-gray-600">
                        <span className="text-cyan-500 font-semibold">{games.length}</span> titulos
                    </span>
                </div>
                {games.length === 0 ? (
                    <div className="flex items-center justify-center py-12 bg-white/2 border border-white/6 rounded-xl">
                        <p className="text-gray-600 text-sm">Sin juegos aún. Añade el primero.</p>
                    </div>
                ) : (
                    <>
                    <GameTable
                        data={pagination.paginated}
                        setSelected={setSelectedGame}
                        seteditingStatus={setEditingStatus}
                    />
                    <AdminPagination {...pagination}/>
                    </>
                )}
            </div>

            <AdminModal open={creatingStatus} title="Nuevo juego" onClose={() => setCreatingStatus(false)}>
                <GameForm label="Crear juego" onSubmit={(data) => handleAddGame(data, createGame)} isCreate={true}/>
            </AdminModal>

            <AdminModal open={editingStatus} title="Editar juego" onClose={() => setEditingStatus(false)}>
                <GameForm
                    label="Guardad cambios"
                    game={selectedGame}
                    onSubmit={(data) => handleEditGame(selectedGame._id, data, updateGame)}
                />
            </AdminModal>
        </div>
    );
};

export default GamesPage;