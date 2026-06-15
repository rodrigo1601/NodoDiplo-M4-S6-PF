import { useTheme } from "../../../hooks/useTheme";

const STATS = [
    { key: "library",  label: "En libreria", filter: g => g.inLibrary },
    { key: "wishlist", label: "En deseos",    filter: g => g.inWishlist },
    { key: "played",   label: "Jugados",      filter: g => g.status === "Jugado" },
    { key: "progress", label: "En progreso",  filter: g => g.status === "En progreso" },
];

//aca

const ProfileStats = ({ userGames }) => {
    const { isDark } = useTheme();
    return (
        <div className={`px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-3 border-b ${isDark ? "border-white/4" : "border-gray-200"}`}>
            {STATS.map(({ key, label, filter }) => (
                <div key={key} className={`border rounded-xl px-4 py-3 ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200 shadow-sm"}`}>
                    <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{label}</p>
                    <p className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                        {userGames.filter(filter).length}
                        <span className={`text-xs font-normal ml-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>juegos</span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProfileStats;