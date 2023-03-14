import knex from "knex";
import sqliteConfig from "../db/sqlite.js";

const sqliteDatabase = knex(sqliteConfig);

const createProductsTable = async () => {
    try {
        await sqliteDatabase.schema.dropTableIfExists("chat")
        await sqliteDatabase.schema.createTable("chat", (chatTable) => {
            chatTable.string("username", 50).notNullable();
            chatTable.string("message", 100).notNullable();
            chatTable.integer("time").notNullable();
            chatTable.increments("id").primary();
        });
        console.log("chat table created!");
        sqliteDatabase.destroy();

    } catch (err) {
        console.log(err);

        sqliteDatabase.destroy;
    }
};

createProductsTable();