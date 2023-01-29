import express, { json, urlencoded } from 'express';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import router from "./routes/index.js";
import { Server as IOServer } from 'socket.io';
import moment from 'moment'
import Contenedor from './crud/Contenedor.js';
import sqliteConfig from './db/sqlite.js';
import config from './db/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main.html',
    layoutsDir: join(__dirname, '/views/layouts'),
    partialsDir: join(__dirname, '/views/partials')
}));

app.set('view engine', 'hbs');
app.set('views', join(__dirname, '/views'));

app.use('/', router)

const expressServer = app.listen('3000', () => {
    console.log("server listening port 3000");
})

const io = new IOServer(expressServer);

const productApi = new Contenedor(config, "products")
const messageApi = new Contenedor(sqliteConfig, "chat")

const time = moment().format('DD MM YYYY hh:mm:ss');

app.use(express.static(__dirname + "/views/layouts"));

io.on("connection", async (socket) => {
    console.log(`New connection, socket ID: ${socket.id}`);

    socket.emit("server:message", await messageApi.getAll());

    socket.emit("server:product", await productApi.getAll());

    socket.on("client:message", async (messageInfo) => {
        await messageApi.save({ ...messageInfo, time });
        io.emit("server:message", await messageApi.getAll());
    });
    socket.on("client:product", async (product) => {
        await productApi.save(product)
        io.emit("server:product", await productApi.getAll());
    })
});

app.on('error', (err) => {
    console.log(err);
})

