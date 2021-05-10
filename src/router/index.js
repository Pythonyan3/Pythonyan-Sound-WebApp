import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Main',
        component: () => import('../components/home/Main.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../components/home/About.vue')
      },
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../components/profile/Login.vue')
      },
      {
        path: 'signup',
        name: 'Signup',
        component: () => import('../components/profile/Signup.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
