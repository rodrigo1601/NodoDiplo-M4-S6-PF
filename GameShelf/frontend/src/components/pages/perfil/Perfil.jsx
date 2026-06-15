import { useState } from "react";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { useUserGames } from "../../../hooks/userGames/useUserGames";
import { useAuth } from "../../../hooks/users/useAuth";
import { useTheme } from "../../../hooks/useTheme";
import { handleDeleteFromCollection } from "../../../utils/handleGame";
import LoadingSpinner from "../../common/LoadingSpinnes";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileSettings from "./ProfileSettings";
import LibrarySection from "./LibrarySection";
import WishlistSection from "./WishlistSection";

const Perfil = () => {
    useDocumentTitle("Profile | GameShelf");
    const { isDark } = useTheme();

    const { userGames, updateUserGame, deleteUserGame } = useUserGames();
    const { user, loadingAuth, updateUser } = useAuth();
    const [editingStatus, seteditingStatus] = useState(false);

    const handleUpdate = async (userGameId, update) => {
        const res = await updateUserGame(userGameId, update);
        if (!res.success) alert(res.message);
    };

    const handleDelete = (userGame) =>
        handleDeleteFromCollection(user, userGame, deleteUserGame);

    if (loadingAuth) return <LoadingSpinner />;

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className="flex justify-between items-center">
                <ProfileHeader user={user} />
                <button
                    onClick={() => seteditingStatus(!editingStatus)}
                    className={`w-15 h-15 flex mr-20 items-center justify-center rounded-xl cursor-pointer
                        border transition-all
                        ${isDark
                            ? "bg-white/5 border-white/8 text-gray-400 hover:bg-violet-500/15 hover:text-violet-400 hover:border-violet-500/30"
                            : "bg-gray-100 border-gray-200 text-gray-500 hover:bg-violet-50 hover:text-violet-500 hover:border-violet-300"
                        }`}
                >
                    <img
                        src="/icons/settings.svg"
                        alt="Settings"
                        className={`h-10 w-fit transition-all ${isDark ? "invert" : ""}`}
                    />
                </button>
            </div>

            <ProfileStats userGames={userGames} />

            <div className="p-6 space-y-10">
                <LibrarySection userGames={userGames} onUpdate={handleUpdate} onDelete={handleDelete} />
                <WishlistSection userGames={userGames} onDelete={handleDelete} />
                <ProfileSettings open={editingStatus} onClose={() => seteditingStatus(false)} user={user} updateUser={updateUser} />
            </div>
        </div>
    );
};

export default Perfil;