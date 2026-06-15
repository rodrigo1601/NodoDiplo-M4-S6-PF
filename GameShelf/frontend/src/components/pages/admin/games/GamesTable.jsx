import { useTheme } from "../../../../hooks/useTheme";

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-AR", { month: "short", day: "numeric", year: "numeric" });
};

const GameTable = ({ data, setSelected, seteditingStatus }) => {
    const { isDark } = useTheme();

    const borderCol = isDark ? "border-white/[0.06]" : "border-gray-200";
    const borderRow = isDark ? "border-white/[0.04]" : "border-gray-100";
    const headBg    = isDark ? "bg-white/[0.02]"     : "bg-gray-50";
    const rowHover  = isDark ? "hover:bg-white/[0.02]" : "hover:bg-gray-50";
    const thText    = isDark ? "text-gray-600"        : "text-gray-400";
    const nameText  = isDark ? "text-gray-200"        : "text-gray-800";
    const dateText  = isDark ? "text-gray-500"        : "text-gray-400";
    const emptyBg   = isDark ? "bg-white/[0.04]"      : "bg-gray-100";

    return (
        <div className={`overflow-x-auto rounded-xl border ${borderCol}`}>
            <table className="w-full text-left">
                <thead>
                    <tr className={`border-b ${borderCol} ${headBg}`}>
                        {["Portada", "Nombre", "Fecha de salida", "Clasificación", "Acciones"].map(h => (
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
                                {item.portada
                                    ? <img src={item.portada} alt={item.nombre} className="w-28 aspect-video object-cover rounded-lg" />
                                    : <div className={`w-28 aspect-video rounded-lg flex items-center justify-center text-gray-600 text-xs ${emptyBg}`}>—</div>
                                }
                            </td>
                            <td className="px-4 py-3">
                                <span className={`text-[13px] font-semibold ${nameText}`}>{item.nombre}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`text-[13px] ${dateText}`}>{formatDate(item.releaseDate)}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                                    ${item.ageRating >= 18 ? "text-red-400 bg-red-400/10"
                                    : item.ageRating >= 13 ? "text-yellow-400 bg-yellow-400/10"
                                    : "text-green-400 bg-green-400/10"}`}>
                                    {item.ageRating ? `${item.ageRating}+` : "Todas las edades"}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => { setSelected(item); seteditingStatus(true); }}
                                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer
                                        ${isDark
                                            ? "border-white/[0.07] text-gray-500 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10"
                                            : "border-gray-200 text-gray-500 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50"
                                        }`}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameTable;