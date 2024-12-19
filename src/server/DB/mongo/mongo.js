import DataBase from "../dataBase.js"
import { User } from "./models/User.js"
import { Product } from "./models/Product.js"
import { Slide } from "./models/Slide.js"
import { Cart } from "./models/Cart.js"
import { Feedback } from "./models/Feedback.js"

export default class MongoDB extends DataBase {
    models = [User, Product, Slide, Cart, Feedback]

    constructor() {
        super()
    }

    async getFeedbacks() {
        const model = this.models.find(model => model.modelName === 'feedback')

        if (!model) throw new Error('MongoDB does not have a feedback model')

        return model.find()
    }

    async addFeedback(feedback) {
        const model = this.models.find(model => model.modelName === 'feedback')

        if (!model) throw new Error('MongoDB does not have a feedback model')

        await model.create(feedback)

        return model.find()
    }

    async getCart(userId) {
        const User = this.models.find(model => model.modelName === 'user')
        const user = await User.findById(userId).populate('cart.productId');
        return user.cart;
    };

    async removeFromCart(userId, productId) {
        const User = this.models.find(model => model.modelName === 'user')

        const user = await User.findById(userId);

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);

        await user.save();
        const userWitchCart = await user.populate('cart.productId')
        return userWitchCart.cart
    };

    async setProductCart(userId, productId, quantity) {
        const User = this.models.find(model => model.modelName === 'user')

        const user = await User.findById(userId);
        const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (user.cart[itemIndex]?.quantity < 1 || quantity == 0) {
            return this.removeFromCart(userId, productId)
        }

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity = quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();

        const userWitchCart = await user.populate('cart.productId')

        return userWitchCart.cart
    }

    async addToCart(userId, productId) {
        const User = this.models.find(model => model.modelName === 'user')

        const user = await User.findById(userId);
        const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += 1;
        } else {
            user.cart.push({ productId, quantity: 1 });
        }

        await user.save();

        const userWitchCart = await user.populate('cart.productId')

        return userWitchCart.cart
    }

    async subtract(userId, productId) {
        const User = this.models.find(model => model.modelName === 'user')

        const user = await User.findById(userId);
        const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (user.cart[itemIndex]?.quantity < 2) {
            return this.removeFromCart(userId, productId)
        }

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity -= 1;
        }

        await user.save();
        const userWitchCart = await user.populate('cart.productId')
        return userWitchCart.cart
    }

    getUser(_id) {
        const model = this.models.find(model => model.modelName === 'user')

        if (!model) throw new Error('MongoDB does not have a user model')

        return model.find({ _id })
    }

    getProducts(search, section) {
        const model = this.models.find(model => model.modelName === 'products');

        if (!search && !section) return model.find();

        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { short: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        };

        if (section) {
            query.type = section;
        }

        return model.find(query);
    }

    getProduct(id) {
        const model = this.models.find(model => model.modelName === 'products')

        if (!model) throw new Error('MongoDB does not have a products model')

        return model.find({ _id: id })
    }

    async getSlides() {
        const model = this.models.find(model => model.modelName === 'slide')

        if (!model) throw new Error('MongoDB does not have a slide model')

        return model.find()
    }
}