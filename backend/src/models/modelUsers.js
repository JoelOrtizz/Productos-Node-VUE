import pool from '../db/db.js';

// 1. Para el Login: Buscar usuario por Nombre
export const findUserByName = async (name) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
    return rows[0];
};

// 2. Para el POST users: Crear usuario nuevo
export const createUser = async (userData) => {
    const { name, password, role } = userData;
    // Asignamos 'user' por defecto si no envían rol
    const userRole = role || 'user'; 
    
    const [result] = await pool.query(
        'INSERT INTO users (name, password, role) VALUES (?, ?, ?)', 
        [name, password, userRole]
    );
    return result.insertId;
};

// 3. Para el GET users: Listar todos (sin devolver la password por seguridad)
export const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT id, name, role FROM users');
    return rows;
};
