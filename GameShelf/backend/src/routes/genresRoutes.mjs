import express from 'express';
import upload from '../middlewares/uploadMiddleware.mjs';
import { validarDevGen, validarId } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';
import { obtenerTodosController, obtenerGeneroPorIdController , crearGeneroController, actualizarGeneroController, desactivarGeneroController } from '../controllers/genresController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/generosPorId/:id', obtenerGeneroPorIdController);

router.post('/crearGenero', upload.single("logo"), validarDevGen(), handleValidationErrors, crearGeneroController);

router.put('/actualizarGenero/:id', upload.single("logo"), validarId(), validarDevGen(), handleValidationErrors, actualizarGeneroController);
router.put('/desactivar/:id', validarId(), handleValidationErrors, desactivarGeneroController);

export default router;