import knex from "knex";
import config from "../db/index.js";

const database = knex(config);

const createProductsTable = async () => {
    try {
        await database.schema.dropTableIfExists("products")
        await database.schema.createTable("products", (prodTable) => {
            prodTable.string("title", 50).notNullable();
            prodTable.float("price").notNullable();
            prodTable.string("thumbnail", 100).notNullable();
            prodTable.increments("id").primary();
        });
        console.log("products table created!");
        database.destroy();

    } catch (err) {
        console.log(err);

        database.destroy;
    }
};

createProductsTable();