import { Router } from "express";
import { cartController } from "../controller/cartController";

const router = Router();

router.route("/").get(cartController.getAllCarts).post(cartController.createCart);
router.route(":id").put(cartController.updateCart).delete(cartController.deleteCart);

export const cartRouter = router;