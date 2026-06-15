import express from 'express';
import upload from '../middlewares/uploadMiddleware.mjs';
import { validarId } from '../validation/validationRules.mjs';
import { handleValidationErrors } from '../validation/errorMiddleware.mjs';
import { registerController, loginController, obtenerTodosController, obtenerUsuarioPorIdController , crearUsuarioController, actualizarUsuarioController, actualizarUsuarioPorAdminController, desactivarUsuarioController } from '../controllers/usersController.mjs';

const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/usuariosPorId/:id', obtenerUsuarioPorIdController);

router.post('/crearUsuario', upload.single("avatar"), crearUsuarioController);
router.post('/register', upload.single("avatar"), registerController);
router.post('/login', loginController);

router.put('/actualizarUsuario/:id', upload.single("avatar"), validarId(), handleValidationErrors, actualizarUsuarioController);
router.put('/actualizarUsuarioPorAdmin/:id', upload.single("avatar"), validarId(), handleValidationErrors, actualizarUsuarioPorAdminController);
router.put('/desactivar/:id', validarId(), handleValidationErrors, desactivarUsuarioController);

export default router;