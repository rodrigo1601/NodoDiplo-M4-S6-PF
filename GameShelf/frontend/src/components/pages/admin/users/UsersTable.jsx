import { useState } from "react";
import ConfirmModal from "../../../common/ConfirmModal";

const UsersTable = ({ data, setSelected, seteditingStatus, handleActivate, activate }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
    <div className="overflow-x-auto rounded-xl border border-white/6">
        <table className="w-full text-left">
            <thead>
                <tr className="border-b border-white/6 bg-white/2">
                    {["Avatar", "Usuario", "Email", "Rol", "Status", "Acciones"].map(h => (
                        <th key={h} className="px-4 py-3 text-[11px] font-bold tracking-widest uppercase text-gray-600">
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr
                        key={item._id || index}
                        className="border-t border-white/4 hover:bg-white/2 transition-colors"
                    >
                        <td className="px-4 py-3">
                            {item.avatar
                                ? <img src={item.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-white/8" />
                                : <div className="w-9 h-9 rounded-full bg-white/6 flex items-center justify-center text-gray-500 text-xs font-bold">
                                    {item.username?.[0]?.toUpperCase()}
                                  </div>
                            }
                        </td>
                        <td className="px-4 py-3">
                            <span className="text-[13px] font-semibold text-gray-200">{item.username}</span>
                        </td>
                        <td className="px-4 py-3">
                            <span className="text-[13px] text-gray-500">{item.email}</span>
                        </td>
                        <td className="px-4 py-3">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                                ${item.role === "admin"
                                    ? "text-cyan-400 bg-cyan-400/10"
                                    : "text-gray-500 bg-white/4"
                                }`}>
                                {item.role ?? "user"}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                                ${item.isActive
                                    ? "text-green-400 bg-green-400/10"
                                    : "text-gray-500 bg-white/4"
                                }`}>
                                {item.isActive ? "Activo" : "Inactivo"}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => { setSelected(item); seteditingStatus(true); }}
                                    className="text-[11px] px-2.5 py-1 rounded-md border border-white/7 text-gray-500 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all hover:cursor-pointer"
                                >
                                    Editar
                                </button>
                                {item.role != 1 && (
                                    <button
                                    onClick={() => setSelectedItem(item)}
                                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-all hover:cursor-pointer
                                        ${item.isActive
                                            ? "border-white/7 text-gray-500 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/10"
                                            : "border-white/7 text-gray-500 hover:border-green-500/40 hover:text-green-400 hover:bg-green-500/10"
                                        }`}
                                    >
                                    {item.isActive ? "Desactivar" : "Activar"}
                                    </button>
                                )}
                                
                            </div>
                        </td>
                    </tr>
                ))}
                <ConfirmModal
                    open={!!selectedItem}               
                    title="Cambiar estado"
                    message="¿Seguro que deseas cambiar el estado?"
                    confirmText="Cambiar"
                    cancelText="Cancelar"
                    onCancel={() => setSelectedItem(null)}
                    onConfirm={() => {
                        setSelectedItem(null)
                        handleActivate(selectedItem, activate);
                    }}
                />
            </tbody>
        </table>
    </div>
    );
};

export default UsersTable;