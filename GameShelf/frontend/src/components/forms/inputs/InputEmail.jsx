import { useTheme } from "../../../hooks/useTheme";
import { getInputClass, getLabelClass, errorClass, fieldClass } from "./inputBase";

const InputEmail = ({ titulo, nombre, register, errors, rules }) => {
    const { isDark } = useTheme();
    return (
        <div className={fieldClass}>
            <label className={getLabelClass(isDark)}>{titulo}</label>
            <input type="email" {...register(nombre, rules)} className={getInputClass(isDark)} />
            {errors && <p className={errorClass}>{errors.message}</p>}
        </div>
    );
};
export default InputEmail;