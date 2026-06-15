import { useForm } from "react-hook-form";
import InputSubmitButton from "../inputs/InputSubmitButton";
import InputEmail from "../inputs/InputEmail";
import InputPassword from "../inputs/InputPassword";
import { useAuth } from "../../../hooks/users/useAuth";

const UserForm = ({onSubmit, label}) => {

    const { loadingAuth } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <InputEmail titulo="Email" nombre="email" register={register} errors={errors.email} rules={{required: "El email de usuario es obligatorio"}}/>
            <InputPassword titulo="Contraseña" nombre="password" register={register} errors={errors.password} rules={{required: "La contraseña es obligatoria"}}/>
            
            <InputSubmitButton label={label? label : loadingAuth? "Cargando..." : "Iniciar sesion"} disabled={loadingAuth}/>

        </form>
        </>
    );
};

export default UserForm;
