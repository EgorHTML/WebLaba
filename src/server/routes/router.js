import url from 'url'
class Router {
    static #instance

    #routes = []

    #middleWare

    constructor(routers) {
        if (Router.#instance != null) return Router.#instance;
        Router.#instance = this;

        routers?.forEach(router => {
            Router.getInstance().#routes.push(router.#routes)
        })
    }

    async handleRequest(req, res) {
        const f = await this.#middleWare.handleRequest(req, res)
        if (f !== false) {
            const route = this.getRoute(req)
            this.init(route.cb, req, res)
        }
    }

    static getInstance() {
        return this.#instance
    }

    setMiddleWare(middleWare) {
        this.#middleWare = middleWare
    }

    getRoute(req) {
        const parsedUrl = url.parse(req.url, true);
        
        const route = this.#routes.find(route => req.url.includes(route.path) && route.method === req.method)
        return route
    }

    addRoute(path, method, cb) {
        this.#routes.push({
            path, method, cb
        })
    }

    init(cb, req, res) {
        cb(req, res)
    }
}

export default Router
