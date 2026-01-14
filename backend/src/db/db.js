import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'alumno',
    database: 'inventari_db',
    password: 'alumno',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;