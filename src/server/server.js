import http from 'node:http';
import path from 'node:path'
import * as fs from 'node:fs';

import Router from './routes/router.js'
import authRoutes from './routes/authRoutes.js'
import cookieRoutes from './routes/cookieRoutes.js'
import userRoutes from './routes/userAPI.js'
import product from './routes/product.js'
import slides from './routes/slides.js'
import cart from './routes/cart.js'
import feedback from './routes/feedback.js'

import MiddleWare from './middleware/middleware.js';
import authMiddleWare from './middleware/authMiddleWare.js'

import MongoDB from './DB/mongo/mongo.js'
import mongoose from 'mongoose'

const __dirname = path.resolve();

const middleWare = new MiddleWare([authMiddleWare])

const router = new Router([authRoutes, cookieRoutes, userRoutes, product, slides, cart, feedback])
router.setMiddleWare(middleWare)

const mongoDB = new MongoDB()

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const server = http.createServer((req, res) => {
    handleRequest(req, res)
});

function handleRequest(request, response) {
    console.log(`Запрошенный адрес: ${request.url}`);

    const filePath = path.join(__dirname, '/dist', (request.url === '/' ? '/index.html' : request.url));

    if (fs.existsSync(filePath))
        postStaticFilesToClient(filePath, response)
    else if (router.getRoute(request))
        router.handleRequest(request, response)
    else
        postStaticFilesToClient(__dirname + '/dist/index.html', response)
}

function postStaticFilesToClient(url, res) {
    let file = path.join(url)
    let type = getContentType(url)
    
    fs.readFile(file, (err, data) => {
        res.writeHead(200, { "Content-Type": type })
        
        res.end(data)
    })
}


function getContentType(url) {
    switch (path.extname(url)) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        case ".pdf": 
            return "application/pdf";
        default:
            return "application/octet-stream";
    }
}

server.listen(3000, () => {
    main().catch(err => console.log(err));
})