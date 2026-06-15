import platformsRepository from "../repositories/PlatformsRepository.mjs";

const repo = new platformsRepository();

export async function obtenerTodosasPlataformas() {
    return await repo.obtenerTodos();
}

export async function obtenerPlataformaPorId(id) {
    return await repo.obtenerPorId(id);
}

export async function buscarPlataformaPorAtributo(atributo, valor) {
    return await repo.buscarPorAtributo(atributo, valor);
}

export async function crearPlataforma(plataformaData) {
    return await repo.crear(plataformaData);
}

export async function actualizarPlataforma(id, plataformaData) {
    return await repo.actualizar(id, plataformaData);
}

export async function eliminarPlataforma(id) {
    return await repo.eliminar(id);
}
