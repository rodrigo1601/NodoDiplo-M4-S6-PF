import developersRepository from "../repositories/DevelopersRepository.mjs";

const repo = new developersRepository();

export async function obtenerTodosLosDesarrolladores() {
    return await repo.obtenerTodos();
}

export async function obtenerDesarrolladorPorId(id) {
    return await repo.obtenerPorId(id);
}

export async function buscarDesarrolladorPorAtributo(atributo, valor) {
    return await repo.buscarPorAtributo(atributo, valor);
}

export async function crearDesarrollador(desarrolladorData) {
    return await repo.crear(desarrolladorData);
}

export async function actualizarDesarrollador(id, desarrolladorData) {
    return await repo.actualizar(id, desarrolladorData);
}

export async function eliminarDesarrollador(id) {
    return await repo.eliminar(id);
}
