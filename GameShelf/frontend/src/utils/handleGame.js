import { notifySuccess, notifyError } from "./toast";

async function handleAddToCollection(type, user, game, createUserGame, updateUserGame, userGameId, inLibrary, inWishlist, onSuccess) {
    if (!user) {
        notifyError("Inicia sesión para añadir juegos a tu librería.");
        return;
    }

    try {
        let result;

        if (!inLibrary && !inWishlist) {
            result = await createUserGame({
                userId: user.id,
                gameId: game._id,
                status: "Pendiente",
                rating: "N/A",
                inLibrary: type === "library",
                inWishlist: type === "wishlist",
            });
        } else if (type === "library" && inWishlist) {
            result = await updateUserGame(userGameId, { inLibrary: true, inWishlist: false });
        }

        if (result?.success) {
            notifySuccess(
                type === "library"
                    ? `"${game.nombre}" agregado a tu libreria!`
                    : `"${game.nombre}" agregado a deseos!`
            );
            onSuccess?.();
        } else {
            notifyError(result?.message || "Algo salió mal.");
        }
    } catch {
        notifyError("Algo salió mal.");
    }
}

async function handleDeleteFromCollection(user, userGame, deleteUserGame, onSuccess) {
    if (!user) {
        notifyError("Inicia sesión para manejar tu librería.");
        return;
    }
    try {
        const result = await deleteUserGame(userGame._id);
        if (result.success) {
            notifySuccess(`"${userGame.gameId.nombre}" removido.`);
            onSuccess?.();
        } else {
            notifyError(result.message || "No se pudo remover el juego.");
        }
    } catch {
        notifyError("No se pudo remover el juego.");
    }
}

export { handleAddToCollection, handleDeleteFromCollection };