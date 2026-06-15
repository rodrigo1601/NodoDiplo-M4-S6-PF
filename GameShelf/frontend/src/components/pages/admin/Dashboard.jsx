import AdminPageHeader from "./common/AdminPageHeader";
import { useTheme } from "../../../hooks/useTheme";
import { useGames } from "../../../hooks/games/useGames";
import { useUsers } from "../../../hooks/users/useUsers";
import { useDevelopers } from "../../../hooks/developers/useDevelopers";
import { usePlatforms } from "../../../hooks/platforms/usePlatforms";
import { useGenres } from "../../../hooks/genres/useGenres";

const STAT_CARDS = [
    { label: "Juegos totales",  key: "games",      color: "text-cyan-500   bg-cyan-400/10"   },
    { label: "Usuarios",        key: "users",      color: "text-violet-400 bg-violet-400/10" },
    { label: "Desarrolladores", key: "developers", color: "text-green-400  bg-green-400/10"  },
    { label: "Plataformas",     key: "platforms",  color: "text-yellow-400 bg-yellow-400/10" },
    { label: "Géneros",         key: "genres",     color: "text-blue-400   bg-blue-400/10"   },
];

const Dashboard = () => {
    const { isDark } = useTheme();
    const { games }         = useGames();
    const { allUsers }      = useUsers();
    const { allPlatforms }  = usePlatforms();
    const { allDevelopers } = useDevelopers();
    const { allGenres }     = useGenres();

    const stats = {
        games:      games?.length        ?? 0,
        users:      allUsers?.length     ?? 0,
        developers: allDevelopers?.length ?? 0,
        platforms:  allPlatforms?.length  ?? 0,
        genres:     allGenres?.length     ?? 0,
    };

    return (
        <div className={`min-h-screen font-sans transition-colors ${isDark ? "bg-[#0a0c10] text-white" : "bg-gray-100 text-gray-900"}`}>
            <AdminPageHeader title="Dashboard" subtitle="Observá las estadísticas de GameShelf." />
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {STAT_CARDS.map(({ label, color, key }) => (
                    <div key={key} className={`border rounded-xl px-4 py-4 transition-colors
                        ${isDark ? "bg-[#0d0f14] border-white/[0.06]" : "bg-white border-gray-200"}`}>
                        <p className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${isDark ? "text-gray-600" : "text-gray-400"}`}>{label}</p>
                        <p className={`text-2xl font-black px-2 py-0.5 rounded-md w-fit ${color}`}>{stats[key]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;