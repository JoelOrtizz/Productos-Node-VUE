import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { findUserByName } from '../models/modelUsers.js'; // <--- Importamos del Modelo

export const secretKey = "secret";

export const login = async (req, res) => {
    try {
        const { name, password } = req.body; // Recibimos 'name', no email

        // 1. Buscamos en la DB
        const user = await findUserByName(name);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // 2. Comparamos la contraseña encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // 3. Generamos el Token (Guardamos ID y ROL en el token)
        const token = jwt.sign(
            { id: user.id, role: user.role },
            secretKey,
            { expiresIn: '1h' }
        );

        // 4. Enviamos la Cookie
        res.cookie('access_token', token, {
            httpOnly: true, // La clave: el navegador no puede leerla con JS
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            signed: true
        });

        res.json({ message: "Login exitoso", user: { name: user.name, role: user.role } });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    // Borramos la cookie 'access_token'
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        signed: true 
    });

    res.status(200).json({ message: "Sesión cerrada correctamente" });
};