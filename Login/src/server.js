import express, { json, urlencoded } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import expHbs from "express-handlebars";
import router from "./routes/index.js";
import { configObject } from "./config/index.js";


const app = express();
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}; // ESTO ES PARA EL CASO DE QUE USEMOS MONGO ATLAS
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        rolling: true,
        secret: "coderhouse",
        store: new MongoStore({
            mongoUrl: configObject.mongoUrl,
            mongoOptions,
        }),
        cookie: {
            maxAge: 10000, // Cuanto queremos que dure la sesion
        },
    }));

app.engine(".hbs", expHbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");
app.use("/", router);

app.listen(3000, () => {
    console.log("Server listening port 3000 ")
})