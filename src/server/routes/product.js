import Router from './router.js'
import { getProducts, getProduct } from "../controllers/productsController.js"

const router = new Router()

router.addRoute('/api-v2/products', 'GET', getProducts)
router.addRoute('/api-v2/product/', 'GET', getProduct)

export default router