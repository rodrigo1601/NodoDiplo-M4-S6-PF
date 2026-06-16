import { notifySuccess, notifyError } from "../toast";

async function handleAddUser (userData, createUser, onSuccess) {

    const result = await createUser(userData);

        if (result.success) {
            notifySuccess(`Usuario "${userData.username}" agregado!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al agregar el usuario.");
        }
    
};

async function handleEditUser (id, userData, updateUser, onSuccess) {

    const result = await updateUser(id, userData);

        if (result.success) {
            notifySuccess(`Usuario "${userData.username}" actualizado!`);
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al actualizar el usuario.");
        }
    
};

async function handleActivateUser (usuario, ActivateUser) {

    const result = await ActivateUser(usuario._id, !usuario.isActive);

    const status = !usuario.isActive ? "activado" : "desactivado";
    const statusText = !usuario.isActive ? "activar" : "desactivar";

    if (result.success) {
        notifySuccess(`Usuario "${usuario.username}" ${status}!`);
    } else {
        notifyError(result.message || `"Error al ${statusText} el usuario.`);
    }
};


export { handleAddUser, handleEditUser, handleActivateUser };