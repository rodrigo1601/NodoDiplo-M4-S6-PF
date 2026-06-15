import { useTheme } from "../../../hooks/useTheme";

//aca

const ProfileHeader = ({ user }) => {
    const { isDark } = useTheme();
    return (
        <div className={`border-b px-6 py-6 flex items-center gap-5 ${isDark ? "border-white/4" : "border-gray-200"}`}>
            <img
                src={user.avatar}
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-violet-500/30"
            />
            <div>
                <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-500">Perfil</span>
                </div>
                <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>{user.username}</h1>
                <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>{user.email}</p>
            </div>
        </div>
    );
};

export default ProfileHeader;