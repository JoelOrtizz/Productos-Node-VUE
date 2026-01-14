export const requireAdmin = (req, res, next) => {
    // req.user ya existe gracias a verifyToken que se ejecuta antes
    if (!req.user) {
        return res.status(401).json({ message: "Token no validado previamente" });
    }

    // Verificamos el rol directamente del payload del token
    if (req.user.role === 'admin') {
        next(); // Es admin, pasa al controlador
    } else {
        return res.status(403).json({ message: "Acceso denegado: Se requiere rol de administrador" });
    }
};