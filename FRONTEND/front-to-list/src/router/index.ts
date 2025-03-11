import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { Task } from '@/types/Task'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/Task/ListTasks.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Category/ListCategories.vue')
    },
  ],
})

export default router
