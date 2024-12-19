import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
})

export const Cart = mongoose.model('cart', cartSchema)