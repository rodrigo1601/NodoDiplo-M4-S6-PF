import express from 'express';
import { validarUserGame, validarUserGameEdit, validarId } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';
import { obtenerTodosController, obtenerUserGamePorIdController , buscarUserGamePorUsuarioController, crearUserGameController, actualizarUserGameController, eliminarUserGameController } from '../controllers/userGamesController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/userGamesPorId/:id', obtenerUserGamePorIdController);
router.get('/userGamesPorUsuario/:userId', buscarUserGamePorUsuarioController);

router.post('/crearUserGame', validarUserGame(), handleValidationErrors, crearUserGameController);

router.put('/actualizarUserGame/:id', validarId(), validarUserGameEdit(), handleValidationErrors, actualizarUserGameController);

router.delete('/eliminarUserGame/:id', eliminarUserGameController);

export default router;