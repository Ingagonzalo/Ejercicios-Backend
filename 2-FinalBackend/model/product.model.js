import mongoose, { Schema } from "mongoose";

const productsCollection = 'products';

const ProductSchema = new Schema({
    id: { type: Schema.Types.Number },
    title: { type: Schema.Types.String },
    cost: { type: Schema.Types.Number },
    thumbnail: { type: Schema.Types.String },
   
})

export const products = mongoose.model(productsCollection, ProductSchema);