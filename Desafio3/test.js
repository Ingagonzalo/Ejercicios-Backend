const Contenedor = require('./desafio2.js');
const products = new Contenedor('productos.txt');

const test = async() => {
    let save = await products.save({
        title: 'coderhouse',
        price: 3597,
        thumbnail: 'https:aswa46542'
    });
    let getAll = await products.getAll();
    let getById = await products.getById(5);
    let deleteById= await products.deleteById(2);
    let deleteAll = await products.deleteAll();
    console.log(save)
    console.log(getAll)
    console.log(getById)
    console.log(deleteById)
    console.log(deleteAll)

};

test();