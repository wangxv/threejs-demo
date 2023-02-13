import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/box.vue')
    },
    {
      path: '/sphere',
      name: 'sphere',
      component: () => import('../views/sphere.vue')
    }
  ]
})

export default router
