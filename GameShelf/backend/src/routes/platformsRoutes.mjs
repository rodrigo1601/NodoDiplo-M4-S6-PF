import express from 'express';
import upload from '../middlewares/uploadMiddleware.mjs';
import { validarPlat, validarId } from '../validation/validationRules.mjs';
import { verificarToken, soloAdmin } from '../middlewares/authMiddleware.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { obtenerTodosController, obtenerPlataformaPorIdController , crearPlataformaController, actualizarPlataformaController, desactivarPlataformaController } from '../controllers/platformsController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/plataformasPorId/:id', obtenerPlataformaPorIdController);

router.post('/crearPlataforma', verificarToken, soloAdmin, upload.single("logo"), validarPlat(), handleValidationErrors, crearPlataformaController);

router.put('/actualizarPlataforma/:id', verificarToken, soloAdmin, upload.single("logo"), validarId(), validarPlat(), handleValidationErrors, actualizarPlataformaController);
router.put('/desactivar/:id', verificarToken, soloAdmin, validarId(), handleValidationErrors, desactivarPlataformaController);

export default router;