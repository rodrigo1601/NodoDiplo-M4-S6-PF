import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const Footer = () => {
    const { isDark } = useTheme();

    return (
        <footer className={`border-t font-sans transition-colors ${isDark ? "bg-[#0a0c12] border-violet-900/20" : "bg-gray-50 border-gray-200"}`}>
            <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
                <div className="grid grid-cols-4 gap-8 mb-8">
                    <div>
                        <span className="text-lg font-extrabold tracking-tight bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent block mb-3">
                            GameShelf
                        </span>
                        <p className={`text-[13px] leading-relaxed max-w-60 ${isDark ? "text-gray-600" : "text-gray-500"}`}>
                            Tu biblioteca personal de juegos. Seguí, puntuá y descubrí tu próximo juego favorito.
                        </p>
                        <div className="flex gap-2 mt-4">
                            {["🐦", "💬", "🐙"].map((icon, i) => (
                                <button key={i} className={`w-8 h-8 rounded-lg border text-sm flex items-center justify-center transition-colors
                                    ${isDark ? "bg-[#1a1d27] border-white/6 hover:bg-[#252836]" : "bg-white border-gray-200 hover:bg-gray-100"}`}>
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {[
                        {
                            title: "Explorar",
                            links: [
                                ["Tienda",         "/"],
                                ["Novedades",      "/new"],
                                ["Mejor puntuados","/top"],
                                ["Próximamente",   "/upcoming"],
                            ]
                        },
                        {
                            title: "Mi cuenta",
                            links: [
                                ["Mi librería",     "/perfil/library"],
                                ["Lista de deseos", "/perfil/wishlist"],
                                ["Perfil",          "/perfil"],
                            ]
                        },
                        {
                            title: "Legal",
                            links: [
                                ["Privacidad",       "/privacy"],
                                ["Términos de uso",  "/terms"],
                                ["Contacto",         "/contact"],
                            ]
                        },
                    ].map(({ title, links }) => (
                        <div key={title}>
                            <h4 className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                {title}
                            </h4>
                            {links.map(([label, to]) => (
                                <Link key={label} to={to}
                                    className={`block text-[13px] mb-2 transition-colors hover:text-violet-400
                                        ${isDark ? "text-gray-600" : "text-gray-500"}`}>
                                    {label}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>

                <div className={`border-t pt-5 flex items-center justify-between ${isDark ? "border-white/4" : "border-gray-200"}`}>
                    <span className={`text-xs ${isDark ? "text-gray-700" : "text-gray-400"}`}>
                        © 2026 GameShelf. Todos los derechos reservados.
                    </span>
                    <span className={`text-xs ${isDark ? "text-gray-700" : "text-gray-400"}`}>
                        Desarrollado con React + Tailwind por <span className="text-violet-500">Roberto Rodrigo Ibañez</span>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;