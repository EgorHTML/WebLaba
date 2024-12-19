import Router from './router.js'
import { getFeedbacks, addFeedback } from '../controllers/feedbackController.js'

const router = new Router()

router.addRoute('/api-v2/feedbacks', 'GET', getFeedbacks)
router.addRoute('/api-v2/feedback', 'POST', addFeedback)


export default router