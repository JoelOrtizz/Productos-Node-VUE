import bcrypt from 'bcrypt';

import { createUser, getAllUsers } from '../models/modelUsers.js'; 

// POST /api/users
export const register = async (req, res) => {
    try {
        const { name, password, role } = req.body;

        // 1. Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 2. Guardamos en DB
        const id = await createUser({ 
            name, 
            password: hashedPassword, 
            role   
        });
        
        res.status(201).json({ id, name, role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/users
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};