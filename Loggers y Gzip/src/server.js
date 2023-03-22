import compression from "compression";
import logger from "../logsConfig/logsConfig.js";
import express from "express";



const app = express();

const response = "Hola que tal".repeat(1000);


app.use((compression)())

app.get("/info", (req, res) => { //ctrl+F5 para que actualice todo, en el caso que no vea la compresion
    try {
        logger.info("New request in route:", req.route.path)
        res.send(response);

    } catch (err) {
        logger.error("Error:", err.message)
    }

});

app.get("/", (req, res) => { //ctrl+F5 para que actualice todo, en el caso que no vea la compresion
    try {
        const { url, method } = req;
        logger.info(`New request in route: ${url}`)
        res.send(response);

    } catch (err) {
        logger.error("Error:", err.message)
    }

});



app.get("/infozip", compression(), (req, res) => {

    res.send(response);

});


app.get("*", (req, res) => {
    const { url, method } = req;
    logger.warn(`Ruta ${method} ${url} no implementada`);
    res.send(`Ruta ${method} ${url} no está implementada`);
});


const server = app.listen(3000, () => {


    logger.info("Server listening port 3000: http://localhost:3000")
});

server.on('error', (err) => logger.error(err));