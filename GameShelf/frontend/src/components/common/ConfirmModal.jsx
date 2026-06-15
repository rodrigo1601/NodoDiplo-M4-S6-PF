import { useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";

const ConfirmModal = ({
    open,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    danger = false
}) => {
    const { isDark } = useTheme();

    useEffect(() => {
        if (!open) return;
        const handler = (e) => { if (e.key === "Escape") onCancel(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <div className={`relative w-full max-w-sm border rounded-xl shadow-2xl
                ${isDark ? "bg-[#0d0f14] border-white/8" : "bg-white border-gray-200"}`}>

                <div className={`flex items-center gap-2 px-5 py-4 border-b
                    ${isDark ? "border-white/5" : "border-gray-100"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${danger ? "bg-red-500" : "bg-violet-500"}`} />
                    <h2 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{title}</h2>
                </div>

                <div className="px-5 py-4">
                    <p className={`text-[13px] leading-relaxed ${isDark ? "text-gray-500" : "text-gray-500"}`}>{message}</p>
                </div>

                <div className={`flex items-center justify-end gap-2 px-5 py-4 border-t
                    ${isDark ? "border-white/5" : "border-gray-100"}`}>
                    <button
                        onClick={onCancel}
                        className={`text-[12px] px-3.5 py-2 rounded-lg border transition-all cursor-pointer
                            ${isDark
                                ? "border-white/[0.07] text-gray-500 hover:border-white/12 hover:text-gray-300"
                                : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            }`}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`text-[12px] px-3.5 py-2 rounded-lg font-semibold transition-colors cursor-pointer
                            ${danger
                                ? "bg-red-600 hover:bg-red-500 text-white"
                                : "bg-violet-600 hover:bg-violet-500 text-white"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;