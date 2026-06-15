import { useTheme } from "../../../hooks/useTheme";
import { Controller } from "react-hook-form";

const InputGallery = ({ control, titulo, nombre, currentImages }) => {
    const { isDark } = useTheme();
    return (
        <Controller
            name={nombre}
            control={control}
            defaultValue={(currentImages || []).map(url => ({ type: "existing", value: url }))}
            render={({ field }) => {
                const images = field.value || [];
                const sync = (updated) => field.onChange(updated);

                return (
                    <div className="flex flex-col gap-2">
                        <span className={`text-[12px] font-semibold tracking-wide ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {titulo}
                        </span>

                        {images.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`relative group w-24 h-24 rounded-lg overflow-hidden border
                                            ${isDark ? "border-white/[0.07] bg-[#0f1117]" : "border-gray-200 bg-gray-100"}`}
                                    >
                                        <img
                                            src={img.type === "existing" ? img.value : img.preview}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => sync(images.filter((_, i) => i !== index))}
                                            className="absolute inset-0 flex items-center justify-center
                                                       bg-black/60 opacity-0 group-hover:opacity-100
                                                       transition-opacity text-red-400 text-[11px] font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[12px] cursor-pointer transition-all w-fit
                            ${isDark
                                ? "bg-white/4 border-white/8 text-gray-400 hover:bg-white/[0.07] hover:text-gray-200"
                                : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            }`}>
                            <i className="ti ti-upload text-[14px]" aria-hidden="true" />
                            {images.length === 0 ? "Upload images" : "Add more"}
                            <input
                                type="file" multiple accept="image/*" className="hidden"
                                onChange={(e) => {
                                    const newItems = Array.from(e.target.files).map(file => ({
                                        type: "new", file, preview: URL.createObjectURL(file),
                                    }));
                                    sync([...images, ...newItems]);
                                    e.target.value = "";
                                }}
                            />
                        </label>

                        {images.length > 0 && (
                            <p className={`text-[11px] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                                <span className="text-violet-500 font-semibold">{images.length}</span> image{images.length !== 1 ? "s" : ""} · hover to remove
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
};
export default InputGallery;