import {obtenerTodosLosDesarrolladores, obtenerDesarrolladorPorId, buscarDesarrolladorPorAtributo , crearDesarrollador, actualizarDesarrollador, eliminarDesarrollador } from '../services/developersService.mjs'
import { renderizarDeveloper, renderizarDevelopers } from "../views/responseView.mjs";
import { uploadImage } from '../services/imageService.mjs';

export async function obtenerTodosController(req, res) {
    try {

        const desarrolladores = await obtenerTodosLosDesarrolladores();

        return res.status(200).json({desarrolladores});

    }catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los desarrolladores', error: error.message });
    }
}

export async function obtenerDesarrolladorPorIdController(req, res) {
    try {
        const { id } = req.params;
        const desarrollador = await obtenerDesarrolladorPorId(id);

        if (!desarrollador) {
            return res.status(404).send({ mensaje: 'Desarrollador no encontrado' });
        }

        res.status(200).json({ desarrollador });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el desarrollador', error: error.message });
    }
}

export async function crearDesarrolladorController(req, res) {
    try{

        const { nombre, slug } = req.body;

        const existe = await buscarDesarrolladorPorAtributo('nombre', nombre);
        if(existe.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un desarrollador con ese nombre' });
        }

        const existeSlug = await buscarDesarrolladorPorAtributo('slug', slug);
        if(existeSlug.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un desarrollador con ese slug' });
        }


        let logoUrl = null;

        if(req.file){
            const result = await uploadImage(req.file.buffer, "developers");
            
            logoUrl = result.secure_url;
        }

        const nuevoDesarrollador = {
            ...req.body,
            logo: logoUrl,
            isActive: true
        };

        const desarrolladorCreado = await crearDesarrollador(nuevoDesarrollador);

        res.status(201).json({
            mensaje: 'Desarrollador creado correctamente',
            desarrollador: desarrolladorCreado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al crear el desarrollador', error: error.message });
    }
}


export async function actualizarDesarrolladorController(req, res) {
    try{
        const { id } = req.params;
        const {nombre, slug, isActive} = req.body;

        const existe = await obtenerDesarrolladorPorId(id);
        
        if (existe.length === 0) {
            return res.status(404).send({ mensaje: 'Desarrollador no encontrado para actualizar' });
        }
        

        let updateData = {
            nombre,
            slug,
            isActive
        };

        if (req.file){
            const result = await uploadImage(
                req.file.buffer, "developers"
            );

            updateData.logo = result.secure_url;
        }

        const desarrolladorActualizado = await actualizarDesarrollador(id, updateData);

        res.status(200).json({
            mensaje: 'Desarrollador actualizado correctamente',
            desarrollador: desarrolladorActualizado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al actualizar el desarrollador', error: error.message });
    }
}

export async function desactivarDesarrolladorController(req, res) {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const existe = await obtenerDesarrolladorPorId(id);
        
        if (existe.length === 0) {
            return res.status(404).send({ mensaje: 'Desarrollador no encontrado para actualizar' });
        }

        const desarrolladorDesactivado = await actualizarDesarrollador(id, {isActive: isActive});

        res.status(200).json({
            mensaje: "Desarrollador desactivado correctamente",
            desarrollador: desarrolladorDesactivado
        });

    } catch (error) {
        res.status(500).send({ mensaje: "Error al desactivar el desarrollador", error: error.message });
    }
}
