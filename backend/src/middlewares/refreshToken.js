import jwt from 'jsonwebtoken';
import { secretKey } from '../controllers/authController.js'; 

export const refreshToken = (req, res, next) => {
    // Si verifyToken falló, req.user no existirá, así que no hacemos nada
    if (!req.user) return next();

    // 1. Preparamos los datos (quitamos las fechas viejas)
    const { exp, iat, ...userData } = req.user;

    // 2. Firmamos un nuevo token con 1 hora fresca
    const newToken = jwt.sign(userData, secretKey, { expiresIn: '1h' });

    // 3. Actualizamos la cookie
    res.cookie('access_token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        signed: true,
        maxAge: 1000 * 60 * 60 // 1 hora
    });

    // Seguimos al controlador final
    next();
};