import Router from './router.js'
import { signupPost, signIn, logout } from "../controllers/authControllers.js"

const router = new Router()

router.addRoute('/signup', 'POST', signupPost)
router.addRoute('/signin', 'POST', signIn)
router.addRoute('/logout', 'POST', logout)

export default router