import gamesRepository from "../repositories/GamesRepository.mjs";

const repo = new gamesRepository();

export async function obtenerTodosLosJuegos() {
    return await repo.obtenerTodos();
}

export async function obtenerJuegoPorId(id) {
    return await repo.obtenerPorId(id);
}

export async function obtenerJuegoPorSlug(slug) {
    return await repo.obtenerPorSlug(slug);
}

export async function obtenerJuegosPorTypeYSlug(slug, type) {
    return await repo.obtenerVariosPorTypeYSlug(slug, type);
}

export async function buscarJuegoPorAtributo(atributo, valor) {
    return await repo.buscarPorAtributo(atributo, valor);
}

export async function crearJuego(juegoData) {
    return await repo.crear(juegoData);
}

export async function actualizarJuego(id, juegoData) {
    return await repo.actualizar(id, juegoData);
}

export async function eliminarJuego(id) {
    return await repo.eliminar(id);
}
