import { useTheme } from "../../../hooks/useTheme";

const InputCheckboxGroup = ({ titulo, nombre, register, errors, options }) => {
    const { isDark } = useTheme();
    return (
        <div className="flex flex-col gap-2">
            <span className={`text-[12px] font-semibold tracking-wide ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {titulo}
            </span>
            <div className="flex flex-wrap gap-2">
                {options.map(o => (
                    <label
                        key={o._id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] cursor-pointer transition-all
                            has-:checked:border-violet-500/40 has-:checked:bg-violet-500/10 has-:checked:text-violet-400
                            ${isDark
                                ? "bg-[#0f1117] border-white/[0.07] text-gray-400 hover:border-violet-500/30 hover:text-gray-200"
                                : "bg-gray-50 border-gray-200 text-gray-500 hover:border-violet-400 hover:text-gray-700"
                            }`}
                    >
                        <input type="checkbox" value={o._id} {...register(nombre)} className="accent-violet-500 w-3.5 h-3.5" />
                        {o.nombre}
                    </label>
                ))}
            </div>
            {errors && <p className="text-[11px] text-red-400">{errors.message}</p>}
        </div>
    );
};
export default InputCheckboxGroup;