import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Management from '../views/Management.vue'
import WebPlayer from '../views/WebPlayer.vue'

const routes = [
  {
    path: '',
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
        path: "",
        name: "Management",
        component: Management,
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
          {
            path: 'email-verification/:verify_token',
            name: 'EmailVerification',
            component: () => import('../components/profile/EmailVerification.vue')
          },
        ]
      },
    ]
  },
  {
    path: "/webplayer",
    component: WebPlayer,
    children: [
      {
        path: "",
        name: "WebPlayer",
        component: () => import('../components/web_player/Main.vue')
      },
      {
        path: "search",
        name: "WebPlayerSearch",
        component: () => import('../components/web_player/Search.vue')
      },
      {
        path: "profile/:id",
        name: "WebPlayerProfile",
        component: () => import('../components/web_player/Profile.vue')
      },
      {
        path: "playlist/:id",
        name: "WebPlayerPlaylist",
        component: () => import('../components/web_player/Playlist.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
