import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

const ErrorPage = ({ code, accentColor, eyebrow, title, description, linkTo, linkLabel }) => {
    const { isDark } = useTheme();

    const numberColor = isDark ? "text-white/[0.06]" : "text-black/[0.05]";

    return (
        <div className={`min-h-screen font-sans flex flex-col items-center justify-center px-6 transition-colors
            ${isDark ? "bg-[#0f1117] text-white" : "bg-gray-50 text-gray-900"}`}>
            <div className="text-center max-w-md">
                {/* Número fantasma */}
                <div className={`text-[96px] font-black tracking-tighter leading-none select-none mb-2 ${numberColor}`}>
                    {code}
                </div>

                {/* Eyebrow */}
                <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: accentColor }}>
                        {eyebrow}
                    </span>
                </div>

                {/* Título */}
                <h1 className="text-2xl font-extrabold tracking-tight mb-2">{title}</h1>

                {/* Descripción */}
                <p className={`text-sm mb-8 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{description}</p>

                {/* CTA */}
                <Link
                    to={linkTo}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
                >
                    {linkLabel}
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;