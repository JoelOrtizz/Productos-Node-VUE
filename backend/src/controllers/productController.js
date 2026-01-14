import { getAllProductsModel, createProductModel, deleteProductModel, updateProductModel } from '../models/productModel.js';
// Importació del model
export const getProducts = async (req, res) => {
    try {

        const products = await getAllProductsModel();


        res.json(products);

    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// Obtenim productes

export const createProduct = async (req, res) => {
    try {

        const { nom, quantitat, preu, descripcio } = req.body;


        if (!nom || !quantitat || !preu) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }


        const newProductId = await createProductModel({ nom, quantitat, preu, descripcio });

        res.status(201).json({
            message: 'Producto creado correctamente',
            product: {
                id_product: newProductId,
                nom,
                preu,
                descripcio
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto', error: error.message });
    }
};

// Crear productes amb controlador de errors

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        await updateProductModel(id, data);
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// actualitzar els productes 

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteProductModel(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// eliminar els productes amb la mateixa estructura també