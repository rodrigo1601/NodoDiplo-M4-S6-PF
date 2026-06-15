import {body, param} from 'express-validator';

// Validaciones para IDs
export const validarId = () => [
    param('id')
        .isMongoId().withMessage('ID inválido')
];

export const validarJuego = () => [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 100 }).withMessage("Debe tener entre 2 y 100 caracteres"),

    body("slug")
        .notEmpty().withMessage("El slug es obligatorio")
        .matches(/^[a-z0-9-]+$/)
        .withMessage("Solo minúsculas, números y guiones"),

    body("descripcion")
        .optional(),

    body("releaseDate")
        .notEmpty().withMessage("La fecha de lanzamiento es obligatoria"),

    body("ageRating")
        .notEmpty().withMessage("El age rating es obligatorio"),

    body("genres")
        .optional(),

    body("platforms")
        .optional(),

    body("developer")
        .optional(),

    body("requirements")
        .optional(),
];

export const validarDevGen = () => [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 100 }).withMessage("Debe tener entre 2 y 100 caracteres"),

    body("slug")
        .notEmpty().withMessage("El slug es obligatorio")
        .matches(/^[a-z0-9-]+$/)
        .withMessage("Solo minúsculas, números y guiones"),

    body("descripcion")
        .optional(),
        
];

export const validarPlat = () => [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 100 }).withMessage("Debe tener entre 2 y 100 caracteres"),

    body("slug")
        .notEmpty().withMessage("El slug es obligatorio")
        .matches(/^[a-z0-9-]+$/)
        .withMessage("Solo minúsculas, números y guiones"),

    body("descripcion")
        .optional(),

    body("miniLogo")
        .notEmpty().withMessage("El miniLogo es obligatorio"),
        
];

export const validarUser = () => [
    body("username")
        .notEmpty().withMessage("El nombre de usuario es obligatorio")
        .isLength({ min: 5, max: 20 }).withMessage("Debe tener entre 5 y 20 caracteres")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Solo letras, números y guiones bajos"),

    body("bio")
        .optional()
        .isString().withMessage("La bio debe ser texto")
        .isLength({ max: 300 }).withMessage("La bio no puede superar 300 caracteres"),

    body("birthDate")
        .notEmpty().withMessage("La fecha de nacimiento es obligatoria")
        .isISO8601().withMessage("Fecha inválida")
        .toDate()
        .custom((value) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (value > today) {
                throw new Error("La fecha no puede ser futura");
            }
            return true;
        }),

    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Email inválido")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 }).withMessage("Debe tener al menos 8 caracteres")
        .matches(/^(?=.*[A-Z])(?=.*\d).+$/)
        .withMessage("Debe contener una mayúscula y un número"),
];

export const validarUserGame = () => [
    body("userId")
        .notEmpty().withMessage("userId es obligatorio")
        .isMongoId().withMessage("userId inválido"),

    body("gameId")
        .notEmpty().withMessage("gameId es obligatorio")
        .isMongoId().withMessage("gameId inválido"),

    body("status")
        .notEmpty().withMessage("El status es obligatorio")
        .isIn(["Jugado", "En progreso", "Pendiente", "Abandonado"])
        .withMessage("Status inválido"),

    body("rating")
        .notEmpty().withMessage("El rating es obligatorio")
        .isIn(["Excelente", "Recomendado", "Meh", "Skip", "N/A"])
        .withMessage("Rating inválido"),

    body("inLibrary")
        .notEmpty().withMessage("El estado en libreria es obligatorio")
        .isBoolean().withMessage("inLibrary debe ser booleano")
        .toBoolean(),

    body("inWishlist")
        .notEmpty().withMessage("El estado en deseos es obligatorio")
        .isBoolean().withMessage("inWishlist debe ser booleano")
        .toBoolean(),
];

export const validarUserGameEdit = () => [
    body("userId")
        .optional()
        .isMongoId().withMessage("userId inválido"),

    body("gameId")
        .optional()
        .isMongoId().withMessage("gameId inválido"),

    body("status")
        .optional()
        .isIn(["Jugado", "En progreso", "Pendiente", "Abandonado"])
        .withMessage("Status inválido"),

    body("rating")
        .optional()
        .isIn(["Excelente", "Recomendado", "Meh", "Skip", "N/A"])
        .withMessage("Rating inválido"),

    body("inLibrary")
        .optional()
        .isBoolean().withMessage("inLibrary debe ser booleano")
        .toBoolean(),

    body("inWishlist")
        .optional()
        .isBoolean().withMessage("inWishlist debe ser booleano")
        .toBoolean(),
];




