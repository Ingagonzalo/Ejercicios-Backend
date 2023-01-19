import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    timestamp: { type: Schema.Types.Number, required: true },
    products: { type: Schema.Types.Array, required: true }
});

export const carts = model("cart", cartSchema);