import {obtenerTodosasPlataformas, obtenerPlataformaPorId, buscarPlataformaPorAtributo , crearPlataforma, actualizarPlataforma, eliminarPlataforma } from '../services/platformsService.mjs'
import { renderizarPlataforma, renderizarPlataformas } from "../views/responseView.mjs";
import { uploadImage } from '../services/imageService.mjs';

export async function obtenerTodosController(req, res) {
    try {

        const plataformas = await obtenerTodosasPlataformas();

        return res.status(200).json({ plataformas });

    }catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener las plataformas', error: error.message });
    }
}

export async function obtenerPlataformaPorIdController(req, res) {
    try {
        const { id } = req.params;
        const plataforma = await obtenerPlataformaPorId(id);

        if (!plataforma) {
            return res.status(404).send({ mensaje: 'Plataforma no encontrada' });
        }

        res.status(200).json({ plataforma });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener la plataforma', error: error.message });
    }
}

export async function crearPlataformaController(req, res) {
    try{

        const { nombre, slug } = req.body;

        const existe = await buscarPlataformaPorAtributo('nombre', nombre);
        if(existe.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe una plataforma con ese nombre' });
        }

        const existeSlug = await buscarPlataformaPorAtributo('slug', slug);
        if(existeSlug.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe una plataforma con ese slug' });
        }

        let logoUrl = null;
        
        if(req.file){
            const result = await uploadImage(req.file.buffer, "platforms");
            logoUrl = result.secure_url;
        }
        
        const nuevoDesarrollador = {
            ...req.body,
            logo: logoUrl,
            isActive: true
        };

        const plataformaCreada = await crearPlataforma(nuevoDesarrollador);

        res.status(201).json({
            mensaje: 'Plataforma creada correctamente',
            plataforma: plataformaCreada
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al crear la plataforma', error: error.message });
    }
}


export async function actualizarPlataformaController(req, res) {
    try{
        const { id } = req.params;
        const {nombre, slug, descripcion, isActive, miniLogo} = req.body;

        const existe = obtenerPlataformaPorId(id)

        if (existe.lenght === 0) {
            return res.status(404).send({ mensaje: 'Plataforma no encontrada para actualizar' });
        }

        let updateData = {
            nombre,
            slug,
            descripcion,
            isActive,
            miniLogo
        };
        
        if (req.file){
            const result = await uploadImage(
                req.file.buffer, "platforms"
            );
        
            updateData.logo = result.secure_url;
        }

        const plataformaActualizada = await actualizarPlataforma(id, updateData);

        res.status(200).json({
            mensaje: 'Plataforma actualizada correctamente',
            plataforma: plataformaActualizada
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al actualizar la plataforma', error: error.message });
    }
}

export async function desactivarPlataformaController(req, res) {
    try {
        const { id } = req.params;
        const { isActive }  = req.body;

        const existe = obtenerPlataformaPorId(id)

        if (existe.lenght === 0) {
            return res.status(404).send({ mensaje: 'Plataforma no encontrada para actualizar' });
        }

        const plataformaDesactivada = await actualizarPlataforma(id, {isActive: isActive});

        res.status(200).json({
            mensaje: "Plataforma eliminada correctamente",
            plataforma: plataformaDesactivada
        });

    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar la plataforma", error: error.message });
    }
}
