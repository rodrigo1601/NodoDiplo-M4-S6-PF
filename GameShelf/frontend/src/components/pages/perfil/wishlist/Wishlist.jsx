import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useUserGames } from "../../../../hooks/userGames/useUserGames";
import { useAuth } from "../../../../hooks/users/useAuth";
import { handleDeleteFromCollection } from "../../../../utils/handleGame";
import Sidebar from "../../../layout/Sidebar";
import LoadingSpinner from "../../../common/LoadingSpinnes";
import { Link } from "react-router-dom";
import GameWishlistCard from "../GameWishlistCard";
import { usePagination } from "../../../../hooks/UsePagination";
import Pagination from "../../../layout/Pagination";

const Wishlist = () => {
    useDocumentTitle("Wishlist | GameShelf");

    const { userGames, deleteUserGame, loading } = useUserGames();
    const { user } = useAuth();

    const wishlistGames = userGames.filter(g => g.inWishlist);

    const pagination = usePagination(wishlistGames, 12);

    const handleDelete = (userGame) => handleDeleteFromCollection(user, userGame, deleteUserGame);

    return (
        <div className="bg-[#0f1117] min-h-screen text-white font-sans">
            <div className="border-b border-white/4 px-6 py-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">Collection</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">Wishlist</h1>
                <p className="text-sm text-gray-500 mt-0.5">Games you want to play next.</p>
            </div>

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-5">
                    {loading ? (
                        <LoadingSpinner />
                    ) : wishlistGames.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#1a1d27] border border-white/6 rounded-xl">
                            <span className="text-3xl mb-3">🌟</span>
                            <p className="text-gray-400 font-semibold text-sm">Tu lista de deseos está vacia</p>
                            <p className="text-gray-600 text-xs mt-1 mb-5">Guarda juegos que quieras jugar luego.</p>
                            <Link to="/" className="text-xs px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors">
                                Ir a la tienda
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-end mb-4">
                                <span className="text-xs text-gray-600">
                                    <span className="text-violet-500 font-semibold">{wishlistGames.length}</span> juegos en deseos
                                </span>
                            </div>
                            <div className="flex-1 p-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                                    {pagination.paginated.map(ug => (
                                        <GameWishlistCard
                                            key={ug._id}
                                            userGame={ug}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                                <Pagination {...pagination}/>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Wishlist;