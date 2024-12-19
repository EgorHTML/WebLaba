import MongoDB from "../DB/mongo/mongo.js";
import { getRequestBody } from "../utils/requestBody.js";

export async function getFeedbacks(req, res) {
    const mongoDB = new MongoDB()

    const feedbacks = await mongoDB.getFeedbacks()

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: 'OK', data: { feedbacks } }))
}

export function addFeedback(req, res) {
    const mongoDB = new MongoDB()

    getRequestBody(req)
        .then(async data => {
            const body = JSON.parse(data)

            const feedbacks = await mongoDB.addFeedback(body)

            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ message: 'OK', data: { feedbacks } }))
        })
}