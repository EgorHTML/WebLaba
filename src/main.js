import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

//чек бокс на регу для политике конфы и отзывы только зареганные и повторитель пороля
