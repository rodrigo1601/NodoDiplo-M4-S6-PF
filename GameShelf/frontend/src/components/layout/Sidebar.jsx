import { Link, useLocation } from "react-router-dom";
import { usePlatforms } from "../../hooks/platforms/usePlatforms";
import { useGenres } from "../../hooks/genres/useGenres";
import { useDevelopers } from "../../hooks/developers/useDevelopers";
import { useTheme } from "../../hooks/useTheme";

const SidebarSection = ({ title, to, children, isDark }) => (
    <div>
        <div className="flex items-center justify-between px-3 pt-4 pb-1.5">
            <span className={`text-[9px] font-bold tracking-widest uppercase ${isDark ? "text-gray-700" : "text-gray-400"}`}>
                {title}
            </span>
            <Link to={to} className="text-[11px] text-violet-500 hover:text-violet-400 transition-colors">
                Ver todos
            </Link>
        </div>
        {children}
    </div>
);

const SidebarLink = ({ to, icon, children, isDark }) => {
    const { pathname } = useLocation();
    const active = pathname === to;
    return (
        <Link
            to={to}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all
                ${active
                    ? "bg-violet-600/15 text-violet-400 border border-violet-500/20"
                    : isDark
                        ? "text-gray-500 hover:bg-white/4 hover:text-gray-200"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
        >
            <img
                src={icon}
                alt=""
                className={`w-fit h-5 ${isDark ? "invert" : ""} ${active ? "opacity-100" : "opacity-60"}`}
            />
            {children}
        </Link>
    );
};

const Sidebar = () => {
    const { isDark } = useTheme();
    const { platforms, loading: lp } = usePlatforms();
    const { genres, loading: lg } = useGenres();
    const { developers, loading: ld } = useDevelopers();

    const base = `w-[200px] shrink-0 border-r transition-colors
        ${isDark ? "bg-[#0f1117] border-white/[0.05]" : "bg-gray-50 border-gray-200"}`;

    if (lp || lg || ld) {
        return (
            <div className={`${base} p-3`}>
                <div className="animate-pulse space-y-2">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`h-8 rounded-lg ${isDark ? "bg-white/4" : "bg-gray-200"}`} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <aside className={`${base} p-2 space-y-0.5`}>
            <SidebarLink to="/" icon="/icons/home.svg" isDark={isDark}>Inicio</SidebarLink>

            <div className={`border-t my-1 ${isDark ? "border-white/4" : "border-gray-200"}`} />

            <SidebarSection title="Plataformas" to="/category/platforms" isDark={isDark}>
                {platforms.map(p => (
                    <SidebarLink key={p._id} to={`/category/platforms/${p.slug}`} icon="/icons/game-controller.svg" isDark={isDark}>
                        {p.nombre}
                    </SidebarLink>
                ))}
            </SidebarSection>

            <div className={`border-t my-1 ${isDark ? "border-white/4" : "border-gray-200"}`} />

            <SidebarSection title="Géneros" to="/category/genres" isDark={isDark}>
                {genres.map(g => (
                    <SidebarLink key={g._id} to={`/category/genres/${g.slug}`} icon="/icons/price-tag.svg" isDark={isDark}>
                        {g.nombre}
                    </SidebarLink>
                ))}
            </SidebarSection>

            <div className={`border-t my-1 ${isDark ? "border-white/4" : "border-gray-200"}`} />

            <SidebarSection title="Desarrolladores" to="/category/developers" isDark={isDark}>
                {developers.map(d => (
                    <SidebarLink key={d._id} to={`/category/developers/${d.slug}`} icon="/icons/group.svg" isDark={isDark}>
                        {d.nombre}
                    </SidebarLink>
                ))}
            </SidebarSection>
        </aside>
    );
};

export default Sidebar;