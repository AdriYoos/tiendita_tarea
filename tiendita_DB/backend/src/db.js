import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'frutas_del_diablo',
    password: 'root_password',
    port: 3307
});

export default pool;
