import Vue from 'vue'
import Router from 'vue-router'

import Navigation from '@/components/Navigation'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Autoridades from '@/components/Autoridades'
import AgregarAutoridad from '@/components/AgregarAutoridad'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Navigation
    },
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
      path: '/agregarAutoridad',
      name: 'AgregarAutoridad',
      component: AgregarAutoridad
    },
    {
      path: '/*',
      name: 'Navigation',
      component: Navigation
    },
  ]
})
