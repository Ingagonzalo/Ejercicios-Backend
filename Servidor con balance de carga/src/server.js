import express from "express";
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';
import userRouter from './routes/user.js';
import otherRouter from './routes/other.js';
import session from 'express-session';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoStore from 'connect-mongo';

import minimist from 'minimist';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.use(
    session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            options: {
                userNewParser: true,
                useUnifiedTopology: true,
            }
        }),
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }

    }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/usuario', userRouter);
app.use('/test', otherRouter);


const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080 // por default en caso de que no lo mande 
    }
};

const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));