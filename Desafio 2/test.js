const Contenedor = require('./desafio2.js');
const products = new Contenedor('productos.txt');

const test = async() => {
    let save = await products.save({
        title: 'coderhouse',
        price: 3597,
        thumbnail: 'https:aswa46542'
    });
    console.log(save)
    let getAll = await products.getAll();
    console.log(getAll)
    let getById = await products.getById(5);
    console.log(getById)
    let deleteById= await products.deleteById(2);
    console.log(deleteById)
    let deleteAll = await products.deleteAll();
    console.log(deleteAll)

};

test();