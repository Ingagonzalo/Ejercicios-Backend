const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const ProductosContainer = require('../productos.js');
const productos = new ProductosContainer();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//const path = require('path')
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('form'); 
})

app.get('/productos', async (req, res) => {
  const getProductos = await productos.getAll();
  res.render('table', {getProductos});
})

app.post('/productos', async (req, res) => {
  const { nombre, precio, url } = req.body;
  await productos.save({nombre, precio, url});
  const getProductos = await productos.getAll();
  res.render('table', {getProductos});
})

const port = 8080;

const server = app.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
  console.log('Error en servidor', error);
});
