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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
