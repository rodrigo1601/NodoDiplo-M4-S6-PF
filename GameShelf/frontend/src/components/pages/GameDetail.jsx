import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import LoadingSpinner from "../common/LoadingSpinner";
import { useGameBySlug } from "../../hooks/games/useGameBySlug";
import { useAuth } from "../../hooks/users/useAuth";
import { useUserGames } from "../../hooks/userGames/useUserGames";
import { useTheme } from "../../hooks/useTheme";
import { handleAddToCollection } from "../../utils/handleGame";
import ConfirmModal from "../common/ConfirmModal";

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-AR", { month: "short", day: "numeric", year: "numeric" });
};

const PlatformIcon = ({ miniLogo, isDark }) => (
    <img src={`/platforms/${miniLogo}.svg`} alt="" className={`w-fit h-5 opacity-70 ${isDark ? "invert" : ""}`} />
);

const GameDetail = () => {
    const { slug } = useParams();
    const { game, loading } = useGameBySlug(slug);
    const { user } = useAuth();
    const { isDark } = useTheme();
    const { userGames, createUserGame, updateUserGame, inLibrary, inWishlist } = useUserGames();
    const [showBuyModal, setShowBuyModal] = useState(false);

    if (loading) return <LoadingSpinner />;

    const enCollection = userGames.find(ug => ug.gameId._id === game?._id);
    const userGameId = enCollection?._id ?? null;
    const owned = inLibrary(game._id);
    const wishlisted = inWishlist(game._id);

    const uniquePlatforms = game.platforms.filter(
        (p, i, self) => i === self.findIndex(x => x.miniLogo === p.miniLogo)
    );

    // El gradiente del hero siempre usa el fondo de la página para fundir
    const heroBg = isDark ? "#0f1117" : "#f9fafb";

    return (
        <div className={`flex min-h-screen font-sans transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                {/* Hero */}
                <div className="relative w-full aspect-21/9 overflow-hidden">
                    <img src={game.portada} alt={game.nombre} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${heroBg} 0%, ${heroBg}99 20%, transparent 60%)` }} />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${heroBg}cc 0%, transparent 50%)` }} />

                    <div className="absolute bottom-0 left-0 right-0 px-7 pb-6">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {uniquePlatforms.map(p => (
                                <PlatformIcon key={p._id} miniLogo={p.miniLogo} isDark={isDark} />
                            ))}
                            <span className={`text-[11px] px-2 py-0.5 rounded-md border
                                ${isDark ? "text-gray-400 bg-white/8 border-white/10" : "text-gray-500 bg-gray-100 border-gray-200"}`}>
                                {formatDate(game.releaseDate)}
                            </span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border
                                ${game.ageRating >= 18 ? "text-red-400 bg-red-400/15 border-red-400/20"
                                : game.ageRating >= 13 ? "text-yellow-400 bg-yellow-400/15 border-yellow-400/20"
                                : "text-green-400 bg-green-400/15 border-green-400/20"}`}>
                                {game.ageRating ? `${game.ageRating}+` : "Todas las edades"}
                            </span>
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                            {game.nombre}
                        </h1>

                        <div className="flex flex-wrap gap-2 mb-5">
                            {[
                                { label: "Excelente",   value: game.ratingStats?.excelente,   color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25" },
                                { label: "Recomendado", value: game.ratingStats?.recomendado, color: "text-blue-400   bg-blue-500/15   border-blue-500/25"    },
                                { label: "Meh",         value: game.ratingStats?.meh,         color: "text-amber-400  bg-amber-500/15  border-amber-500/25"   },
                                { label: "Skip",        value: game.ratingStats?.skip,        color: "text-red-400    bg-red-500/15    border-red-500/25"     },
                            ].map(({ label, value, color }) => (
                                <div key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-semibold backdrop-blur-sm ${color}`}>
                                    <span className="text-[15px] font-extrabold">{value ?? 0}</span>
                                    {label}
                                </div>
                            ))}
                        </div>

                        {owned ? (
                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-fit bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-semibold text-sm backdrop-blur-sm">
                                <i className="ti ti-check text-base" />
                                En tu librería
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowBuyModal(true)}
                                    className="px-8 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-colors"
                                >
                                    Comprar
                                </button>
                                {wishlisted ? (
                                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 font-semibold text-sm backdrop-blur-sm">
                                        <i className="ti ti-heart text-base" />
                                        En lista de deseos
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAddToCollection("wishlist", user, game, createUserGame, updateUserGame, userGameId, owned, wishlisted)}
                                        className="px-5 py-2.5 flex items-center gap-2 rounded-xl bg-white/8 border border-white/12 text-gray-300 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30 transition-all text-sm font-medium backdrop-blur-sm"
                                    >
                                        <i className="ti ti-heart text-[14px]" />
                                        Agregar a deseos
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="grid grid-cols-[1fr_260px] gap-5 px-7 py-8">
                    <div className="space-y-8">
                        <Section title="Descripción" isDark={isDark}>
                            <p className={`text-[13px] leading-relaxed ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                                {game.description}
                            </p>
                        </Section>

                        <Section title="Requisitos del sistema" isDark={isDark}>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    ["Sistema operativo", game.requirements?.os,      false],
                                    ["Procesador",        game.requirements?.cpu,     false],
                                    ["Tarjeta gráfica",   game.requirements?.gpu,     false],
                                    ["RAM",               game.requirements?.ram,     false],
                                    ["Almacenamiento",    game.requirements?.storage, true ],
                                ].map(([k, v, full]) => (
                                    <div key={k} className={`border rounded-lg px-3 py-2.5 ${full ? "col-span-2" : ""}
                                        ${isDark ? "bg-[#1a1d27] border-white/5" : "bg-white border-gray-200"}`}>
                                        <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{k}</div>
                                        <div className={`text-[12px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>{v ?? "—"}</div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="Galería" isDark={isDark}>
                            <div className="grid grid-cols-2 gap-2">
                                {game.images?.map((img, i) => (
                                    <img key={i} src={img} alt=""
                                        className={`w-full aspect-video object-cover rounded-lg border transition-colors cursor-pointer
                                            ${isDark ? "border-white/4 hover:border-violet-500/30" : "border-gray-200 hover:border-violet-400"}`}
                                    />
                                ))}
                            </div>
                        </Section>
                    </div>

                    {/* Panel meta */}
                    <div className={`border rounded-xl p-4 h-fit sticky top-4
                        ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200"}`}>
                        <MetaRow label="Plataformas" isDark={isDark}>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {game.platforms.map(p => (
                                    p.isActive
                                        ? <Link key={p._id} to={`/category/platforms/${p.slug}`} className="text-[11px] px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:text-violet-300 transition-colors">{p.nombre}</Link>
                                        : <span key={p._id} className={`text-[11px] px-2 py-0.5 rounded-md border ${isDark ? "bg-white/4 border-white/6 text-gray-500" : "bg-gray-100 border-gray-200 text-gray-400"}`}>{p.nombre}</span>
                                ))}
                            </div>
                        </MetaRow>
                        <MetaRow label="Géneros" isDark={isDark}>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {game.genres.map(g => (
                                    g.isActive
                                        ? <Link key={g._id} to={`/category/genres/${g.slug}`} className="text-[11px] px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:text-violet-300 transition-colors">{g.nombre}</Link>
                                        : <span key={g._id} className={`text-[11px] px-2 py-0.5 rounded-md border ${isDark ? "bg-white/4 border-white/6 text-gray-500" : "bg-gray-100 border-gray-200 text-gray-400"}`}>{g.nombre}</span>
                                ))}
                            </div>
                        </MetaRow>
                        <MetaRow label="Fecha de lanzamiento" isDark={isDark}>
                            <span className={`text-[12px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>{formatDate(game.releaseDate)}</span>
                        </MetaRow>
                        <MetaRow label="Desarrollador" isDark={isDark}>
                            {game.developer?.isActive
                                ? <Link to={`/category/developers/${game.developer.slug}`} className="text-[12px] text-violet-400 hover:text-violet-300 transition-colors">{game.developer.nombre}</Link>
                                : <span className={`text-[12px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>{game.developer?.nombre}</span>
                            }
                        </MetaRow>
                        <MetaRow label="Clasificación de edad" isDark={isDark} last>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                                ${game.ageRating >= 18 ? "text-red-400 bg-red-400/10"
                                : game.ageRating >= 13 ? "text-yellow-400 bg-yellow-400/10"
                                : "text-green-400 bg-green-400/10"}`}>
                                {game.ageRating ? `${game.ageRating}+` : "Todas las edades"}
                            </span>
                        </MetaRow>
                    </div>
                </div>
            </main>

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
        </div>
    );
};

const Section = ({ title, children, isDark }) => (
    <div>
        <h2 className={`text-[14px] font-bold pb-2 mb-3 border-b ${isDark ? "text-gray-200 border-white/6" : "text-gray-700 border-gray-200"}`}>
            {title}
        </h2>
        {children}
    </div>
);

const MetaRow = ({ label, children, last, isDark }) => (
    <div className={`py-2.5 ${!last ? `border-b ${isDark ? "border-white/5" : "border-gray-100"}` : ""}`}>
        <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{label}</div>
        {children}
    </div>
);

export default GameDetail;