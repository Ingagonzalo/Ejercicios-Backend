import { products } from "../model/product.model.js";
import { MongoDao } from "./mongo.dao.js";

export class ProductMongoDao extends MongoDao {
    constructor() {
        super(products);
    }
}