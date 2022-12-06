const { promises: fs } = require ('fs')

class Productos {
    constructor(path) {
        this.path = path;
        this.productos = [];
    }

    async getAll() {
        try {
            const file = await fs.readFile(`./${this.path}`, "utf-8");   
            return JSON.parse(file);
        } catch (error) {
            console.log('No hay productos', error)
            return [];
        }

    }

    async getById(id) {
        try {
            const products = await this.getAll();
            const filteredProduct = await products.slice([id-1], [id])
            console.log(filteredProduct)
            return (filteredProduct);
        } catch (error) {
            console.log('Producto no encontrado', error)
            return [];
        }
    }

    async save(obj) {
        const products = await this.getAll();

        let newId;
        if(products.length === 0) {
            newId = 1;
        } else {
            newId = products[products.length - 1].id + 1;
        }

        const newObj = {...obj, id: newId}
        products.push(newObj)
        console.log(products)

        try {
            await fs.writeFile(`./${this.path}`, JSON.stringify(products, null, 2));
            return newObj;
        } catch (error) {
            throw new Error('Ocurrió un error0')
        }
    }
    
    async update (id, product) {
        const newProduct = {
            id: Number(id),
            ...product
        }
        const getProducts = await this.getAll();
        const index = getProducts.findIndex((prod) => prod.id == id);
        if(index !== -1) {
            getProducts[index] = newProduct;
            await fs.writeFile(`./${this.path}`, JSON.stringify(getProducts, null, 2));
            return {message: `El producto con id ${id} fue actualizado correctamente`, newProduct};
        } else {
            return {error: 'Producto no encontrado'}
        }
    }

    async deleteById(id) {
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
          throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }
    
        objs.splice(index, 1)
        try {
          await fs.writeFile(this.path, JSON.stringify(objs, null, 2))
        } catch (error) {
          throw new Error(`Error al borrar: ${error}`)
        }
      }

    async deleteAll () {
        try {
            await fs.writeFile(`./${this.path}`, JSON.stringify([], null, 2));
        } catch (error) {
            console.log('Ocurrió un error', error)
        }
    }
}

// const newContainer = new Productos(`./products.txt`)
// const products = newContainer.getAll()

//newContainer.save({name: "trial", price: 2000, thumbnail: "http://placekitten.com/g/200/300"})
// console.log(products)
//newContainer.getById(3)

//export default Productos;

module.exports = Productos;