import MongoDB from "../DB/mongo/mongo.js";

export async function getSlides(req, res) {
    const mongoDB = new MongoDB()
    
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: 'OK', data: await mongoDB.getSlides() }))
}

