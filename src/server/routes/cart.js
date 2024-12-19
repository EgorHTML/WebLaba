import Router from './router.js'
import { getCart, setProductCart, removeFromCart } from '../controllers/cartController.js'


const router = new Router()

router.addRoute('/api/cart', 'GET', getCart)
router.addRoute('/api/cart', 'POST', setProductCart)
router.addRoute('/api/cart', 'DELETE', removeFromCart)


export default router