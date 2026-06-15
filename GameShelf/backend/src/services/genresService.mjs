import genresRepository from "../repositories/GenresRepository.mjs";

const repo = new genresRepository();

export async function obtenerTodosLosGeneros() {
    return await repo.obtenerTodos();
}

export async function obtenerGeneroPorId(id) {
    return await repo.obtenerPorId(id);
}

export async function buscarGeneroPorAtributo(atributo, valor) {
    return await repo.buscarPorAtributo(atributo, valor);
}

export async function crearGenero(generoData) {
    return await repo.crear(generoData);
}

export async function actualizarGenero(id, generoData) {
    return await repo.actualizar(id, generoData);
}

export async function eliminarGenero(id) {
    return await repo.eliminar(id);
}
