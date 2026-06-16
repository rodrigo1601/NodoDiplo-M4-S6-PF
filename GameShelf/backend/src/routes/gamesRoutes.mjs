import express from 'express';
import upload from '../middlewares/uploadMiddleware.mjs';
import { validarJuego, validarId } from '../validation/validationRules.mjs';
import { verificarToken, soloAdmin } from '../middlewares/authMiddleware.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { obtenerTodosController, obtenerJuegoPorIdController, obtenerJuegoPorSlugController, obtenerJuegosPorTypeYSlugController, crearJuegoController, actualizarJuegoController, eliminarJuegoController } from '../controllers/gamesController.mjs';


const router = express.Router();

router.get('/', obtenerTodosController);
router.get('/juegosPorId/:id', obtenerJuegoPorIdController);
router.get('/juegoPorSlug/:slug', obtenerJuegoPorSlugController);
router.get('/juegosPorTypeYSlug/:type/:slug', obtenerJuegosPorTypeYSlugController);

router.post("/crearJuego", verificarToken, soloAdmin,
    upload.fields([
        { name: "portada", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    validarJuego(),
    handleValidationErrors,
    crearJuegoController
);

router.put('/actualizarJuego/:id', verificarToken, soloAdmin,
    upload.fields([
        { name: "portada", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]),
    validarId(),
    validarJuego(),
    handleValidationErrors,
    actualizarJuegoController);

router.delete('/eliminarJuego/:id', eliminarJuegoController);

export default router;