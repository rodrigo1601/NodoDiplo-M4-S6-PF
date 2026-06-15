
/* GENERO */
export function renderizarGenero(genero) {
    return {
        ID: genero._id,
        Genero: genero.nombre,
        Descripcion: genero.descripcion,
        Slug: genero.slug,
        Cantidad: genero.quantity
    };
}

export function renderizarGeneros(generos) {
    return generos.map(genero => renderizarGenero(genero));
}

/* DEVELOPER */
export function renderizarDeveloper(desarrollador) {
    return {
        ID: desarrollador._id,
        Nombre: desarrollador.nombre,
        Slug: desarrollador.slug
    };
}

export function renderizarDevelopers(desarrolladores) {
    return desarrolladores.map(desarrollador => renderizarDeveloper(desarrollador));
}

/* PLATAFORMA */
export function renderizarPlataforma(plataforma) {
    return {
        ID: plataforma._id,
        Nombre: plataforma.nombre,
        Descripcion: plataforma.descripcion,
        Slug: plataforma.slug
    };
}

export function renderizarPlataformas(plataformas) {
    return plataformas.map(plataforma => renderizarPlataforma(plataforma));
}

/* USUARIO */
export function renderizarUsuario(usuario) {
    return {
        ID: usuario._id,
        Username: usuario.username,
        Email: usuario.email,
        Role: usuario.role,
        Avatar: usuario.avatar,
        Bio: usuario.bio,
        BirthDate: usuario.birthDate
    };
}

export function renderizarUsuarios(usuarios) {
    return usuarios.map(usuario => renderizarUsuario(usuario));
}

/* JUEGO */
export function renderizarJuego(juego) {
    return {
        ID: juego._id,
        API_ID: juego.apiId,
        Titulo: juego.nombre,
        Portada: juego.portada,
        Descripcion: juego.description,
        FechaLanzamiento: juego.releaseDate,
        FechaCreacion: juego.createdAt,
        Imagenes: juego.images,
        Generos: juego.genres ? renderizarGeneros(juego.genres) : null,
        Plataformas: juego.platforms ? renderizarPlataformas(juego.platforms) : null,
        Desarrollador: juego.developer ? renderizarDeveloper(juego.developer) : null,
        Requisitos: juego.requirements ? {
            OS: juego.requirements.os,
            CPU: juego.requirements.cpu,
            GPU: juego.requirements.gpu,
            RAM: juego.requirements.ram,
            Storage: juego.requirements.storage
        } : null
    };
}

export function renderizarJuegos(juegos) {
    return juegos.map(juego => renderizarJuego(juego));
}

/* USUARIO BIBLIOTECA */
export function renderizarUserGame(userGame) {
    return {
        ID: userGame._id,
        Usuario: userGame.userId,
        Juego: userGame.gameId,
        Status: userGame.status,
        Rating: userGame.rating,
        Libreria: userGame.inLibrary,
        Wishlist: userGame.inWishlist
    };
}

export function renderizarUserGames(userGames) {
    return userGames.map(userGame => renderizarUserGame(userGame));
}