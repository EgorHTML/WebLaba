import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        unique: false,
        type: String,
        required: false
    },
    short: {
        type: String,
        required: false
    },
    description: {
        unique: false,
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    price: {
        unique: false,
        type: Number,
        required: false
    },
})

export const Product = mongoose.model('products', productSchema)