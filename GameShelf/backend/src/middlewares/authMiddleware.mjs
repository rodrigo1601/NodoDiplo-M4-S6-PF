import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }
};

export const soloAdmin = (req, res, next) => {
    if (req.user?.role !== 1) {
        return res.status(403).json({ mensaje: "Acceso denegado" });
    }
    next();
};