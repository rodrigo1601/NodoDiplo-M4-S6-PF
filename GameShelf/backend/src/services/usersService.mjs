import usersRepository from "../repositories/UsersRepository.mjs";

const repo = new usersRepository();

export async function obtenerTodosLosUsuarios() {
    return await repo.obtenerTodos();
}

export async function obtenerUsuarioPorId(id) {
    return await repo.obtenerPorId(id);
}

export async function buscarUsuarioPorAtributo(atributo, valor) {
    return await repo.buscarPorAtributo(atributo, valor);
}

export async function register(userData){
    return await repo.register(userData);
}

export async function login(email, password) {
    return await repo.login(email, password);
}

export async function crearUsuario(usuarioData) {
    return await repo.register(usuarioData);
}

export async function actualizarUsuario(id, usuarioData) {
    return await repo.actualizar(id, usuarioData);
}

export async function actualizarUsuarioPorAdmin(id, usuarioData) {
    return await repo.actualizarPorAdmin(id, usuarioData);
}

export async function desactivarUsuario(id, usuarioData) {
    return await repo.actualizarEstado(id, usuarioData);
}

export async function eliminarUsuario(id) {
    return await repo.eliminar(id);
}
