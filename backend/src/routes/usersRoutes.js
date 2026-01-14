import express from 'express';

import { register, getUsers } from '../controllers/userController.js';

import { verifyToken } from '../middlewares/verificarToken.js'; 
import { refreshToken } from '../middlewares/refreshToken.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

const router = express.Router();

// Ruta para crear usuario
router.post('/', verifyToken, refreshToken, requireAdmin, register);

// Ruta para ver usuarios (protegida)
router.get('/', verifyToken, refreshToken, requireAdmin, getUsers);

export default router;     