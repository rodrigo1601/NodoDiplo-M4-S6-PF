import { useTheme } from "../../../../hooks/useTheme";

const AdminPageHeader = ({ title, subtitle, buttonText, onClick }) => {
    const { isDark } = useTheme();
    return (
        <div className={`border-b px-6 py-6 flex items-center justify-between transition-colors
            ${isDark ? "border-white/[0.04]" : "border-gray-200"}`}>
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-500">Admin</span>
                </div>
                <h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h1>
                <p className={`text-sm mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{subtitle}</p>
            </div>
            {buttonText && (
                <button
                    onClick={onClick}
                    className="text-sm px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors cursor-pointer"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default AdminPageHeader;