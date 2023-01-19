import { Router } from "express";
import { productController } from "../controllers/productController.js";

const router = Router();

router.route("/").get(productController.getAllProducts).post(productController.createProduct);
router.route(":id").put(productController.updateProduct).delete(productController.deleteProduct);

export const productRouter = router;