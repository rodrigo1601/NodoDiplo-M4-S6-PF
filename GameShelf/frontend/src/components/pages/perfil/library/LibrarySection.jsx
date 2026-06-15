import { Link } from "react-router-dom";
import GameLibraryCard from "../../common/GameLibraryCard";

const PREVIEW_LIMIT = 4;

const LibrarySection = ({ userGames, onUpdate, onDelete }) => {
    const libraryGames = userGames.filter(g => g.inLibrary);
    const preview = libraryGames.slice(0, PREVIEW_LIMIT);
    const hasMore = libraryGames.length > PREVIEW_LIMIT;

    return (
        <section>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Library</span>
                    <span className="text-xs text-gray-600">
                        <span className="text-violet-500 font-semibold">{libraryGames.length}</span> games
                    </span>
                </div>
                <Link
                    to="/library"
                    className="text-[11px] text-violet-500 hover:text-violet-400 transition-colors"
                >
                    View all →
                </Link>
            </div>

            {libraryGames.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center bg-[#1a1d27] border border-white/6 rounded-xl">
                    <p className="text-gray-400 font-semibold text-sm">Your library is empty</p>
                    <p className="text-gray-600 text-xs mt-1">Add games from the store to start tracking them.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {preview.map(ug => (
                            <GameLibraryCard
                                key={ug._id}
                                userGame={ug}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                    {hasMore && (
                        <Link
                            to="/library"
                            className="mt-3 flex items-center justify-center w-full py-2.5 rounded-xl border border-white/6 text-xs text-gray-500 hover:border-violet-500/30 hover:text-violet-400 hover:bg-violet-500/5 transition-all"
                        >
                            +{libraryGames.length - PREVIEW_LIMIT} more games · View full library →
                        </Link>
                    )}
                </>
            )}
        </section>
    );
};

export default LibrarySection;