import { useEffect } from "react";
import { useTheme } from "../../../../hooks/useTheme";

const AdminModal = ({ open, title, children, onClose }) => {
    const { isDark } = useTheme();

    useEffect(() => {
        if (!open) return;
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className={`border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl
                ${isDark ? "bg-[#0d0f14] border-white/[0.08]" : "bg-white border-gray-200"}`}>
                <div className={`flex items-center justify-between px-6 py-4 border-b
                    ${isDark ? "border-white/[0.06]" : "border-gray-100"}`}>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        <h2 className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className={`text-lg leading-none transition-colors w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer
                            ${isDark ? "text-gray-600 hover:text-gray-300 hover:bg-white/[0.05]" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"}`}
                    >
                        ✕
                    </button>
                </div>
                <div className="px-6 py-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminModal;