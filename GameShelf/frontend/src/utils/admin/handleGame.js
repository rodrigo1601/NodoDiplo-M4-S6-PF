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

async function handleActivateGame (game, ActivateGame) {

    const result = await ActivateGame(game._id, !game.isActive);

    const status = !game.isActive ? "activad" : "desactivado";
    const statusText = !game.isActive ? "activar" : "desactivar";

    if (result.success) {
        notifySuccess(`Juego "${game.nombre}" ${status}!`);
    } else {
        notifyError(result.message || `Error al ${statusText} el juego.`);
    }
};

export { handleAddGame, handleEditGame, handleActivateGame };