import { useEffect } from "react";

const AdminModal = ({ open, title, children, onClose }) => {
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
            <div className="bg-[#0d0f14] border border-white/8 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        <h2 className="text-base font-bold text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-300 text-lg leading-none transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 cursor-pointer"
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