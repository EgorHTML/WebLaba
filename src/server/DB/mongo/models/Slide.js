import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
    img: {
        unique: false,
        type: String,
        required: true
    },
    alt: {
        unique: false,
        type: String,
        required: true
    }
})

export const Slide = mongoose.model('slide', slideSchema)