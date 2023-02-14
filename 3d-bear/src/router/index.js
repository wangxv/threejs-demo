import { createRouter, createWebHistory } from 'vue-router'
import Bear from '../views/Bear.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Bear
    }
  ]
})

export default router
