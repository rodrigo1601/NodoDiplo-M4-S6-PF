import express from 'express';
import { validarUserGame, validarUserGameEdit, validarId } from '../validation/validationRules.mjs';
import { verificarToken, soloAdmin } from '../middlewares/authMiddleware.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { obtenerTodosController, obtenerUserGamePorIdController , buscarUserGamePorUsuarioController, crearUserGameController, actualizarUserGameController, eliminarUserGameController } from '../controllers/userGamesController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/userGamesPorId/:id', obtenerUserGamePorIdController);
router.get('/userGamesPorUsuario/:userId', buscarUserGamePorUsuarioController);

router.post('/crearUserGame', verificarToken, validarUserGame(), handleValidationErrors, crearUserGameController);

router.put('/actualizarUserGame/:id', verificarToken, validarId(), validarUserGameEdit(), handleValidationErrors, actualizarUserGameController);

router.delete('/eliminarUserGame/:id', verificarToken, eliminarUserGameController);

export default router;