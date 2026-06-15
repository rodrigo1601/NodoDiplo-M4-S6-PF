import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useUserGames } from "../../../../hooks/userGames/useUserGames";
import { useAuth } from "../../../../hooks/users/useAuth";
import { useTheme } from "../../../../hooks/useTheme";
import { handleDeleteFromCollection } from "../../../../utils/handleGame";
import Sidebar from "../../../layout/Sidebar";
import LoadingSpinner from "../../../common/LoadingSpinnes";
import { Link } from "react-router-dom";
import GameWishlistCard from "../GameWishlistCard";
import { usePagination } from "../../../../hooks/UsePagination";
import Pagination from "../../../layout/Pagination";

const Wishlist = () => {
    useDocumentTitle("Lista de deseos | GameShelf");
    const { userGames, deleteUserGame, loading } = useUserGames();
    const { user } = useAuth();
    const { isDark } = useTheme();

    const wishlistGames = userGames.filter(g => g.inWishlist);
    const pagination = usePagination(wishlistGames, 12);
    const handleDelete = (userGame) => handleDeleteFromCollection(user, userGame, deleteUserGame);

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className={`border-b px-6 py-6 ${isDark ? "border-white/4" : "border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">Colección</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">Lista de deseos</h1>
                <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    Los juegos que querés jugar próximamente.
                </p>
            </div>

            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-5">
                    {loading ? <LoadingSpinner /> : wishlistGames.length === 0 ? (
                        <div className={`flex flex-col items-center justify-center py-20 text-center border rounded-xl
                            ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200"}`}>
                            <span className="text-3xl mb-3">🌟</span>
                            <p className={`font-semibold text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Tu lista de deseos está vacía</p>
                            <p className={`text-xs mt-1 mb-5 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                Guardá juegos que quieras jugar más tarde.
                            </p>
                            <Link to="/" className="text-xs px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">
                                Ir a la tienda
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className={`flex items-center justify-end mb-4 text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-violet-500 font-semibold mr-1">{wishlistGames.length}</span> juegos guardados
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                {pagination.paginated.map(ug => (
                                    <GameWishlistCard key={ug._id} userGame={ug} onDelete={handleDelete} />
                                ))}
                            </div>
                            <Pagination {...pagination} />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Wishlist;