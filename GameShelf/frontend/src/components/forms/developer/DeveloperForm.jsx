import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputText from "../inputs/InputText";
import InputPerfil from "../inputs/InputPerfil";
import InputSubmitButton from "../inputs/InputSubmitButton";
import InputCheckbox from "../inputs/InputCheckbox";
import { slugRules } from "../../../utils/validation";

const DeveloperForm = ({onSubmit, developer, label}) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (developer) {
            reset({
                nombre: developer.nombre,
                slug: developer.slug,
                logo: null,
                isActive: developer.isActive
            });
        }
    }, [developer, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <InputText titulo="Nombre" nombre="nombre" register={register} errors={errors.nombre} rules={{required: "El nombre es obligatorio"}}/>

            <InputText titulo="Slug" nombre="slug" register={register} errors={errors.slug} rules={slugRules}/>

            {developer && (
                <InputCheckbox titulo="Estado" nombre="isActive" register={register} errors={errors.isActive}/>
            )}
            
            <InputPerfil titulo="Logo" nombre="logo" register={register} errors={errors.logo} currentImage={developer?.logo} />

            <InputSubmitButton label={label}/>

        </form>
    );
};

export default DeveloperForm;
