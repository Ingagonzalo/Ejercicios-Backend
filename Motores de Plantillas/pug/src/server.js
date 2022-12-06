const express = require('express');
const pug = require('pug');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let form = Boolean(true)

app.get('/', (req, res) => {
  form = true;
  res.render('../views/main', { form });
})

app.get('/productos', async (req, res) => {
  form = false;
  const getProductos = await productos.getAll();
  res.render('../views/main', { getProductos, form });
})

app.post('/productos', async (req, res) => {
  form = false;
  const { nombre, precio, url } = req.body;
  await productos.save({ nombre, precio, url });
  const getProductos = await productos.getAll();
  res.render('../views/main', { getProductos, form });
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});