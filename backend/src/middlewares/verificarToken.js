import jwt from 'jsonwebtoken';

// 1. IMPORTAS LA CLAVE DESDE EL CONTROLADOR
import { secretKey } from '../controllers/authController.js'; 

export const verifyToken = (req, res, next) => {
    const token = req.signedCookies.access_token;

    if (!token) return res.status(403).json({ message: "No autorizado" });

    try {
        // 2. USAS LA MISMA CLAVE PARA VERIFICAR
        const data = jwt.verify(token, secretKey);
        
        req.user = data; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};