import { Link, useLocation } from "react-router-dom";

const links = [
    { label: "Dashboard",    path: "/admin",            icon: "/icons/dashboard-alt.svg" },
    { label: "Juegos",        path: "/admin/games",      icon: "/icons/game-controller.svg" },
    { label: "Desarrolladores",   path: "/admin/developers", icon: "/icons/group.svg" },
    { label: "Plataformas",    path: "/admin/platforms",  icon: "/icons/platform.svg" },
    { label: "Generos",       path: "/admin/genres",     icon: "/icons/price-tag.svg" },
    { label: "Usuarios",        path: "/admin/users",      icon: "/icons/user.svg" },
];

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <aside className="w-55 shrink-0 min-h-screen bg-[#0d0f14] border-r border-white/5 flex flex-col">
            {/* Brand */}
            <div className="px-5 py-6 border-b border-white/5">
                <p className="text-lg font-black tracking-tight text-white">GameShelf</p>
                <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-500 mt-0.5">Panel de administrador</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-2 space-y-0.5">
                {links.map(({ label, path, icon }) => {
                    const active = pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all
                                ${active
                                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                                    : "text-gray-500 hover:bg-white/4 hover:text-gray-200"
                                }`}
                        >
                            <img src={icon} alt="" className="h-4 w-auto opacity-70" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/5">
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-[12px] font-medium text-gray-600 hover:text-gray-300 hover:bg-white/4 transition-all"
                >
                    ← Back to store
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;