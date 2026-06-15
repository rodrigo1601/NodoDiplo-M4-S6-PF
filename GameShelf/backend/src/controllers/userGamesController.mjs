import {obtenerTodosLosUserGames, obtenerUserGamePorId, buscarUserGamePorAtributo, buscarUserGamesPorUsuario, buscarUserGame , crearUserGame, actualizarUserGame, eliminarUserGame } from '../services/userGamesService.mjs'
import { renderizarUserGame, renderizarUserGames } from "../views/responseView.mjs";

export async function obtenerTodosController(req, res) {
    try {

        const userGames = await obtenerTodosLosUserGames();

        return res.status(200).json({ userGames });

    }catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los userGames', error: error.message });
    }
}

export async function obtenerUserGamePorIdController(req, res) {
    try {
        const { id } = req.params;
        const userGame = await obtenerUserGamePorId(id);

        if (!userGame) {
            return res.status(404).send({ mensaje: 'UserGame no encontrado' });
        }

        res.status(200).json({ userGame });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el userGame', error: error.message });
    }
}

export async function buscarUserGamePorUsuarioController(req, res) {
    try {
        const { userId } = req.params;
        const userGames = await buscarUserGamesPorUsuario(userId);

        res.status(200).json({ userGames });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los userGames', error: error.message });
    }
}

export async function crearUserGameController(req, res) {
    try{

        const { userId, gameId } = req.body;
        const existe = await buscarUserGame(userId, gameId);

        if(existe){
            return res.status(409).json({ mensaje: 'Ya existe un userGame con ese userId y gameId' });
        }

        const nuevoUserGame = req.body;
        const userGameCreado = await crearUserGame(nuevoUserGame);

        res.status(201).json({
            mensaje: 'UserGame creado correctamente',
            userGame: userGameCreado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al crear el userGame', error: error.message });
    }
}


export async function actualizarUserGameController(req, res) {
    try{
        const { id } = req.params;
        const userGameData = req.body;

        const userGameActualizado = await actualizarUserGame(id, userGameData);
        
        if (!userGameActualizado) {
            return res.status(404).send({ mensaje: 'UserGame no encontrado para actualizar' });
        }
        
        res.status(200).json({
            mensaje: 'UserGame actualizado correctamente',
            userGame: userGameActualizado
        });

    }catch (error){
        res.status(500).send({ mensaje: 'Error al actualizar el userGame', error: error.message });
    }
}

export async function eliminarUserGameController(req, res) {
    try {
        const { id } = req.params;

        const userGameEliminado = await eliminarUserGame(id);

        if (!userGameEliminado) {
            return res.status(404).send({ mensaje: "UserGame no encontrado para eliminar" });
        }

        res.status(200).json({
            mensaje: "UserGame eliminado correctamente",
            userGame: userGameEliminado
        });

    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar el userGame", error: error.message });
    }
}
