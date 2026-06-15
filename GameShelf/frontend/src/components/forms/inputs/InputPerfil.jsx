import { useEffect, useState } from "react";
import { useTheme } from "../../../hooks/useTheme";

const InputPerfil = ({ titulo, nombre, register, errors, rules, currentImage }) => {
    const { isDark } = useTheme();
    const [localPreview, setLocalPreview] = useState(null);
    useEffect(() => () => { if (localPreview?.startsWith("blob:")) URL.revokeObjectURL(localPreview); }, [localPreview]);
    const preview = localPreview || currentImage;

    return (
        <div className="flex flex-col gap-2">
            <span className={`text-[12px] font-semibold tracking-wide ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {titulo}
            </span>
            <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full border-2 border-violet-500/30 overflow-hidden shrink-0 flex items-center justify-center
                    ${isDark ? "bg-[#0f1117]" : "bg-gray-100"}`}>
                    {preview
                        ? <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        : <span className={`font-bold text-xl ${isDark ? "text-gray-600" : "text-gray-400"}`}>?</span>
                    }
                </div>
                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[12px] cursor-pointer transition-all
                    ${isDark
                        ? "bg-white/4 border-white/8 text-gray-400 hover:bg-white/[0.07] hover:text-gray-200"
                        : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}>
                    <i className="ti ti-upload text-[14px]" aria-hidden="true" />
                    Subir foto
                    <input type="file" accept="image/*" className="hidden"
                        {...register(nombre, {
                            ...rules,
                            onChange: (e) => { const f = e.target.files?.[0]; if (f) setLocalPreview(URL.createObjectURL(f)); }
                        })} />
                </label>
            </div>
            {errors && <p className="text-[11px] text-red-400">{errors.message}</p>}
        </div>
    );
};
export default InputPerfil;