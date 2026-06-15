import { notifySuccess, notifyError, notifyInfo } from "./toast";

async function handleLogin(data, login, navigate) {
    try {
        const result = await login(data);

        if (result.success) {
            notifySuccess(`Bienvenido ${result.user}!`);
            navigate("/");
        } else {
            notifyError(result.message || "Error al iniciar sesión.");
        }
    } catch {
        notifyError("Error al iniciar sesión.");
    }
}

async function handleRegister(data, register, navigate) {
    try {
        const result = await register(data);
        if (result.success) {
            notifySuccess("Registro exitoso!");
            navigate("/");
        } else {
            notifyError(result.message || "Error al crear cuenta.");
        }
    } catch {
        notifyError("Error al crear cuenta.");
    }
}

async function handleUpdateUser(id, data, updateUser, onSuccess) {
    try {
        const result = await updateUser(id, data);
        if (result.success) {
            notifySuccess("Perfil actualizado!");
            onSuccess?.();
        } else {
            notifyError(result.message || "Error al actualizar cuenta.");
        }
    } catch {
        notifyError("Error al actualizar cuenta.");
    }
}

async function handleLogout(logout, navigate) {
    try {
        await logout();
        notifyInfo("Nos vemos pronto!");
        navigate("/");
    } catch {
        notifyError("No se pudo cerrar la sesión.");
    }
}

export { handleLogin, handleRegister, handleUpdateUser, handleLogout };