import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import ConfirmModal from "../../common/ConfirmModal";

const PREVIEW_LIMIT = 4;

const WishlistSection = ({ userGames, onDelete }) => {
    const { isDark } = useTheme();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const wishlistGames = userGames.filter(g => g.inWishlist);
    const preview = wishlistGames.slice(0, PREVIEW_LIMIT);
    const hasMore = wishlistGames.length > PREVIEW_LIMIT;

    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>En deseos</span>
                    <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        <span className="text-violet-500 font-semibold">{wishlistGames.length}</span> juegos
                    </span>
                </div>
                <Link to="/perfil/wishlist" className="text-[11px] text-violet-500 hover:text-violet-400 transition-colors">
                    Ver todos →
                </Link>
            </div>

            {wishlistGames.length === 0 ? (
                <div className={`flex flex-col items-center justify-center py-8 text-center border rounded-xl ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200"}`}>
                    <p className={`font-semibold text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Tu lista de deseos esta vacia</p>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>Marca juegos que quieras jugar luego.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {preview.map(ug => (
                            <div key={ug._id}>
                                <div className={`flex gap-3 border rounded-xl overflow-hidden hover:border-violet-500/30 transition-all group p-2.5
                                    ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200 shadow-sm"}`}>
                                    <div className="w-32 shrink-0 rounded-lg overflow-hidden">
                                        <img src={ug.gameId.portada} alt={ug.gameId.nombre} className="w-full aspect-video object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                                        <p className={`text-[13px] font-semibold truncate group-hover:text-violet-400 transition-colors ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                                            <Link to={`/gameDetails/${ug.gameId.slug}`}>{ug.gameId.nombre}</Link>
                                        </p>
                                        <button
                                            onClick={() => setShowLogoutModal(true)}
                                            className={`text-[11px] px-2 py-0.5 rounded-md border shrink-0 cursor-pointer transition-all
                                                hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10
                                                ${isDark ? "border-white/7 text-gray-500" : "border-gray-200 text-gray-400"}`}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                                <ConfirmModal
                                    open={showLogoutModal}
                                    title="Remover"
                                    message="¿Seguro que deseas remover este juego de tu lista de deseos?"
                                    confirmText="Remover"
                                    cancelText="Cancelar"
                                    danger
                                    onCancel={() => setShowLogoutModal(false)}
                                    onConfirm={() => { setShowLogoutModal(false); onDelete(ug); }}
                                />
                            </div>
                        ))}
                    </div>
                    {hasMore && (
                        <Link
                            to="/perfil/wishlist"
                            className={`mt-2 flex items-center justify-center w-full py-2 rounded-xl border text-xs transition-all
                                ${isDark
                                    ? "border-white/6 text-gray-500 hover:border-violet-500/30 hover:text-violet-400 hover:bg-violet-500/5"
                                    : "border-gray-200 text-gray-400 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50"
                                }`}
                        >
                            +{wishlistGames.length - PREVIEW_LIMIT} mas · Ver toda la lista de deseos →
                        </Link>
                    )}
                </>
            )}
        </section>
    );
};

export default WishlistSection;