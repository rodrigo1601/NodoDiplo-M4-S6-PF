import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDevelopers } from "../../../hooks/developers/useDevelopers";
import { usePlatforms } from "../../../hooks/platforms/usePlatforms";
import { useGenres } from "../../../hooks/genres/useGenres";
import InputText from "../inputs/InputText";
import InputPerfil from "../inputs/InputPerfil";
import InputSubmitButton from "../inputs/InputSubmitButton";
import TextArea from "../inputs/TextArea";
import InputDate from "../inputs/InputDate";
import InputSelect from "../inputs/InputSelect";
import InputCheckboxGroup from "../inputs/InputCheckboxGroup";
import InputGallery from "../inputs/InputGallery";
import RequirementsSection from "./RequirementsSection";
import InputCheckbox from "../inputs/InputCheckbox";
import { requiredIf, slugRules } from "../../../utils/validation";

const ageRating = [
    {
        _id: 10,
        nombre: 10
    },
    {
        _id: 12,
        nombre: 12
    },
    {
        _id: 16,
        nombre: 16
    },
    {
        _id: 18,
        nombre: 18
    }
]

const GameForm = ({onSubmit, game, label, isCreate}) => {

    const { allDevelopers } = useDevelopers();
    const { allGenres } = useGenres();
    const { allPlatforms } = usePlatforms();

    const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();

    useEffect(() => {

    if (!game) return;

        reset({
            nombre: game.nombre,
            slug: game.slug,
            description: game.description,

            releaseDate:
                game.releaseDate?.split("T")[0],

            developer: game.developer?._id,

            genres:
                game.genres?.map(g => g._id),

            platforms:
                game.platforms?.map(p => p._id),

            ageRating: game.ageRating,

            requirements: {
                os: game.requirements?.os,
                cpu: game.requirements?.cpu,
                gpu: game.requirements?.gpu,
                ram: game.requirements?.ram,
                storage: game.requirements?.storage
            },
            isActive: game.isActive
        });

    }, [game, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <InputText titulo="Nombre" nombre="nombre" register={register} errors={errors.nombre} rules={{required: "El nombre es obligatorio"}}/>

            <InputText titulo="Slug" nombre="slug" register={register} errors={errors.slug} rules={slugRules}/>
            
            <InputPerfil titulo="Portada" nombre="portada" register={register} errors={errors.portada} currentImage={game?.portada} rules={requiredIf(isCreate, "La portada es obligatoria")}/>

            <TextArea titulo="Descripcion" nombre="description" register={register} errors={errors.description}/>

            <InputDate titulo="Fecha de salida" nombre="releaseDate" register={register} errors={errors.releaseDate} rules={{required: "La fecha de salida es obligatoria"}}/>

            <InputSelect titulo="Desarrollador" nombre="developer" register={register} errors={errors.developer} options={allDevelopers} rules={{required: "El desarrollador es obligatorio"}}/>

            <InputCheckboxGroup titulo="Generos" nombre="genres" register={register} errors={errors.genres} options={allGenres}/>

            <InputCheckboxGroup titulo="Plataformas" nombre="platforms" register={register} errors={errors.platforms} options={allPlatforms}/>

            <RequirementsSection register={register} errors={errors}/>

            <InputSelect titulo="Age rating" nombre="ageRating" register={register} errors={errors.ageRating} options={ageRating} rules={{required: "El age rating es obligatorio"}}/>

            <InputGallery titulo="Galeria" nombre="images" register={register} setValue={setValue} control={control}errors={errors.images} currentImages={game?.images}/>

            {game && (
                <InputCheckbox titulo="Estado" nombre="isActive" register={register} errors={errors.isActive}/>
            )}

            <InputSubmitButton label={label}/>

        </form>
    );
};

export default GameForm;
