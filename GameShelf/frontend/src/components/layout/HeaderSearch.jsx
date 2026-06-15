import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGames } from "../../hooks/games/useGames";
import { useTheme } from "../../hooks/useTheme";

const HeaderSearch = () => {
    const { games } = useGames();
    const { isDark } = useTheme();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const filteredGames = useMemo(() => {
        if (!query.trim()) return [];
        return games
            .filter(g => g.nombre.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => {
                const aStarts = a.nombre.toLowerCase().startsWith(query.toLowerCase());
                const bStarts = b.nombre.toLowerCase().startsWith(query.toLowerCase());
                return bStarts - aStarts;
            })
            .slice(0, 6);
    }, [query, games]);

    return (
        <div ref={searchRef} className="relative hidden md:block w-full max-w-sm">
            {/* Input */}
            <div className={`flex items-center gap-2 border rounded-lg px-3 py-2 transition-colors
                ${isDark
                    ? `bg-[#1a1d27] ${open && query.trim() ? "border-violet-500/30" : "border-white/6"}`
                    : `bg-gray-100 ${open && query.trim() ? "border-violet-400" : "border-gray-200"}`
                }`}>
                <svg className={`w-3.5 h-3.5 shrink-0 ${isDark ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Buscar juegos..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                    onFocus={() => { if (query.trim()) setOpen(true); }}
                    className={`bg-transparent outline-none w-full text-[13px] ${isDark ? "text-gray-200 placeholder:text-gray-600" : "text-gray-800 placeholder:text-gray-400"}`}
                />
                {query && (
                    <button
                        onClick={() => { setQuery(""); setOpen(false); }}
                        className={`text-xs shrink-0 transition-colors ${isDark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}
                    >✕</button>
                )}
            </div>

            {/* Dropdown */}
            {open && query.trim() && (
                <div className={`absolute top-full mt-2 w-full border rounded-xl shadow-2xl overflow-hidden z-50
                    ${isDark ? "bg-[#1a1d27] border-white/[0.07]" : "bg-white border-gray-200"}`}>
                    {filteredGames.length > 0 ? (
                        <>
                            <div className="px-3 pt-2.5 pb-1">
                                <span className={`text-[10px] font-bold tracking-widest uppercase ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                    Resultados
                                </span>
                            </div>
                            {filteredGames.map((game) => (
                                <Link
                                    key={game._id}
                                    to={`/gameDetails/${game.slug}`}
                                    onClick={() => { setOpen(false); setQuery(""); }}
                                    className={`flex items-center gap-3 px-3 py-2.5 transition-colors group
                                        ${isDark ? "hover:bg-white/4" : "hover:bg-gray-50"}`}
                                >
                                    <div className="w-20 shrink-0 rounded-md overflow-hidden">
                                        <img src={game.portada} alt={game.nombre} className="w-full aspect-video object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-[13px] font-semibold truncate group-hover:text-violet-400 transition-colors
                                            ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                                            {game.nombre}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className={`text-[11px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                                {game.releaseDate?.split("T")[0] ?? "—"}
                                            </span>
                                            {game.genres?.[0] && (
                                                <>
                                                    <span className={isDark ? "text-gray-700" : "text-gray-300"}>·</span>
                                                    <span className={`text-[11px] truncate ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                                        {game.genres[0].nombre}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`text-xs shrink-0 transition-colors group-hover:text-violet-500
                                        ${isDark ? "text-gray-700" : "text-gray-300"}`}>→</span>
                                </Link>
                            ))}
                            <div className={`border-t px-3 py-2 ${isDark ? "border-white/5" : "border-gray-100"}`}>
                                <span className={`text-[11px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                    <span className="text-violet-500 font-semibold">{filteredGames.length}</span> resultados para "{query}"
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <p className={`text-sm font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}>Sin resultados</p>
                            <p className={`text-xs mt-1 ${isDark ? "text-gray-700" : "text-gray-300"}`}>Probá con otro término.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeaderSearch;