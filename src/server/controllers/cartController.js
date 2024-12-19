import MongoDB from "../DB/mongo/mongo.js";
import { getRequestBody } from "../utils/requestBody.js";

export async function getCart(req, res) {
    const mongoDB = new MongoDB()

    const cart = await mongoDB.getCart(res.jwt.id)

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: 'OK', data: { cart } }))
}

export function setProductCart(req, res) {
    const mongoDB = new MongoDB()

    getRequestBody(req)
        .then(async data => {
            const body = JSON.parse(data)
            if (body.product.amount < 1)
                removeFromCart(req, res)

            const type = body.type
            let cart
            if (type === 'add') {
                cart = await mongoDB.addToCart(res.jwt.id, body.product.id)
            } else if (type === 'set') {
                cart = await mongoDB.setProductCart(res.jwt.id, body.product.id, body.product.amount)
            } else if (type === 'substract') {
                cart = await mongoDB.subtract(res.jwt.id, body.product.id)
            } else {
                res.writeHead(404, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: 'Method undefined'}))
            }

            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: 'OK', data: { cart } }))
        })
}

export function addToCart(req, res) {
    const mongoDB = new MongoDB()

    getRequestBody(req)
        .then(async data => {
            const body = JSON.parse(data)

            const cart = await mongoDB.addToCart(res.jwt.id, body.product.id)

            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: 'OK', data: { cart } }))
        })
}

export function removeFromCart(req, res) {
    const mongoDB = new MongoDB()

    getRequestBody(req)
        .then(async data => {
            const body = JSON.parse(data)
            const cart = await mongoDB.removeFromCart(res.jwt.id, body.product.id)

            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: 'OK', data: { cart } }))
        })
}