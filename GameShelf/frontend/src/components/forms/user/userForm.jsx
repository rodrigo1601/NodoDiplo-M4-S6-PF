import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputText from "../inputs/InputText";
import InputPerfil from "../inputs/InputPerfil";
import InputSubmitButton from "../inputs/InputSubmitButton";
import InputCheckbox from "../inputs/InputCheckbox";
import TextArea from "../inputs/TextArea";
import InputDate from "../inputs/InputDate";
import InputEmail from "../inputs/InputEmail";
import InputPassword from "../inputs/InputPassword";
import { userNameRules, emailRules, passwordRules, optionalPasswordRules, birthDateRules } from "../../../utils/validation";

const UserForm = ({onSubmit, user, label, mode}) => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                avatar: null,
                bio: user.bio,
                birthDate: user.birthDate?.split("T")[0],
                isActive: user.isActive,
                email: user.email
            });
        }
    }, [user, reset]);


    const showEmailPassword = mode === "register" || mode === "adminCreate";

    const password = watch("password");
    const newPassword = watch("newPassword");


    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <InputText titulo="Nombre de usuario" nombre="username" register={register} errors={errors.username} rules={userNameRules}/>

            <InputPerfil titulo="Foto de perfil" nombre="avatar" register={register} errors={errors.avatar} currentImage={user?.avatar}/>
            
            <TextArea titulo="Biografia" nombre="bio" register={register} errors={errors.bio} />

            <InputDate titulo="Fecha de nacimiento" nombre="birthDate" register={register} errors={errors.birthDate} rules={birthDateRules}/>

            {showEmailPassword && (

                <div>
                    <InputEmail titulo="Email" nombre="email" register={register} errors={errors.email} rules={emailRules}/>
                    <InputPassword titulo="Contraseña" nombre="password" register={register} errors={errors.password} rules={passwordRules}/>
                    <InputPassword titulo="Confirmar contraseña" nombre="confirmPassword" register={register} errors={errors.confirmPassword} rules={{validate: value => value === password || "Las contraseñas no coinciden"}}/>
                </div>

            )}

            {mode === "edit" && (
                <div>
                    <InputEmail titulo="Email" nombre="email" register={register} errors={errors.email} rules={emailRules}/>
                    <InputPassword titulo="Nueva contraseña" nombre="newPassword" register={register} errors={errors.newPassword}/>
                    <InputPassword titulo="Confirmar contraseña" nombre="confirmPassword" register={register} errors={errors.confirmPassword} rules={{validate: value => {
                                                                                                                                                            if (!newPassword) return true;

                                                                                                                                                            return (
                                                                                                                                                                value === newPassword ||
                                                                                                                                                                "Las contraseñas no coinciden"
                                                                                                                                                            );
                                                                                                                                                        }
                                                                                                                                                    }}/>
                    <InputPassword titulo="Contraseña actual para confirmar" nombre="password" register={register} errors={errors.password} rules={{required: "La contraseña es obligatoria"}}/>
                </div>
            )}

            {mode === "adminEdit" && (
                <div>
                    <InputEmail titulo="Email" nombre="email" register={register} errors={errors.email} rules={emailRules}/>
                    <InputPassword titulo="Nueva contraseña" nombre="newPassword" register={register} errors={errors.newPassword} rules={optionalPasswordRules}/>
                    <InputPassword titulo="Confirmar contraseña" nombre="confirmPassword" register={register} errors={errors.confirmPassword} rules={{validate: value => {
                                                                                                                                                            if (!newPassword) return true;

                                                                                                                                                            return (
                                                                                                                                                                value === newPassword ||
                                                                                                                                                                "Las contraseñas no coinciden"
                                                                                                                                                            );
                                                                                                                                                        }
                                                                                                                                                    }}/>
                    <InputCheckbox titulo="Estado" nombre="isActive" register={register} errors={errors.isActive}/>
                </div>
            )}
            
            <InputSubmitButton label={label}/>

        </form>
        </>
    );
};

export default UserForm;
