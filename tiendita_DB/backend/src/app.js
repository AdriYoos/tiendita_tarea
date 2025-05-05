import cors from 'cors';
import express from 'express';
import db from './db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('API en funcionamiento ✅');
});

// Ruta simple: roman_name, precio, filename
app.get('/frutas/simple', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT roman_name, precio, filename,type,id FROM frutas_del_diablo');
    res.json(rows);
  } catch (err) {
    console.error('Error en /frutas/simple:', err);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

app.get('/frutas/completo/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.query(`
      SELECT f.*, i.cantidad 
      FROM frutas_del_diablo f
      LEFT JOIN inventario i ON f.id = i.id_frutas
      WHERE f.id = ?`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Fruta no encontrada' });
    }

    res.json(rows[0]); 
  } catch (err) {
    console.error(`Error en /frutas/completo/${id}:`, err);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

app.put('/frutas/inventario/:id', async (req, res) => {
  const id = req.params.id;
  const { cantidad } = req.body;

  if (typeof cantidad !== 'number' || cantidad < 0) {
    return res.status(400).json({ error: 'Cantidad inválida. Debe ser un número no negativo.' });
  }

  try {
    const [result] = await db.query('UPDATE inventario SET cantidad = ? WHERE id_frutas = ?', [cantidad, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Fruta no encontrada en el inventario' });
    }

    res.json({ mensaje: 'Cantidad actualizada correctamente', id, cantidad });
  } catch (err) {
    console.error(`Error en /frutas/inventario/${id}:`, err);
    res.status(500).json({ error: 'Error al actualizar la cantidad' });
  }
});

app.post('/carrito/agregar', async (req, res) => {
  const { id, cantidad } = req.body;

  if (!id || typeof cantidad !== 'number' || cantidad <= 0) {
    return res.status(400).json({ error: 'Datos inválidos. Se requiere id y cantidad > 0.' });
  }

  const connection = await db.getConnection(); // usa pool.getConnection()

  try {
    await connection.beginTransaction();

    // Verificar inventario actual
    const [[inventario]] = await connection.query(
      'SELECT cantidad FROM inventario WHERE id_frutas = ? FOR UPDATE',
      [id]
    );

    if (!inventario) {
      await connection.rollback();
      return res.status(404).json({ error: 'Fruta no encontrada en inventario' });
    }

    const nuevaCantidad = inventario.cantidad - cantidad;
    if (nuevaCantidad < 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'No hay suficiente inventario disponible' });
    }

    // Actualizar inventario
    await connection.query('UPDATE inventario SET cantidad = ? WHERE id_frutas = ?', [
      nuevaCantidad,
      id,
    ]);

    // Insertar en carrito
    await connection.query('INSERT INTO carrito (id_fruta, cantidad) VALUES (?, ?)', [
      id,
      cantidad,
    ]);

    await connection.commit();
    res.json({
      mensaje: 'Producto agregado al carrito y cantidad actualizada',
      id,
      cantidadAgregada: cantidad,
      inventarioRestante: nuevaCantidad,
    });
  } catch (err) {
    await connection.rollback();
    console.error('Error al agregar al carrito con inventario:', err);
    res.status(500).json({ error: 'Error en la operación. Se revirtió la transacción.' });
  } finally {
    connection.release();
  }
});


app.post('/carrito/restaurar/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // 1. Buscar el producto en carrito
    const [carrito] = await db.query('SELECT * FROM carrito WHERE id = ?', [id]);

    if (carrito.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    const { id_fruta, cantidad } = carrito[0];

    // 2. Sumar la cantidad al inventario
    await db.query('UPDATE inventario SET cantidad = cantidad + ? WHERE id_frutas = ?', [cantidad, id_fruta]);

    // 3. Eliminar del carrito
    await db.query('DELETE FROM carrito WHERE id = ?', [id]);

    res.json({ mensaje: 'Producto restaurado al inventario y eliminado del carrito', id_fruta, cantidad });
  } catch (err) {
    console.error(`Error al restaurar producto desde carrito:`, err);
    res.status(500).json({ error: 'Error al restaurar producto' });
  }
});

app.get('/carrito/mostrar', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        c.id, 
        c.id_fruta, 
        c.cantidad, 
        f.name, 
        f.filename
      FROM carrito c
      JOIN frutas_del_diablo f ON c.id_fruta = f.id
    `);

    res.json(rows);
  } catch (err) {
    console.error('Error al obtener el contenido del carrito con detalles de frutas:', err);
    res.status(500).json({ error: 'Error al obtener los datos del carrito' });
  }
});


app.delete('/carrito/eliminar', async (req, res) => {
  try {
    await db.query('DELETE FROM carrito');
    res.json({ mensaje: 'Carrito vaciado correctamente' });
  } catch (err) {
    console.error('Error al vaciar carrito:', err);
    res.status(500).json({ error: 'Error al vaciar carrito' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
