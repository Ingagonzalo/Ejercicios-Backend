import express from "express";
import mongoose from "mongoose";
import { config } from "../config/config.js";
import router from "../routes/index.js";


const app = express();
const port = 8080;
app.use("/api",router)
mongoose.connect(config.dbUrl)
.then(() => {
    console.log("database connect")
    app.listen(port, () => {
        console.log(`Servidor http escuchando en el puerto http://localhost:${port}`);
    })
})



