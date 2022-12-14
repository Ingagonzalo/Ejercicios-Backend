import { Router } from "express"; //importamos la funcion Router de express
import { cartController } from '../controller/cartController.js' //importamos el cartController
const cartRoutes = Router(); //inicializamois el router

cartRoutes.post('/', cartController.saveCart);//Crea un carrito y devuelve su id.\
cartRoutes.delete('/:id', cartController.deleteCart); // Vacía un carrito y lo elimina.
cartRoutes.get('/:id/productos', cartController.getProducts); //Me permite listar todos los productos guardados en el carrito
cartRoutes.post('/:id/productos', cartController.saveProductById) // Para incorporar productos al carrito por su id de producto
cartRoutes.delete('/:id/productos/:id_prod', cartController.deleteCartProductById) // Eliminar un producto del carrito por su id de carrito y de producto


export default cartRoutes;