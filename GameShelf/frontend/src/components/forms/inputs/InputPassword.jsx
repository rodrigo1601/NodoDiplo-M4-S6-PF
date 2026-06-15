import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { getLabelClass, errorClass, fieldClass } from "./inputBase";

const InputPassword = ({ titulo, nombre, register, errors, rules }) => {
    const { isDark } = useTheme();
    const [show, setShow] = useState(false);
    return (
        <div className={fieldClass}>
            <label className={getLabelClass(isDark)}>{titulo}</label>
            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    {...register(nombre, rules)}
                    className={`w-full border rounded-lg text-[13px] px-3 py-2.5 pr-10 outline-none transition-all
                        focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10
                        ${isDark
                            ? "bg-[#0f1117] border-white/8 text-gray-100 placeholder:text-gray-600"
                            : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 shadow-sm"
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors
                        ${isDark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}
                >
                    <i className={`ti ${show ? "ti-eye-off" : "ti-eye"} text-[15px]`} aria-hidden="true" />
                </button>
            </div>
            {errors && <p className={errorClass}>{errors.message}</p>}
        </div>
    );
};
export default InputPassword;