import { Link } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import GameLibraryCard from "./GameLibraryCard";

const PREVIEW_LIMIT = 4;

const LibrarySection = ({ userGames, onUpdate, onDelete }) => {
    const { isDark } = useTheme();
    const libraryGames = userGames.filter(g => g.inLibrary);
    const preview = libraryGames.slice(0, PREVIEW_LIMIT);
    const hasMore = libraryGames.length > PREVIEW_LIMIT;

    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Libreria</span>
                    <span className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                        <span className="text-violet-500 font-semibold">{libraryGames.length}</span> juegos
                    </span>
                </div>
                <Link to="/perfil/library" className="text-[11px] text-violet-500 hover:text-violet-400 transition-colors">
                    Ver todos →
                </Link>
            </div>

            {libraryGames.length === 0 ? (
                <div className={`flex flex-col items-center justify-center py-8 text-center border rounded-xl ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200"}`}>
                    <p className={`font-semibold text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Tu libreria esta vacia</p>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>Añade juegos de la tienda para empezar a jugar.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        {preview.map(ug => (
                            <GameLibraryCard key={ug._id} userGame={ug} onUpdate={onUpdate} onDelete={onDelete} />
                        ))}
                    </div>
                    {hasMore && (
                        <Link
                            to="/perfil/library"
                            className={`mt-2 flex items-center justify-center w-full py-2 rounded-xl border text-xs transition-all
                                ${isDark
                                    ? "border-white/6 text-gray-500 hover:border-violet-500/30 hover:text-violet-400 hover:bg-violet-500/5"
                                    : "border-gray-200 text-gray-400 hover:border-violet-400 hover:text-violet-500 hover:bg-violet-50"
                                }`}
                        >
                            +{libraryGames.length - PREVIEW_LIMIT} mas · Ver toda la colección →
                        </Link>
                    )}
                </>
            )}
        </section>
    );
};

export default LibrarySection;