import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import Profile from '@/views/Profile.vue'
import Contacts from '@/views/Contacts.vue'
import Feedback from '@/views/Feedback.vue'
import Catalog from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'
import About from '@/views/About.vue'
import Cart from '@/views/Cart.vue'
import Rights from '@/views/Rights.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/rights',
      name: 'rights',
      component: Rights,
    },
  ],
})

export default router
