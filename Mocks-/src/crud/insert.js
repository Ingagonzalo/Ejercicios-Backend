import database from "../db/index.js";

const insertProducts = async () => {
    try {
        const products = [
            {
                title: "Escuadra",
                price: 123.45,
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                id: 1
            },
            {
                title: "Calculadora",
                price: 234.56,
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
                id: 2
            },
            {
                title: "Computadora",
                price: 345.67,
                thumbnail: "https://www.tecnologia-informatica.com/wp-content/uploads/2018/07/funciones-de-la-computadora-1.jpeg",
                id: 3
            },
            {
                title: "Teclado",
                price: 900,
                thumbnail: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Computer_keyboard_ES_layout.svg",
                id: 4
            },
            {
                title: "Regla",
                price: 345.67,
                thumbnail: "https://www.shutterstock.com/image-vector/school-measuring-plastic-ruler-20-260nw-615662024.jpg",
                id: 5
            }
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