import { useTheme } from "../../../hooks/useTheme";
import { getInputClass, getLabelClass, errorClass, fieldClass } from "./inputBase";

const InputText = ({ titulo, nombre, register, errors, rules }) => {
    const { isDark } = useTheme();
    return (
        <div className={fieldClass}>
            <label className={getLabelClass(isDark)}>{titulo}</label>
            <input type="text" {...register(nombre, rules)} className={getInputClass(isDark)} />
            {errors && <p className={errorClass}>{errors.message}</p>}
        </div>
    );
};
export default InputText;