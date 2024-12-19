import Router from "./router.js"
import { getSlides } from "../controllers/slidesController.js"

const router = new Router()

router.addRoute('/api-v2/slides', 'GET', getSlides)

export default router