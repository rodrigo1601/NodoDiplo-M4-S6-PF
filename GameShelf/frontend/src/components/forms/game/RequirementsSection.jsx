import { useTheme } from "../../../hooks/useTheme";
import InputText from "../inputs/InputText";

const RequirementsSection = ({ register, errors }) => {
    const { isDark } = useTheme();
    return (
        <div className={`border rounded-xl p-4 space-y-4 ${isDark ? "bg-[#1a1d27] border-white/6" : "bg-gray-50 border-gray-200"}`}>
            <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full bg-violet-500" />
                <h3 className={`text-[12px] font-bold tracking-widest uppercase ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    System Requirements
                </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <InputText titulo="OS"      nombre="requirements.os"      register={register} errors={errors.requirements?.os} />
                <InputText titulo="CPU"     nombre="requirements.cpu"     register={register} errors={errors.requirements?.cpu} />
                <InputText titulo="GPU"     nombre="requirements.gpu"     register={register} errors={errors.requirements?.gpu} />
                <InputText titulo="RAM"     nombre="requirements.ram"     register={register} errors={errors.requirements?.ram} />
                <div className="col-span-2">
                    <InputText titulo="Storage" nombre="requirements.storage" register={register} errors={errors.requirements?.storage} />
                </div>
            </div>
        </div>
    );
};
export default RequirementsSection;