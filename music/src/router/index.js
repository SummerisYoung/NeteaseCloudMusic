import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: () => import('views/home/index.vue')
  },
  {
    path: '/search',
    component: () => import('views/search/index.vue')
  },
  {
    path: '/playlist',
    component: () => import('views/playlist/Index.vue')
  },
  {
    path: '/album',
    component: () => import('views/album/Index.vue')
  },
  {
    path: '/user',
    component: () => import('views/user/Index.vue')
  },
  {
    path: '/artist',
    component: () => import('views/artist/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
