import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    text: {
        required: true,
        type: String,
        minLength: 1
    },
    fio: {
        type: String,
        required: true,
        minLength: 1
    },
    opinion: {
        type: String,
        required: true,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        minLength: 3
    },
    theme: {
        type: String,
        required: true,
        minLength: 1
    }
})

export const Feedback = mongoose.model('feedback', feedbackSchema)