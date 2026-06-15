import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { handleAddToCollection } from "../../utils/handleGame";
import { useUserGames } from "../../hooks/userGames/useUserGames";
import { useAuth } from "../../hooks/users/useAuth";
import { useTheme } from "../../hooks/useTheme";
import LoadingSpinner from "./LoadingSpinnes";
import ConfirmModal from "./ConfirmModal";

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-AR", { month: "short", day: "numeric", year: "numeric" });
};

const PlatformIcon = ({ miniLogo, isDark }) => (
    <img src={`/platforms/${miniLogo}.svg`} alt="" className={`w-fit h-4 opacity-60 ${isDark ? "invert" : ""}`} />
);

const CardGame = ({ game }) => {
    const { user, loadingAuth } = useAuth();
    const { isDark } = useTheme();
    const { userGames, loading, createUserGame, updateUserGame, inLibrary, inWishlist } = useUserGames();
    const [showBuyModal, setShowBuyModal] = useState(false);

    if (loadingAuth || loading || !game) return <LoadingSpinner />;

    const enCollection = userGames.find(ug => ug.gameId._id === game._id);
    const userGameId = enCollection?._id ?? null;
    const owned = inLibrary(game._id);
    const wishlisted = inWishlist(game._id);

    const uniquePlatforms = game.platforms.filter(
        (p, i, self) => i === self.findIndex(x => x.miniLogo === p.miniLogo)
    );
    const genreList = game.genres.map(g => g.nombre).join(", ");

    return (
        <>
            <div className={`group w-full border rounded-xl overflow-hidden
                            hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-200
                            ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200 shadow-sm"}`}>

                {/* Cover */}
                <div className="relative">
                    <img
                        src={game.portada}
                        alt={game.nombre}
                        className="w-full aspect-video object-cover block"
                    />

                    {/* Overlay — gradiente sólido para que los badges sean legibles */}
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-2.5"
                        style={{
                            background:
                            "linear-gradient(to top, rgba(10,8,20,0.96) 0%, rgba(10,8,20,0.6) 45%, transparent 100%)",
                        }}
                        >
                        {/* ── BADGES (siempre visibles) ── */}
                        <div className="mb-2 space-y-1.5">
                            {owned && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md w-fit
                                            bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold">
                                <i className="ti ti-check text-[12px]" />
                                En librería
                            </div>
                            )}

                            {!owned && wishlisted && (
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md w-fit
                                            bg-red-500/20 border border-red-500/40 text-red-400 text-[11px] font-semibold">
                                <Heart className="w-3 h-3 fill-red-400" />
                                En deseos
                            </div>
                            )}
                        </div>

                        {/* ── BOTONES (solo hover) ── */}
                        {!owned && (
                            <div className="hidden group-hover:flex gap-1.5 transition-all">
                            <button
                                onClick={() => setShowBuyModal(true)}
                                className="flex-1 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500
                                        text-white text-[11px] font-bold transition-colors cursor-pointer"
                            >
                                Comprar
                            </button>

                            {!wishlisted && (
                                <button
                                onClick={() =>
                                    handleAddToCollection(
                                    "wishlist",
                                    user,
                                    game,
                                    createUserGame,
                                    updateUserGame,
                                    userGameId,
                                    owned,
                                    wishlisted
                                    )
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-lg
                                            bg-white/10 border border-white/20 text-gray-300
                                            hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40
                                            transition-all cursor-pointer shrink-0"
                                title="Añadir a deseos"
                                >
                                <Heart className="w-3.5 h-3.5" />
                                </button>
                            )}
                            </div>
                        )}
                    </div>

                    {/* Age rating */}
                    {game.ageRating && (
                        <span className={`absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-md
                            ${game.ageRating >= 18 ? "text-red-400 bg-black/60"
                            : game.ageRating >= 13 ? "text-yellow-400 bg-black/60"
                            : "text-green-400 bg-black/60"}`}>
                            {game.ageRating}+
                        </span>
                    )}
                </div>

                {/* Card body */}
                <div className={`px-3 pt-2.5 pb-3 ${isDark ? "" : "border-t border-gray-100"}`}>
                    <div className="flex gap-1.5 items-center mb-1.5">
                        {uniquePlatforms.map(p => (
                            <PlatformIcon key={p._id} miniLogo={p.miniLogo} isDark={isDark} />
                        ))}
                    </div>

                    <Link
                        to={`/gameDetails/${game.slug}`}
                        className={`block text-[13px] font-semibold hover:text-violet-400
                                   transition-colors leading-snug truncate mb-1.5
                                   ${isDark ? "text-gray-100" : "text-gray-800"}`}
                    >
                        {game.nombre}
                    </Link>

                    <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] truncate ${isDark ? "text-gray-600" : "text-gray-400"}`}>{genreList}</span>
                        <span className={`text-[11px] shrink-0 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{formatDate(game.releaseDate)}</span>
                    </div>
                </div>
            </div>

            <ConfirmModal
                open={showBuyModal}
                title="Comprar juego"
                message={`¿Querés agregar "${game.nombre}" a tu librería?`}
                confirmText="Comprar"
                cancelText="Cancelar"
                onCancel={() => setShowBuyModal(false)}
                onConfirm={() => {
                    setShowBuyModal(false);
                    handleAddToCollection("library", user, game, createUserGame, updateUserGame, userGameId, owned, wishlisted);
                }}
            />
        </>
    );
};

export default CardGame;