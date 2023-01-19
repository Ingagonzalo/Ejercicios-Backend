import { carts } from "../model/cart.model.js";
import { MongoDao } from "./mongo.dao.js";

export class CartMongoDao extends MongoDao {
    constructor() {
        super(carts);
    }
}