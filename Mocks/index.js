import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars';
import router from './routes/routes.js';
import { productController } from './controller/productController.js';
import { chatController } from './controller/chatController.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();
const http = new HTTPServer(app);
const io = new IOServer(http);

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/productos', router);

app.get('/productos', (req, res) => {
    res.render('form')
})

io.on('connection', async (socket) => {
    console.log('Usuario nuevo conectado');

    const products = await productController.getAll();
    socket.emit('all_products', products)

    const chatData = await chatController.chatRead();
    socket.emit('all_messages', chatData);

    socket.on('add_product', async data => {
        await productController.saveFormProduct(data);
        io.sockets.emit('all_products', await productController.getAll())
    });

    socket.on('new_message', async data => {
        await chatController.messageInsert(data)
        io.sockets.emit('all_messages', await chatController.chatRead())
    })

})

const connectedServer = http.listen(8080, () => {
    console.log('Servidor http con Socket listo ');
})
