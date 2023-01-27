import fetch from "node-fetch";
import { productsOptions } from "../db/productDB.js";
import productContainer from "../productContainer.js";

const client = new productContainer(productsOptions);

const getProductsById = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await client.getProductById(id);
        if(!id){
            res.send(product)
        }else{
            res.status(400).json({error: 'producto no encontrado'})
        }
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

const getAll = async(req, res) => {
    try {
        const productos = await client.getAllProducts();
        return productos;
    } catch (error) {
        // res.status(400).json({error: error})
        console.error(`error: ${error}`)
    }
}

const saveProducts = async(req, res) => {
    const { title, price, thumbnail } = req.body
    if(!title || !price || !thumbnail){
        res.status(400).json({error: 'Por favor ingrese todos los datos'})
    } else {
        const product = {title, price, thumbnail}
        try {
            await client.saveProduct(product)
            res.status(200).json({message: 'producto agregado!'})
        } catch (error) {
            res.status(400).json({error: error})
        }
    }
}

const updateProductsById = async(req, res) => {
    const {id} = req.params
    const {title, price, thumbnail} = req.body

    if(!title || !price || !thumbnail){
        res.status(400).json({error: 'Por favor ingrese todos los datos'})
    } else {
        const product = {title, price, thumbnail}
        try {
            await client.updateProductById(id, product);
            res.status(200).json({message: 'producto actualizado!'})
        } catch (error) {
            res.status(400).json({error: error})
        }
    }
}

const deleteProductsById = async(req, res) => {
    const {id} = req.params
    try {
        const product = await client.getProductById(id)
        if(product.length != 0){
            await client.deleteProductById(id)
            res.status(200).json({message: 'Producto borrado!'})
        }
    } catch (error) {
        res.status(400).json({error: 'No se encontraron productos con este ID'})
    }
}

const deleteAll = async(req, res) => {
    try {
        await client.deleteAllProducts();
        res.status(200).json({message: 'Todos los productos han sido borrados!'})
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const saveFormProduct = async(data) => {
    try {
        const response = await fetch('http://localhost:8080/api/productos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result;
    } catch (error) {
        let err = new Error(error)
        return err
    }
}

export const productController = {
    getProductsById, getAll, saveProducts, deleteProductsById, updateProductsById, saveFormProduct, deleteAll
}