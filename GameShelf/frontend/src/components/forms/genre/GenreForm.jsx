import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputText from "../inputs/InputText";
import InputPerfil from "../inputs/InputPerfil";
import InputSubmitButton from "../inputs/InputSubmitButton";
import TextArea from "../inputs/TextArea";
import InputCheckbox from "../inputs/InputCheckbox";
import { slugRules } from "../../../utils/validation";

const GenreForm = ({onSubmit, genre, label}) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
            if (genre) {
                reset({
                    nombre: genre.nombre,
                    slug: genre.slug,
                    descripcion: genre.descripcion,
                    logo: null,
                    isActive: genre.isActive
                });
            }
        }, [genre, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <InputText titulo="Nombre" nombre="nombre" register={register} errors={errors.nombre} rules={{required: "El nombre es obligatorio"}}/>

            <TextArea titulo="Descripcion" nombre="descripcion" register={register} errors={errors.descripcion}/>

            <InputText titulo="Slug" nombre="slug" register={register} errors={errors.slug} rules={slugRules}/>

            {genre && (
                <InputCheckbox titulo="Estado" nombre="isActive" register={register} errors={errors.isActive}/>
            )}
            
            <InputPerfil titulo="Logo" nombre="logo" register={register} errors={errors.logo} currentImage={genre?.logo}/>

            <InputSubmitButton label={label}/>

        </form>
    );
};

export default GenreForm;
