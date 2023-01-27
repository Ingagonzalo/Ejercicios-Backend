import { Router } from "express";
import { productController } from "../controller/productController.js";

const router = Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getProductsById);
router.post('/', productController.saveProducts);
router.put('/:id', productController.updateProductsById);
router.delete('/:id', productController.deleteProductsById);
router.delete('/', productController.deleteAll);

export default router;