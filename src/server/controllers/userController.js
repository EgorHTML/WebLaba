import MongoDB from "../DB/mongo/mongo.js";

export async function getUserData(req, res) {
    const mongoDB = new MongoDB()

    try {
        const id = res.jwt.id
        const user = (await mongoDB.getUser(id))[0]
        user.password = ''
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ data: { user} }))
    } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: error.message }))
    }
}