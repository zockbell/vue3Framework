import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: () => import('../views/dynamic/Dynamic.vue')
    },
    {
      path: '/dom2svg',
      name: 'dom2Svg',
      component: () => import('../views/dom2Svg/Dom2Svg.vue')
    },
    {
      path: '/html2canvas',
      name: 'html2canvas',
      component: () => import('../views/html2canvas/index.vue')
    },
    {
      path: '/mitt',
      name: 'mitt',
      component: () => import('../views/mitt/mitt.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/video/video.vue')
    },
    {
      path: '/videom3u8',
      name: 'videoM3u8',
      component: () => import('../views/video/videoM3u8.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/cart/cart.vue')
    },
    {
      path: '/news/:id',
      name: 'news',
      /* 路由独享守卫*/
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('userId')) next() // 登录状态
        else next('/about') // 未登录状态
      },
      component: () => import('../views/news/News.vue')
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('../views/notFound/NotFound.vue')
    },
    // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
    /*
    {
      path: '/user-:afterUser(.*)',
      component: UserGeneric
    },
    */
  ]
})

export default router
