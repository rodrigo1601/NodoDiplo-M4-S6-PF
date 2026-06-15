import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const CardItem = ({ item, type, developersColorLogo }) => {
    const { isDark } = useTheme();

    return (
        <Link
            to={`/category/${type}/${item.slug}`}
            className={`block group border rounded-xl overflow-hidden
                       hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-200
                       ${isDark
                           ? "bg-[#1a1d27] border-white/06"
                           : "bg-white border-gray-200 shadow-sm"
                       }`}
        >
            {/* Logo banner */}
            <div className={`h-16 relative flex items-center justify-center overflow-hidden
                ${isDark ? "bg-white/2" : "bg-gray-50"}`}>
                {item.logo ? (
                    <img
                        src={item.logo}
                        alt={item.nombre}
                        className={`max-h-8 max-w-[70%] object-contain opacity-80 group-hover:opacity-100 transition-opacity
                            ${!developersColorLogo ? (isDark ? "invert" : "") : ""}`}
                    />
                ) : (
                    <span className={`text-lg font-black italic tracking-tight select-none truncate px-3
                        ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {item.nombre}
                    </span>
                )}
                {/* Badge cantidad — esquina superior derecha, pequeño y discreto */}
                <span className={`absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md leading-none
                    ${isDark ? "bg-black/50 text-white/50" : "bg-black/10 text-gray-500"}`}>
                    {item.quantity}
                </span>
            </div>

            {/* Body */}
            <div className={`px-3 py-2 border-t ${isDark ? "border-white/4" : "border-gray-100"}`}>
                <p className={`text-[12px] font-semibold truncate group-hover:text-violet-400 transition-colors
                    ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    {item.nombre}
                </p>
                <p className={`text-[10px] mt-0.5 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                    <span className="text-violet-500 font-semibold">{item.quantity}</span> juego{item.quantity !== 1 ? "s" : ""}
                </p>
            </div>
        </Link>
    );
};

export default CardItem;