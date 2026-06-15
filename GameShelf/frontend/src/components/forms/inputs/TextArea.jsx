import { useTheme } from "../../../hooks/useTheme";
import { getLabelClass, errorClass, fieldClass } from "./inputBase";

const TextArea = ({ titulo, nombre, register, errors, rules }) => {
    const { isDark } = useTheme();
    return (
        <div className={fieldClass}>
            <label className={getLabelClass(isDark)}>{titulo}</label>
            <textarea
                {...register(nombre, rules)}
                rows={3}
                className={`w-full border rounded-lg text-[13px] px-3 py-2.5 outline-none transition-all resize-y
                    focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10
                    ${isDark
                        ? "bg-[#0f1117] border-white/8 text-gray-100 placeholder:text-gray-600"
                        : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm"
                    }`}
            />
            {errors && <p className={errorClass}>{errors.message}</p>}
        </div>
    );
};
export default TextArea;