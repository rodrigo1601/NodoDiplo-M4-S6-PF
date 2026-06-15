import { notifySuccess, notifyError } from "../toast";

async function handleAddGame (gameData, createGame) {

    const result = await createGame(gameData);

        if (result.success) {
            notifySuccess(`Juego "${gameData.nombre}" agregado!`);
        } else {
            notifyError(result.message || "Error al agregar el juego.");
        }
    
};

async function handleEditGame (id, gameData, updateGame) {

    const result = await updateGame(id, gameData);

        if (result.success) {
            notifySuccess(`Juego "${gameData.nombre}" actualizado!`);
        } else {
            notifyError(result.message || "Error al actualizar el usuario.");
        }
    
};

async function handleDeleteFromCollection (user, userGame, deleteUserGame) {

    if (!user) {
        notifyError("Debes iniciar sesión para eliminar juegos de tu colección.");
        return;
    }

    const result = await deleteUserGame(userGame._id);

    if (result.success) {
        notifySuccess(`Juego "${userGame.gameId.nombre}" eliminado de tu colección!`);
    } else {
        notifyError(result.message || "Error al eliminar el juego de tu colección.");
    }
};



export { handleAddGame, handleEditGame, handleDeleteFromCollection };