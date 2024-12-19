import MongoDB from "../DB/mongo/mongo.js";
import url from 'url'

export async function getProducts(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;
    const section = queryParams.section
    let products
    const mongoDB = new MongoDB()
    if (queryParams.search && queryParams.search.trim() !== '') {
        products = (await mongoDB.getProducts(queryParams.search, section))
    } else {
        products = (await mongoDB.getProducts('',section))
    }

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: 'OK', data: { products } }))
}

export async function getProduct(req, res) {
    const mongoDB = new MongoDB()
    const terms = req.url.split('/')
    const id = terms[terms.length - 1]
    const product = (await mongoDB.getProduct(id))

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: 'OK', data: { product } }))
}