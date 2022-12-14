import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import cartRoutes from "../routes/cartRoutes.js"
import productRoutes from "../routes/productRoutes.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('port', port);
app.use('/api/productos', productRoutes);
app.use('/api/carrito', cartRoutes);

const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
});

server.on('error', error => {
    console.log('Error en servidor', error);
});
