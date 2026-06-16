import { notifySuccess, notifyError } from "../toast";

async function handleAddDeveloper (developerData, createDeveloper, onSuccess) {

    const result = await createDeveloper(developerData);

        if (result.success) {
            notifySuccess(`Desarrollador "${developerData.nombre}" agregado!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al agregar el desarrollador.");
        }
    
};

async function handleEditDeveloper (id, developerData, updateDeveloper, onSuccess) {

    const result = await updateDeveloper(id, developerData);

        if (result.success) {
            notifySuccess(`Desarrollador "${developerData.nombre}" actualizado!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al actualizar el desarrollador.");
        }
    
};


async function handleActivateDeveloper (developer, ActivateDeveloper) {

    const result = await ActivateDeveloper(developer._id, !developer.isActive);

    const status = !developer.isActive ? "activado" : "desactivado";
    const statusText = !developer.isActive ? "activar" : "desactivar";

    if (result.success) {
        notifySuccess(`Desarrollador "${developer.nombre}" ${status}!`);
    } else {
        notifyError(result.message || `Error al ${statusText} el desarrollador.`);
    }
};



export { handleAddDeveloper, handleEditDeveloper, handleActivateDeveloper };