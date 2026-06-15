import {obtenerTodosLosGeneros, obtenerGeneroPorId, buscarGeneroPorAtributo , crearGenero, actualizarGenero, eliminarGenero } from '../services/genresService.mjs'
import { renderizarGenero, renderizarGeneros } from "../views/responseView.mjs";
import { uploadImage } from '../services/imageService.mjs';

export async function obtenerTodosController(req, res) {
    try {

        const generos = await obtenerTodosLosGeneros();

        return res.status(200).json({ generos });

    }catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los generos', error: error.message });
    }
}

export async function obtenerGeneroPorIdController(req, res) {
    try {
        const { id } = req.params;
        const genero = await obtenerGeneroPorId(id);

        if (!genero) {
            return res.status(404).send({ mensaje: 'Genero no encontrado' });
        }

        res.status(200).json({ genero });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el genero', error: error.message });
    }
}

export async function crearGeneroController(req, res) {
    try{

        const { nombre, slug } = req.body;

        const existe = await buscarGeneroPorAtributo('nombre', nombre);
        if(existe.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un genero con ese nombre' });
        }

        const existeSlug = await buscarGeneroPorAtributo('slug', slug);
        if(existeSlug.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un genero con ese slug' });
        }
        
        let logoUrl = null;
                
        if(req.file){
            const result = await uploadImage(req.file.buffer, "genres");
            logoUrl = result.secure_url;
        }
                
        const nuevoGenero = {
            ...req.body,
            logo: logoUrl,
            isActive: true
        };

        const generoCreado = await crearGenero(nuevoGenero);

        res.status(201).json({
            mensaje: 'Genero creado correctamente',
            genero: generoCreado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al crear el genero', error: error.message });
    }
}


export async function actualizarGeneroController(req, res) {
    try{
        const { id } = req.params;
        const {nombre, slug, descripcion, isActive} = req.body;
        
        const existe = obtenerGeneroPorId(id);

        if (existe.lenght === 0) {
            return res.status(404).send({ mensaje: 'Genero no encontrado para actualizar' });
        }
        
        let updateData = {
            nombre,
            slug,
            descripcion,
            isActive
        }

        if (req.file){
            const result = await uploadImage(
                req.file.buffer, "genres"
            );

            updateData.logo = result.secure_url;
        }

        const generoActualizado = await actualizarGenero(id, updateData);

        res.status(200).json({
            mensaje: 'Genero actualizado correctamente',
            genero: generoActualizado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al actualizar el genero', error: error.message });
    }
}

export async function desactivarGeneroController(req, res) {
    try {
        const { id } = req.params;
        const { isActive }  = req.body;

        const existe = obtenerGeneroPorId(id);

        if (existe.lenght === 0) {
            return res.status(404).send({ mensaje: 'Genero no encontrado para actualizar' });
        }

        const generoDesactivado = await actualizarGenero(id, {isActive: isActive});

        res.status(200).json({
            mensaje: "Genero desactivado correctamente",
            genero: generoDesactivado
        });

    } catch (error) {
        res.status(500).send({ mensaje: "Error al desactivar el genero", error: error.message });
    }
}
