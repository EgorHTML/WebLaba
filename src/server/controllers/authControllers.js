import { User } from "../DB/mongo/models/User.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getRequestBody } from "../utils/requestBody.js";

dotenv.config()

const expiresIn = 3600

function createToken(id) {
    return jwt.sign({ id }, 'secret', {
        expiresIn: expiresIn
    })
}

export function signupPost(req, res) {
    getRequestBody(req)
        .then(async data => {
            try {
                const user = await User.create(JSON.parse(data))
                user.password = ''
                const token = createToken(user._id)
                res.setHeader('Set-Cookie', `jwt=${token};max-age=${expiresIn};httpOnly=true`);
                res.writeHead(201, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    message: 'success', code: 201, data: {
                        user
                    }
                }))
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: error.message }))
            }
        })
        .catch(error => {
            res.writeHead(400, { "Content-Type": "application/json" })
            res.end(JSON.stringify(error.message))
        })
}

export function signIn(req, res) {
    getRequestBody(req)
        .then(async data => {
            const { email, password } = JSON.parse(data)
            try {
                const user = await User.login(email, password)
                user.password = ''
                const token = createToken(user._id)
                res.setHeader('Set-Cookie', `jwt=${token};max-age=${expiresIn};httpOnly=true`);
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    message: 'success', code: 200, data: {
                        user
                    }
                }))
            } catch (error) {
                res.writeHead(401, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    message: error.message, code: 401, data: ''
                }))
            }
        })
        .catch(error => {
            res.writeHead(400, { "Content-Type": "application/json" })
            res.end(JSON.stringify(error.message))
        })
}

export function logout(req, res) {
    res.setHeader('Set-Cookie', `jwt=1;max-age=1;httpOnly=true`);
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({
        message: 'success'
    }))
}