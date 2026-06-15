import { notifySuccess, notifyError } from "../toast";

async function handleAddUser (userData, createUser) {

    const result = await createUser(userData);

        if (result.success) {
            notifySuccess(`Usuario "${userData.username}" agregado!`);
        } else {
            notifyError(result.message || "Error al agregar el usuario.");
        }
    
};

async function handleEditUser (id, userData, updateUser) {

    const result = await updateUser(id, userData);

        if (result.success) {
            notifySuccess(`Usuario "${userData.username}" actualizado!`);
        } else {
            notifyError(result.message || "Error al actualizar el usuario.");
        }
    
};

async function handleActivateUser (usuario, ActivateUser) {

    const result = await ActivateUser(usuario._id, !usuario.isActive);

    if (result.success) {
        notifySuccess(`Usuario "${usuario.username}" des!`);
    } else {
        notifyError(result.message || "Error al des el Plataforma.");
    }
};



export { handleAddUser, handleEditUser, handleActivateUser };