import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/shelving',
    name: 'About',
    component: () => import('../views/Shelving.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
