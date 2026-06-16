import express from 'express';
import upload from '../middlewares/uploadMiddleware.mjs';
import { validarDevGen, validarId } from '../validation/validationRules.mjs';
import { verificarToken, soloAdmin } from '../middlewares/authMiddleware.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { obtenerTodosController, obtenerDesarrolladorPorIdController , crearDesarrolladorController, actualizarDesarrolladorController, desactivarDesarrolladorController } from '../controllers/developersController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/desarrolladoresPorId/:id', obtenerDesarrolladorPorIdController);

router.post('/crearDesarrollador', verificarToken, soloAdmin, upload.single("logo") , validarDevGen(), handleValidationErrors, crearDesarrolladorController);

router.put('/actualizarDesarrollador/:id', verificarToken, soloAdmin, upload.single("logo"), validarId(), validarDevGen(), handleValidationErrors, actualizarDesarrolladorController);
router.put('/desactivar/:id', verificarToken, soloAdmin, validarId(), handleValidationErrors, desactivarDesarrolladorController);


export default router;