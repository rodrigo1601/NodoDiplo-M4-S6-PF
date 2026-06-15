import { useTheme } from "../../../hooks/useTheme";
import { getLabelClass, errorClass, fieldClass } from "./inputBase";

const InputSelect = ({ titulo, nombre, register, errors, options, rules }) => {
    const { isDark } = useTheme();
    return (
        <div className={fieldClass}>
            <label className={getLabelClass(isDark)}>{titulo}</label>
            <select
                {...register(nombre, rules)}
                className={`w-full border rounded-lg text-[13px] px-3 py-2.5 outline-none transition-all
                    appearance-none cursor-pointer
                    focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10
                    ${isDark
                        ? "bg-[#0f1117] border-white/8 text-gray-100"
                        : "bg-white border-gray-200 text-gray-900 shadow-sm"
                    }`}
            >
                <option value="">Seleccionar...</option>
                {options.map(o => <option key={o._id} value={o._id}>{o.nombre}</option>)}
            </select>
            {errors && <p className={errorClass}>{errors.message}</p>}
        </div>
    );
};
export default InputSelect;