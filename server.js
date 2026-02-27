const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rs6_clean',
    password: '1234',
    port: 5432,
});

app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rs6_stats');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }

});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
