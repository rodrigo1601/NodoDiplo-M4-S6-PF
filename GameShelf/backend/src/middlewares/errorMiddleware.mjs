import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Errores de validación",
            errores: errors.array().map(err => ({
                campo: err.path,
                valor: err.value,
                mensaje: err.msg
            }))
        });
    }

    next();
};