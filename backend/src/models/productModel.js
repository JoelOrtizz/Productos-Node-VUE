import pool from '../db/db.js';

export const getAllProductsModel = async () => {
    const sql = 'SELECT * FROM productes';

    // Agafem els productes de la bd

    const [rows] = await pool.query(sql);

    return rows;
};

export const createProductModel = async (newProduct) => {

    const { nom, quantitat, preu, descripcio } = newProduct;

    const sql = `
        INSERT INTO productes (nom, quantitat, preu, descripcio) 
        VALUES (?, ?, ?, ?)
    `;

    // Creacio baix prevenció injecció sql al parametritzar els camps

    const [result] = await pool.query(sql, [nom, quantitat, preu, descripcio]);


    return result.insertId;
};

export const updateProductModel = async (id, data) => {
    const { nom, quantitat, preu, descripcio } = data;

    // actualitzem els productes també parametritzant 
    const sqlProduct = `
        UPDATE productes 
        SET nom = ?, quantitat = ?, preu = ?, descripcio = ? 
        WHERE id_product = ?
    `;
    await pool.query(sqlProduct, [nom, quantitat, preu, descripcio, id]);
};

export const deleteProductModel = async (id) => {

    const [result] = await pool.query('DELETE FROM productes WHERE id_product = ?', [id]);
    return result;
};

// Finalment eliminació dels productes