import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../../common/ConfirmModal";

const GameWishlistCard = ({ userGame, onDelete }) => {
    const { gameId } = userGame;
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className="flex gap-3 bg-[#1a1d27] border border-white/6 rounded-xl overflow-hidden hover:border-violet-500/30 transition-all group p-2.5">
            
            {/* Cover */}
            <div className="w-32 shrink-0 rounded-lg overflow-hidden">
                <img
                    src={gameId.portada}
                    alt={gameId.nombre}
                    className="w-full aspect-video object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                    <p className="text-[13px] font-semibold text-gray-200 truncate group-hover:text-violet-400 transition-colors">
                        {gameId.nombre}
                    </p>

                    <p className="text-[11px] text-gray-500 mt-1">
                        Guardado para despues
                    </p>
                </div>

                <div className="flex gap-1.5 mt-2">
                    <Link
                        to={`/gameDetails/${gameId.slug}`}
                        className="text-[11px] px-2 py-0.5 rounded-md border border-white/[0.07]
                                   text-gray-500 hover:border-violet-500/40
                                   hover:text-violet-400 hover:bg-violet-500/10
                                   transition-all"
                    >
                        Ver
                    </Link>

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="text-[11px] px-2 py-0.5 rounded-md border border-white/[0.07]
                                   text-gray-500 hover:border-red-500/40
                                   hover:text-red-400 hover:bg-red-500/10
                                   transition-all ml-auto hover:cursor-pointer"
                    >
                        Remover
                    </button>
                    <ConfirmModal
                        open={showLogoutModal}
                        title="Remover"
                        message="¿Seguro que deseas remover este juego de tu colección?"
                        confirmText="Remover"
                        cancelText="Cancelar"
                        danger
                        onCancel={() => setShowLogoutModal(false)}
                        onConfirm={() => {
                            setShowLogoutModal(false);
                            onDelete(userGame);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameWishlistCard;