import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import ConfirmModal from "../../common/ConfirmModal";

const RATINGS  = ["Excelente", "Recomendado", "Meh", "Skip"];
const STATUSES = ["Jugado", "En progreso", "Pendiente", "Abandonado"];

const STATUS_COLORS = {
    "Jugado":      "text-green-400  bg-green-400/10",
    "En progreso": "text-blue-400   bg-blue-400/10",
    "Pendiente":   "text-yellow-400 bg-yellow-400/10",
    "Abandonado":  "text-red-400    bg-red-400/10",
};
const RATING_COLORS = {
    "Excelente":   "text-violet-400 bg-violet-400/10",
    "Recomendado": "text-green-400  bg-green-400/10",
    "Meh":         "text-yellow-400 bg-yellow-400/10",
    "Skip":        "text-red-400    bg-red-400/10",
};

const InlineSelect = ({ value, options, onSave, onCancel, isDark }) => {
    const [local, setLocal] = useState(value);
    return (
        <div className="flex items-center gap-2 mt-1.5">
            <select
                value={local}
                onChange={e => setLocal(e.target.value)}
                className={`text-xs border rounded-lg px-2 py-1 focus:outline-none focus:border-violet-500/50
                    ${isDark
                        ? "bg-[#0f1117] border-white/8 text-gray-200"
                        : "bg-white border-gray-200 text-gray-700"
                    }`}
            >
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <button onClick={() => onSave(local)} className="text-xs px-2 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors cursor-pointer">
                Guardar
            </button>
            <button onClick={onCancel} className={`text-xs px-2 py-1 rounded-lg border transition-colors cursor-pointer
                ${isDark ? "border-white/7 text-gray-500 hover:text-gray-200" : "border-gray-200 text-gray-400 hover:text-gray-700"}`}>
                ✕
            </button>
        </div>
    );
};

const GameLibraryCard = ({ userGame, onUpdate, onDelete }) => {
    const { isDark } = useTheme();
    const [editField, setEditField] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSave = async (field, value) => {
        await onUpdate(userGame._id, { [field]: value });
        setEditField(null);
    };

    const { gameId, rating, status } = userGame;

    return (
        <div className={`flex gap-3 border rounded-xl overflow-hidden hover:border-violet-500/30 transition-all group p-2.5
            ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-white border-gray-200 shadow-sm"}`}>

            <div className="w-32 shrink-0 rounded-lg overflow-hidden">
                <img src={gameId.portada} alt={gameId.nombre} className="w-full aspect-video object-cover" />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                    <p className={`text-[13px] font-semibold truncate group-hover:text-violet-400 transition-colors mb-3 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                        <Link to={`/gameDetails/${gameId.slug}`}>{gameId.nombre}</Link>
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                        {status && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${STATUS_COLORS[status] ?? "text-gray-400 bg-gray-400/10"}`}>{status}</span>}
                        {rating && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${RATING_COLORS[rating] ?? "text-gray-400 bg-gray-400/10"}`}>{rating}</span>}
                    </div>
                    {editField === "rating" && <InlineSelect value={rating} options={RATINGS} onSave={val => handleSave("rating", val)} onCancel={() => setEditField(null)} isDark={isDark} />}
                    {editField === "status" && <InlineSelect value={status} options={STATUSES} onSave={val => handleSave("status", val)} onCancel={() => setEditField(null)} isDark={isDark} />}
                </div>

                <div className="flex gap-1.5 mt-2">
                    <button
                        onClick={() => setEditField(editField === "rating" ? null : "rating")}
                        className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer
                            hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10
                            ${isDark ? "border-white/7 text-gray-500" : "border-gray-200 text-gray-400"}`}
                    >Rating</button>
                    <button
                        onClick={() => setEditField(editField === "status" ? null : "status")}
                        className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer
                            hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10
                            ${isDark ? "border-white/7 text-gray-500" : "border-gray-200 text-gray-400"}`}
                    >Estado</button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ml-auto
                            hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10
                            ${isDark ? "border-white/7 text-gray-500" : "border-gray-200 text-gray-400"}`}
                    >Remover</button>
                </div>

                <ConfirmModal
                    open={showConfirm}
                    title="Remover"
                    message="¿Seguro que deseas remover este juego de tu colección?"
                    confirmText="Remover"
                    cancelText="Cancelar"
                    danger
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => { setShowConfirm(false); onDelete(userGame); }}
                />
            </div>
        </div>
    );
};

export default GameLibraryCard;