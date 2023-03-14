import database from "../db/index.js";

const insertProducts = async () => {
    try {
        const products = [

        ];

        await database("products").insert(products);

        console.log("products inserted!");

        database.destroy();
    } catch (err) {
        console.log(err);
        database.destroy();
    }
};

insertProducts();