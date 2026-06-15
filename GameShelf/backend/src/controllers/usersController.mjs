import {obtenerTodosLosUsuarios, obtenerUsuarioPorId, buscarUsuarioPorAtributo , register, login, crearUsuario, actualizarUsuario, actualizarUsuarioPorAdmin, desactivarUsuario, eliminarUsuario } from '../services/usersService.mjs'
import { renderizarUsuario, renderizarUsuarios } from "../views/responseView.mjs";
import { uploadImage } from '../services/imageService.mjs';
import { successResponse, errorResponse } from '../utils/apiResponse.mjs';


export async function registerController(req, res) {

    try {

        const { username, email, avatar } = req.body;
        const existe = await buscarUsuarioPorAtributo('username', username);

        if(existe.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese nombre' });
        }

        const existeEmail = await buscarUsuarioPorAtributo('email', email);

        if(existeEmail.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese email' });
        }

        let logoUrl = null;
        
        if(req.file){
            const result = await uploadImage(req.file.buffer, "users");        
            logoUrl = result.secure_url;
        }
        
        const nuevoUsuario = {
            ...req.body,
            avatar: logoUrl
        };
        
        const usuario = await register(nuevoUsuario);

        res.status(201).json({
            mensaje: "Usuario registrado",
            usuario
        });

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }

}

export async function loginController(req, res) {

    try {

        const { email, password } = req.body;

        const resultado = await login(
            email,
            password
        );

        res.status(200).json(resultado);

    } catch (error) {

        res.status(401).json({
            mensaje: error.message
        });


    }

}

export async function obtenerTodosController(req, res) {
    try {

        const usuarios = await obtenerTodosLosUsuarios();

        return res.status(200).json({ usuarios });

    }catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los usuarios', error: error.message });
    }
}

export async function obtenerUsuarioPorIdController(req, res) {
    try {
        const { id } = req.params;
        const usuario = await obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).send({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json({ usuario });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el usuario', error: error.message });
    }
}

export async function crearUsuarioController(req, res) {
    try{

        const { username, email, avatar } = req.body;
        const existe = await buscarUsuarioPorAtributo('username', username);

        if(existe.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese nombre' });
        }

        const existeEmail = await buscarUsuarioPorAtributo('email', email);

        if(existeEmail.length > 0){
            return res.status(409).json({ mensaje: 'Ya existe un usuario con ese email' });
        }

        let logoUrl = null;
        
        if(req.file){
            const result = await uploadImage(req.file.buffer, "users");        
            logoUrl = result.secure_url;
        }
        
        const nuevoUsuario = {
            ...req.body,
            avatar: logoUrl
        };

        const usuarioCreado = await crearUsuario(nuevoUsuario);

        res.status(201).json({
            mensaje: 'Usuario creado correctamente',
            usuario: usuarioCreado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al crear el usuario', error: error.message });
    }
}


export async function actualizarUsuarioController(req, res) {
    try{
        const { id } = req.params;
        const { username, email } = req.body;

        const existe = await buscarUsuarioPorAtributo('username', username);

        if(existe.length > 0 && existe[0]._id.toString() !== id){
            return res.status(409).json({ mensaje: 'Ya existe otro usuario con ese nombre' });
        }

        const existe2 = await buscarUsuarioPorAtributo('email', email);
        if(existe2.length > 0 && existe2[0]._id.toString() !== id){
            return res.status(409).json({ mensaje: 'Ya existe otro usuario con ese email' });
        }

        let updateData = req.body;

        if (req.file){
                const result = await uploadImage(
                    req.file.buffer, "users"
                );
        
                updateData.avatar = result.secure_url;
        }

        const usuarioActualizado = await actualizarUsuario(id, updateData);
        
        res.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
}

export async function actualizarUsuarioPorAdminController(req, res) {
    try{
        const { id } = req.params;
        const { username, email } = req.body;

        const existe = await buscarUsuarioPorAtributo('username', username);

        if(existe.length > 0 && existe[0]._id.toString() !== id){
            return res.status(409).json({ mensaje: 'Ya existe otro usuario con ese nombre' });
        }

        const existe2 = await buscarUsuarioPorAtributo('email', email);
        if(existe2.length > 0 && existe2[0]._id.toString() !== id){
            return res.status(409).json({ mensaje: 'Ya existe otro usuario con ese email' });
        }

        let updateData = req.body;

        if (req.file){
                const result = await uploadImage(
                    req.file.buffer, "users"
                );
        
                updateData.avatar = result.secure_url;
        }
        
        const usuarioActualizado = await actualizarUsuarioPorAdmin(id, updateData);

        res.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
}


export async function desactivarUsuarioController(req, res) {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const existe = await obtenerUsuarioPorId(id);
        
        if (existe.length === 0) {
            return res.status(404).send({ mensaje: 'Usuario no encontrado para actualizar' });
        }

        const usuarioDesactivado = await desactivarUsuario(id, {isActive: isActive});

        res.status(200).json({
            mensaje: "Usuario desactivado correctamente",
            usuario: usuarioDesactivado
        });

    } catch (error) {
        res.status(500).send({ mensaje: "Error al desactivar el usuario", error: error.message });
    }
}
