import { config } from "../config/config.js";
import { CartMongoDao } from "./cartMongo.dao.js";
import { ProductMongoDao } from "./productMongo.dao.js";


let CartDao;
let ProductDao;

if (config.database === "MONGO") {
    CartDao = CartMongoDao;
    ProductDao = ProductMongoDao;
}

export const Daos = { CartDao, ProductDao };