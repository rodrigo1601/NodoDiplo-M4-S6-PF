import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";

const links = [
    { label: "Dashboard",       path: "/admin",            icon: "/icons/dashboard-alt.svg" },
    { label: "Juegos",          path: "/admin/games",      icon: "/icons/game-controller.svg" },
    { label: "Desarrolladores", path: "/admin/developers", icon: "/icons/group.svg" },
    { label: "Plataformas",     path: "/admin/platforms",  icon: "/icons/platform.svg" },
    { label: "Géneros",         path: "/admin/genres",     icon: "/icons/price-tag.svg" },
    { label: "Usuarios",        path: "/admin/users",      icon: "/icons/user.svg" },
];

const Sidebar = () => {
    const { pathname } = useLocation();
    const { isDark } = useTheme();

    return (
        <aside className={`w-55 shrink-0 min-h-screen border-r flex flex-col transition-colors
            ${isDark ? "bg-[#0d0f14] border-white/5" : "bg-white border-gray-200"}`}>

            <div className={`px-5 py-6 border-b ${isDark ? "border-white/5" : "border-gray-200"}`}>
                <p className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                    GameShelf
                </p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-500 mt-0.5">
                    Panel de administración
                </p>
            </div>

            <nav className="flex-1 p-2 space-y-0.5">
                {links.map(({ label, path, icon }) => {
                    const active = pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all
                                ${active
                                    ? "bg-cyan-500/15 text-cyan-500 border border-cyan-500/20"
                                    : isDark
                                        ? "text-gray-500 hover:bg-white/4 hover:text-gray-200"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                        >
                            <img
                                src={icon}
                                alt=""
                                className={`h-4 w-auto ${isDark ? "invert" : ""} ${active ? "opacity-100" : "opacity-50"}`}
                            />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className={`p-3 border-t ${isDark ? "border-white/5" : "border-gray-200"}`}>
                <Link
                    to="/"
                    className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-[12px] font-medium transition-all
                        ${isDark ? "text-gray-600 hover:text-gray-300 hover:bg-white/4" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"}`}
                >
                    ← Volver a la tienda
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;