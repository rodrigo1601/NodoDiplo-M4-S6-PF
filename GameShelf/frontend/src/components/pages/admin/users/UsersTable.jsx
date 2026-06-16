import { useState } from "react";
import { useTheme } from "../../../../hooks/useTheme";
import ConfirmModal from "../../../common/ConfirmModal";

const UsersTable = ({ data, setSelected, seteditingStatus, handleActivate, activate }) => {
    const { isDark } = useTheme();
    const [selectedItem, setSelectedItem] = useState(null);

    const borderCol = isDark ? "border-white/6" : "border-gray-200";
    const borderRow = isDark ? "border-white/4" : "border-gray-100";
    const headBg    = isDark ? "bg-white/2"     : "bg-gray-50";
    const rowHover  = isDark ? "hover:bg-white/2" : "hover:bg-gray-50";
    const thText    = isDark ? "text-gray-600"        : "text-gray-400";
    const nameText  = isDark ? "text-gray-200"        : "text-gray-800";
    const mutedText = isDark ? "text-gray-500"        : "text-gray-400";
    const avatarBg  = isDark ? "bg-white/6"      : "bg-gray-100";

    return (
        <>
            <div className={`overflow-x-auto rounded-xl border ${borderCol}`}>
                <table className="w-full text-left">
                    <thead>
                        <tr className={`border-b ${borderCol} ${headBg}`}>
                            {["Avatar", "Usuario", "Email", "Rol", "Estado", "Acciones"].map(h => (
                                <th key={h} className={`px-4 py-3 text-[11px] font-bold tracking-widest uppercase ${thText}`}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id || index} className={`border-t ${borderRow} ${rowHover} transition-colors`}>
                                <td className="px-4 py-3">
                                    {item.avatar
                                        ? <img src={item.avatar} alt="" className={`w-9 h-9 rounded-full object-cover ring-1 ${isDark ? "ring-white/8" : "ring-gray-200"}`} />
                                        : <div className={`w-9 h-9 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold ${avatarBg}`}>
                                            {item.username?.[0]?.toUpperCase()}
                                          </div>
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-[13px] font-semibold ${nameText}`}>{item.username}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-[13px] ${mutedText}`}>{item.email}</span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                                        ${item.role === "admin"
                                            ? "text-cyan-400 bg-cyan-400/10"
                                            : isDark ? "text-gray-500 bg-white/4" : "text-gray-400 bg-gray-100"
                                        }`}>
                                        {item.role ?? "usuario"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                                        ${item.isActive
                                            ? "text-green-400 bg-green-400/10"
                                            : isDark ? "text-gray-500 bg-white/4" : "text-gray-400 bg-gray-100"
                                        }`}>
                                        {item.isActive ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => { setSelected(item); seteditingStatus(true); }}
                                            className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer
                                                ${isDark
                                                    ? "border-white/7 text-gray-500 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10"
                                                    : "border-gray-200 text-gray-500 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50"
                                                }`}
                                        >
                                            Editar
                                        </button>
                                        {item.role !== 1 && (
                                            <button
                                                onClick={() => setSelectedItem(item)}
                                                className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer
                                                    ${item.isActive
                                                        ? isDark
                                                            ? "border-white/7 text-gray-500 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10"
                                                            : "border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500 hover:bg-red-50"
                                                        : isDark
                                                            ? "border-white/7 text-gray-500 hover:border-green-500/40 hover:text-green-400 hover:bg-green-500/10"
                                                            : "border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50"
                                                    }`}
                                            >
                                                {item.isActive ? "Desactivar" : "Activar"}
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                open={!!selectedItem}
                title={selectedItem?.isActive ? "Desactivar usuario" : "Activar usuario"}
                message={`¿Seguro que querés ${selectedItem?.isActive ? "desactivar" : "activar"} a "${selectedItem?.username}"?`}
                confirmText={selectedItem?.isActive ? "Desactivar" : "Activar"}
                cancelText="Cancelar"
                danger={selectedItem?.isActive}
                onCancel={() => setSelectedItem(null)}
                onConfirm={() => { handleActivate(selectedItem, activate); setSelectedItem(null); }}
            />
        </>
    );
};

export default UsersTable;