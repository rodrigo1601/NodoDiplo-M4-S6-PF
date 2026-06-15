import express from 'express';
import upload from '../middlewares/uploadMiddleware.mjs';
import { validarPlat, validarId } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';
import { obtenerTodosController, obtenerPlataformaPorIdController , crearPlataformaController, actualizarPlataformaController, desactivarPlataformaController } from '../controllers/platformsController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/plataformasPorId/:id', obtenerPlataformaPorIdController);

router.post('/crearPlataforma', upload.single("logo"), validarPlat(), handleValidationErrors, crearPlataformaController);

router.put('/actualizarPlataforma/:id', upload.single("logo"), validarId(), validarPlat(), handleValidationErrors, actualizarPlataformaController);
router.put('/desactivar/:id', validarId(), handleValidationErrors, desactivarPlataformaController);

export default router;