import userGamesRepository from "../repositories/UserGamesRepository.mjs";

const repo = new userGamesRepository();

export async function obtenerTodosLosUserGames() {
    return await repo.obtenerTodos();
}

export async function obtenerUserGamePorId(id) {
    return await repo.obtenerPorId(id);
}

export async function buscarUserGamePorAtributo(atributo, valor) {
    return await repo.buscarPorAtributo(atributo, valor);
}

export async function buscarUserGamesPorUsuario(userId) {
    return await repo.buscarPorUsuario(userId);
}

export async function buscarUserGame(userId, gameId) {
    return await repo.buscarPorUsuarioYJuego(userId, gameId);
}

export async function crearUserGame(userGameData) {
    return await repo.crear(userGameData);
}

export async function actualizarUserGame(id, userGameData) {
    return await repo.actualizar(id, userGameData);
}

export async function eliminarUserGame(id) {
    return await repo.eliminar(id);
}
