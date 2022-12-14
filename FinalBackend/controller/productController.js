import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseProducts = path.join(__dirname, '../database/products.json') // uno todos los datos de mi .json
const admin = true;


const readFile = async (file) => {
    try {
        const data = await fs.promises.readFile(file, 'utf-8', (err, data) => {
            if (err) throw err
            return data;
        })
        return JSON.parse(data); // leo toda mi data traida 
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const getMaxId = async () => {
    try {
        const databaseData = await readFile(databaseProducts); // le envio como parametro mis productos
        const ids = databaseData.map(item => item.id); // tomo la id de mis productos
        if (ids.length === 0) { // si mi 
            return 0;
        }
        return Math.max(...ids);
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const getProductById = async (req, res) => { //Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
    const { id } = req.params;
    try {
        const databaseData = await readFile(databaseProducts) // leo mis productos
        if (!id) { // si no recibo id envio todo 
            res.send(databaseData)
        } else {
            const info = databaseData.find(product => product.id == id) // si  recibo id envio en producto con esa id
            if (info) {
                res.send(info)
            } else {
                res.status(400).json({ error: 'El producto no esta disponible o no existe' }) //revizar mejor esto
            }
        }
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
}


const saveProduct = async (req, res) => {  // Para incorporar productos al listado (disponible para administradores)
    if (admin == true) { // si soy administrador
        const { name, price, img, description, code, stock } = req.body //todos mis variables van a formar parte de mi req.body
        if (!name || !price || !img || !description || !code || !stock) { // PRUEBA CON EL REQ.BODY Como req.bodyla forma de se basa en la entrada controlada por el usuario, todas las propiedades y valores de este objeto no son de confianza y deben validarse antes de confiar
            res.status(400).json({ error: 'Por favor complete con todos los datos' }) // si los valores no estan llenos, error
        }
        else {
            const product = req.body // mi producto va a ser el req.body
            try {
                const databaseData = await readFile(databaseProducts)
                product.id = await getMaxId() + 1
                product.timestamp = Date.now()
                databaseData.push(product)
                await fs.promises.writeFile(databaseProducts, JSON.stringify(databaseData, null, 2), err => {
                    if (err) throw err
                })
                res.status(200).json({ message: 'El producto ha sido añadido!' })
            } catch (error) {
                console.error(`Error: ${error}`)
            }
        }
    } else {
        res.status(400).json({ message: 'Usted necesita permisos de administrador para acceder.' });
    }
}



const updateProductById = async (req, res) => {  //Actualiza un producto por su id (disponible para administradores)
    if (admin == true) {
        const { id } = req.params // tomo el id que me mandan
        const { name, price, image, description, code, stock } = req.body // todos mis variables van a formar parte de mi req.body
        if (!name || !price || !image || !description || !code || !stock) { // nuevamente utiliza este codigo para saber si todo esta correctamente subido
            res.status(400).json({ error: 'Por favor complete con todos los datos' })
        }
        else {
            try {
                const databaseData = await readFile(databaseProducts)
                let wasUpdated = false;
                for (let index = 0; index < databaseData.length; index++) {
                    if (databaseData[index].id == id) {
                        databaseData[index].name = name
                        databaseData[index].price = price
                        databaseData[index].image = image
                        databaseData[index].description = description
                        databaseData[index].code = code
                        databaseData[index].stock = stock
                        databaseData[index].timestamp = Date.now()
                        wasUpdated = true
                        break
                    }
                }
                if (wasUpdated) {
                    await fs.promises.writeFile(databaseProducts, JSON.stringify(databaseData, null, 2), err => {
                        if (err) throw err
                    })
                    res.status(200).json({ message: 'La base de datos del producto ha sido actualizada!' })
                }
                else {
                    res.status(400).json({ error: 'Error al encontrar su producto' })
                }
            } catch (error) {
                console.error(`Error: ${error}`)
            }
        }
    }

    else {
        res.status(400).json({ message: 'Usted necesita permisos de administrador para acceder.' });
    }
}

const deleteProductById = async (req, res) => { //Borra un producto por su id (disponible para administradores)
    if (admin == true) {
        const { id } = req.params
        try {
            const databaseData = await readFile(databaseProducts)
            const index = databaseData.findIndex(product => product.id == id)
            if (index != -1) {
                databaseData.splice(index, 1)
                await fs.promises.writeFile(databaseProducts, JSON.stringify(databaseData, null, 2), err => {
                    if (err) throw err
                })
                res.status(200).json({ message: 'Producto borrado!' })
            } else {
                res.status(400).json({ error: 'Producto no encontrado' })
            }
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
    else {
        res.status(400).json({ message: 'Usted necesita permisos de administrador para acceder.' });
    }

}

export const productController = {
    getProductById, saveProduct, deleteProductById, updateProductById // exporto todas mis funciones 
}