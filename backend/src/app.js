import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import loginRoutes from './routes/loginRoutes.js';
import usersRoutes from './routes/usersRoutes.js';


import { secretKey } from './controllers/authController.js';

import { verifyToken } from './middlewares/verificarToken.js'; 


import productRoutes from './routes/productRoutes.js'; // Importamos las rutas

const app = express();
const PORT = 3000; 

// --- 1. MIDDLEWARES GLOBALS ---
app.use(express.json());
app.use(cors());
// Important el Cors per a que els ports que son diferents no tinguen conflictes
app.use(cookieParser(secretKey)); 


// --- 2. RUTAS PRINCIPALES ---

app.use('/api/login', loginRoutes); 

app.use('/api/users', usersRoutes);

app.use('/api/products', productRoutes); 

// --- 3. RUTA DE PRUEBA ---
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ 
        message: "¡Acceso concedido! Tienes un token válido."
    });
});

// --- 4. MANEJO DE ERRORES GLOBAL ---
app.use((err, req, res, next) => {
    console.error("Error detectado:", err.stack);
    
    res.status(500).json({ 
        status: 'error',
        message: err.message || 'Error interno del servidor' 
    });
});

app.listen(3000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:3000');
});