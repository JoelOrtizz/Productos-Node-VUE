import express from 'express';

import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { verifyToken } from '../middlewares/verificarToken.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

const router = express.Router();

router.get('/', getProducts, verifyToken, requireAdmin);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;

// Aquesta part del codi bàsicament importem les funcionalitats del controlador de Producte, així com
// la verificiacio de token y el requeriment de admin per a poder accedir a qualsevol de les peticions 