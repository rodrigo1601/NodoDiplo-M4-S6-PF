import { useTheme } from "../../../hooks/useTheme";

const InputCheckbox = ({ titulo, nombre, register, errors }) => {
    const { isDark } = useTheme();
    return (
        <div className="flex flex-col gap-1.5">
            <span className={`text-[12px] font-semibold tracking-wide ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {titulo}
            </span>
            <label className="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" {...register(nombre)} className="w-4 h-4 rounded accent-violet-500 cursor-pointer" />
                <span className={`text-[13px] transition-colors group-hover:text-violet-400 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Active
                </span>
            </label>
            {errors && <p className="text-[11px] text-red-400">{errors.message}</p>}
        </div>
    );
};
export default InputCheckbox;