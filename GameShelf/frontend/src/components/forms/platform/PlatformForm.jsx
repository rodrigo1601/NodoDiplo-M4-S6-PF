import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputText from "../inputs/InputText";
import InputPerfil from "../inputs/InputPerfil";
import InputSubmitButton from "../inputs/InputSubmitButton";
import TextArea from "../inputs/TextArea";
import InputCheckbox from "../inputs/InputCheckbox";
import InputSelect from "../inputs/InputSelect";
import { slugRules } from "../../../utils/validation";

const miniLogos = [
    {
        _id: "Android",
        nombre: "Android" 
    },
    {
        _id: "Apple",
        nombre: "Apple" 
    },
    {
        _id: "Microsoft",
        nombre: "Microsoft " 
    },
    {
        _id: "Nintendo",
        nombre: "Nintendo" 
    },
    {
        _id: "PlayStation",
        nombre: "PlayStation" 
    },
    {
        _id: "Steam",
        nombre: "Steam" 
    },
    {
        _id: "Web",
        nombre: "Web" 
    },
    {
        _id: "Xbox",
        nombre: "Xbox" 
    },
]

const PlatformForm = ({onSubmit, platform, label}) => {    

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (platform) {
            reset({
                nombre: platform.nombre,
                slug: platform.slug,
                descripcion: platform.descripcion,
                logo: null,
                miniLogo: platform.miniLogo,
                isActive: platform.isActive
            });
        }
    }, [platform, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <InputText titulo="Nombre" nombre="nombre" register={register} errors={errors.nombre} rules={{required: "El nombre es obligatorio"}}/>

            <TextArea titulo="Descripcion" nombre="descripcion" register={register} errors={errors.descripcion}/>

            <InputText titulo="Slug" nombre="slug" register={register} errors={errors.slug} rules={slugRules}/>

            <InputSelect titulo="Tipo" nombre="miniLogo" register={register} errors={errors.miniLogo} options={miniLogos} rules={{required: "El miniLogo es obligatorio"}}/>

            {platform && (
                <InputCheckbox titulo="Estado" nombre="isActive" register={register} errors={errors.isActive}/>
            )}
            
            <InputPerfil titulo="Logo" nombre="logo" register={register} errors={errors.logo} currentImage={platform?.logo}/>

            <InputSubmitButton label={label}/>

        </form>
    );
};

export default PlatformForm;
