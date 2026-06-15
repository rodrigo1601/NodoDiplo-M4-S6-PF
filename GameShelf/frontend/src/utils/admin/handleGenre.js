import { notifySuccess, notifyError } from "../toast";

async function handleAddGenre (genreData, createGenre, onSuccess) {

    const result = await createGenre(genreData);

        if (result.success) {
            notifySuccess(`Genero "${genreData.nombre}" agregado!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al agregar el genero.");
        }
    
};

async function handleEditGenre (id, genreData, updateGenre, onSuccess) {

    const result = await updateGenre(id, genreData);

        if (result.success) {
            notifySuccess(`Genero "${genreData.nombre}" actualizado!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al actualizar el genero.");
        }
    
};


async function handleActivateGenre (genre, ActivateGenre) {

    const result = await ActivateGenre(genre._id, !genre.isActive);

    const status = !genre.isActive ? "activado" : "desactivado";
    const statusText = !genre.isActive ? "activar" : "desactivar";

    if (result.success) {
        notifySuccess(`Genero "${genre.nombre}" ${status}!`);
    } else {
        notifyError(result.message || `Error al ${statusText} el genero.`);
    }
};



export { handleAddGenre, handleEditGenre, handleActivateGenre };