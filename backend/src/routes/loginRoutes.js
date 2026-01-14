import express from 'express';

import { login, logout } from '../controllers/authController.js';

const router = express.Router();

// Cuando alguien haga POST a /api/login, ejecutamos la función login
router.post('/', login);

router.post('/logout', logout);

export default router;