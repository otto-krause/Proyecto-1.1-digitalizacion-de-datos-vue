import Vue from 'vue'
import Router from 'vue-router'

import Navigation from '@/components/Navigation'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Autoridades from '@/components/Autoridades'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/autoridades',
      name: 'Autoridades',
      component: Autoridades
    },
    {
      path: '/*',
      name: 'Navigation',
      component: Navigation
    },
  ]
})
