const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("sp-AR", { month: "short", day: "numeric", year: "numeric" });
};

const GameTable = ({ data, setSelected, seteditingStatus }) => (
    <div className="overflow-x-auto rounded-xl border border-white/6">
        <table className="w-full text-left">
            <thead>
                <tr className="border-b border-white/6 bg-white/2">
                    {["Portada", "Nombre", "Fecha de salida", "Edades", "Acciones"].map(h => (
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
                            {item.portada
                                ? <img src={item.portada} alt={item.nombre} className="w-28 aspect-video object-cover rounded-lg" />
                                : <div className="w-28 aspect-video rounded-lg bg-white/4 flex items-center justify-center text-gray-600 text-xs">—</div>
                            }
                        </td>
                        <td className="px-4 py-3">
                            <span className="text-[13px] font-semibold text-gray-200">{item.nombre}</span>
                        </td>
                        <td className="px-4 py-3">
                            <span className="text-[13px] text-gray-500">
                                {formatDate(item.releaseDate) ?? "—"}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md
                                ${item.ageRating >= 18
                                    ? "text-red-400 bg-red-400/10"
                                    : item.ageRating >= 13
                                        ? "text-yellow-400 bg-yellow-400/10"
                                        : "text-green-400 bg-green-400/10"
                                }`}>
                                {item.ageRating ? `${item.ageRating}+` : "Todas las edades"}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <button
                                onClick={() => { setSelected(item); seteditingStatus(true); }}
                                className="text-[11px] px-2.5 py-1 rounded-md border border-white/[0.07] text-gray-500 hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all hover:cursor-pointer"
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

export default GameTable;