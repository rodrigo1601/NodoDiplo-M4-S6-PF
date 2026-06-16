import { notifySuccess, notifyError } from "../toast";

async function handleAddPlatform (platformData, createPlatform, onSuccess) {

    const result = await createPlatform(platformData);

        if (result.success) {
            notifySuccess(`Plataforma "${platformData.nombre}" agregada!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al agregar la plataforma.");
        }
    
};

async function handleEditPlatform (id, platformData, updatePlatform, onSuccess) {

    const result = await updatePlatform(id, platformData);

        if (result.success) {
            notifySuccess(`Plataforma "${platformData.nombre}" actualizada!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al actualizar la plataforma.");
        }
    
};

async function handleActivatePlatform (platform, ActivatePlatform) {

    const result = await ActivatePlatform(platform._id, !platform.isActive);

    const status = !platform.isActive ? "activada" : "desactivada";
    const statusText = !platform.isActive ? "activar" : "desactivar";

    if (result.success) {
        notifySuccess(`Plataforma "${platform.nombre}" ${status}!`);
    } else {
        notifyError(result.message || `Error al ${statusText} la plataforma.`);
    }
};



export { handleAddPlatform, handleEditPlatform, handleActivatePlatform };