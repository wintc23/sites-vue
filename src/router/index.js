import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/pages/Home'),
      children: [
        {
          path: '',
          name: 'Index',
          component: () => import('@/pages/Index')
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/pages/Login')
        },
        {
          path: '/register',
          name: 'Register',
          component: () => import('@/pages/Register')
        }
      ]
    },
  ]
})
