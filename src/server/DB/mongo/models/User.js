import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { cartSchema } from "./Cart.js";

const userSchema = new mongoose.Schema({
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    tel: {
        unique: false,
        type: String,
        required: false
    },
    fio: {
        type: String,
        minLength: 3,
        required: true
    },
    cart: [cartSchema]
})

userSchema.statics.login = async function (email, password) {
    let auth = false
    const user = await this.findOne({ email })

    if (user) {
        const booleanResult = await bcrypt.compare(password, user.password);
        auth = booleanResult
    }
    else
        throw new Error('Неверный логин.')

    if (!auth) throw new Error('Неверный пароль.')

    return user
}

userSchema.pre('save', async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)

        next()
    } else {
        next()
    }
})

export const User = mongoose.model('user', userSchema)