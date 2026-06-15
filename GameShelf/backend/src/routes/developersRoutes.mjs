import express from 'express';
import upload from '../middlewares/uploadMiddleware.mjs';
import { validarDevGen, validarId } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';
import { obtenerTodosController, obtenerDesarrolladorPorIdController , crearDesarrolladorController, actualizarDesarrolladorController, desactivarDesarrolladorController } from '../controllers/developersController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/desarrolladoresPorId/:id', obtenerDesarrolladorPorIdController);

router.post('/crearDesarrollador', upload.single("logo") , validarDevGen(), handleValidationErrors, crearDesarrolladorController);

router.put('/actualizarDesarrollador/:id', upload.single("logo"), validarId(), validarDevGen(), handleValidationErrors, actualizarDesarrolladorController);
router.put('/desactivar/:id', validarId(), handleValidationErrors, desactivarDesarrolladorController);


export default router;