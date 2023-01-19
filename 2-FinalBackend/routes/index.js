import { Router } from "express";
import { cartRouter } from "./cartRoutes.js";
import { productRouter } from "./productRoutes.js";

const router = Router();

router.use("/cart", cartRoutes);
router.use("/product", productRoutes);

export default router;