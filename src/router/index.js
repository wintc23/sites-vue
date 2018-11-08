import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/layout',
      component: () => import('@/pages/Home'),
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'Index',
          component: () => import('@/pages/Index')
        },
        {
          path: 'post',
          name: 'Post',
          component: () => import('@/pages/ShowPost')
        },
        {
          path: 'postedit',
          name: 'PostEdit',
          component: () => import('@/pages/EditPost')
        },
        {
          path: 'manage',
          name: 'Manage',
          component: () => import('@/pages/Manage')
        }
      ]
    },
  ]
})
