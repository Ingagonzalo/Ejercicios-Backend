import { Router } from "express";
import { productController } from '../controller/productController.js'
const productRoutes = Router(); //inicializamois el router

productRoutes.get('/:id?', productController.getProductById);  //Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
productRoutes.post('/', productController.saveProduct); // Para incorporar productos al listado (disponible para administradores)
productRoutes.put('/:id', productController.updateProductById); //Actualiza un producto por su id (disponible para administradores)
productRoutes.delete('/:id', productController.deleteProductById); //Borra un producto por su id (disponible para administradores)

export default productRoutes;