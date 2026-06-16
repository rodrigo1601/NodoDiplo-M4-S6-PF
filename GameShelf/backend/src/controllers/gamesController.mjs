import {obtenerTodosLosJuegos, obtenerJuegoPorId, obtenerJuegoPorSlug, obtenerJuegosPorTypeYSlug,
    buscarJuegoPorAtributo , crearJuego, actualizarJuego, eliminarJuego } from '../services/gamesService.mjs'
import { renderizarJuego, renderizarJuegos } from "../views/responseView.mjs";
import { uploadImage } from '../services/imageService.mjs';

export async function obtenerTodosController(req, res) {
    try {

        const juegos = await obtenerTodosLosJuegos();

        return res.status(200).json({ juegos });

    }catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los juegos', error: error.message });
    }
}

export async function obtenerJuegoPorIdController(req, res) {
    try {
        const { id } = req.params;
        const juego = await obtenerJuegoPorId(id);

        if (!juego) {
            return res.status(404).send({ mensaje: 'Juego no encontrado' });
        }

        res.status(200).json({ juego });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el juego', error: error.message });
    }
}

export async function obtenerJuegoPorSlugController(req, res) {
    try {
        const { slug } = req.params;

        const juego = await obtenerJuegoPorSlug(slug);

        if (!juego || juego.length === 0) {
            return res.status(404).send({ mensaje: 'Juego no encontrado' });
        }

        res.status(200).json({ juego });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el juego', error: error.message });
    }
}

export async function obtenerJuegosPorTypeYSlugController(req, res) {
    try {
        const { slug } = req.params;
        const { type } = req.params;

        const juegos = await obtenerJuegosPorTypeYSlug(slug, type);


        if (!juegos) {
            return res.status(404).send({ mensaje: 'Juegos nos encontrado' });
        }

        res.status(200).json({ juegos });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los juegos', error: error.message });
    }
}

export async function crearJuegoController(req, res) {
    try{

        const { nombre, slug, description, releaseDate, developer, ageRating } = req.body;
        
        const existe = await buscarJuegoPorAtributo('nombre', nombre);
        if(existe.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un juego con ese nombre' });
        }

        const existeSlug = await buscarJuegoPorAtributo('slug', slug);
        if(existeSlug.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un juego con ese mismo slug' });
        }

        let portadaUrl = null;

        if(req.files?.portada?.length){
            const result = await uploadImage(
                req.files.portada[0].buffer,
                "games/portadas"
            );

            portadaUrl = result.secure_url;
        }

        let imagesUrls = [];

        if (req.files?.images?.length) {

            imagesUrls = await Promise.all(
                req.files.images.map(file =>
                    uploadImage(file.buffer, "games/images")
                )
            );

            imagesUrls = imagesUrls.map(r => r.secure_url);
        }

        const genres = Array.isArray(req.body.genres)
            ? req.body.genres
            : [req.body.genres];

        const platforms = Array.isArray(req.body.platforms)
            ? req.body.platforms
            : [req.body.platforms];

        const requirements = req.body.requirements
            ? JSON.parse(req.body.requirements)
            : {};

        const nuevoJuego = {
            nombre,
            slug,
            description,
            releaseDate,
            developer,
            ageRating,
            portada: portadaUrl,
            images: imagesUrls,
            genres,
            platforms,
            requirements,
            isActive: true
        };

        const juegoCreado = await crearJuego(nuevoJuego);

        res.status(201).json({
            mensaje: 'Juego creado correctamente',
            juego: juegoCreado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al crear el juego', error: error.message });
    }
}


export async function actualizarJuegoController(req, res) {
    try {
        const { id } = req.params;

        const {
            nombre,
            slug,
            description,
            releaseDate,
            developer,
            ageRating,
            existingImages,
            isActive
        } = req.body;

        let portadaUrl;

        if (req.files?.portada?.length) {
            const result = await uploadImage(
                req.files.portada[0].buffer,
                "games/portadas"
            );

            portadaUrl = result.secure_url;
        }

        // IMÁGENES NUEVAS
        let newImages = [];

        if (req.files?.images?.length) {
            const uploaded = await Promise.all(
                req.files.images.map(file =>
                    uploadImage(file.buffer, "games/images")
                )
            );

            newImages = uploaded.map(r => r.secure_url);
        }

        //  EXISTENTES
        const parsedExisting = existingImages
            ? JSON.parse(existingImages)
            : [];

        const genres = Array.isArray(req.body.genres)
            ? req.body.genres
            : [req.body.genres];

        const platforms = Array.isArray(req.body.platforms)
            ? req.body.platforms
            : [req.body.platforms];

        const requirements = req.body.requirements
            ? JSON.parse(req.body.requirements)
            : {};

        const juegoData = {
            nombre,
            slug,
            description,
            releaseDate,
            developer,
            ageRating,
            genres,
            platforms,
            requirements,
            isActive,
            images: [...parsedExisting, ...newImages],
            ...(portadaUrl && { portada: portadaUrl })
        };

        const juegoActualizado = await actualizarJuego(id, juegoData);

        if (!juegoActualizado) {
            return res.status(404).send({
                mensaje: "Juego no encontrado para actualizar"
            });
        }

        res.status(200).json({
            mensaje: "Juego actualizado correctamente",
            juego: juegoActualizado
        });

    } catch (error) {
        res.status(500).send({
            mensaje: "Error al actualizar el juego",
            error: error.message
        });
    }
}

export async function desactivarJuegoController(req, res) {
    try {
        const { id } = req.params;
        const { isActive }  = req.body;

        const existe = obtenerJuegoPorId(id);

        if (existe.lenght === 0) {
            return res.status(404).send({ mensaje: 'Juego no encontrado para actualizar' });
        }
        const juegoDesactivado = await actualizarJuego(id, {isActive: isActive});

        res.status(200).json({
            mensaje: "Juego desactivado correctamente",
            juego: juegoDesactivado
        });

    } catch (error) {
        res.status(500).send({ mensaje: "Error al desactivar el juego", error: error.message });
    }
}
