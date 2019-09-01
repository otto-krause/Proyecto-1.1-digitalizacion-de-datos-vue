import Vue from 'vue'
import Router from 'vue-router'

import Navigation from '@/components/Navigation'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Autoridades from '@/components/Autoridades'
import AgregarAutoridad from '@/components/AgregarAutoridad'
import AutoridadCompleta from '@/components/AutoridadCompleta'
import EditarAutoridad from '@/components/EditarAutoridad'
import Roles from '@/components/Roles'
import AgregarRol from '@/components/AgregarRol'
import EditarRol from '@/components/EditarRol'

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
      path: '/Autoridades',
      name: 'Autoridades',
      component: Autoridades,
      props: true
    },
    {
      path: '/Autoridad',
      name: 'AutoridadCompleta',
      component: AutoridadCompleta,
      props: true
    },
    {
      path: '/agregarAutoridad',
      name: 'AgregarAutoridad',
      component: AgregarAutoridad,
      props: true
    },
    {
      path: '/EditarAutoridad',
      name: 'EditarAutoridad',
      component: EditarAutoridad,
      props: true
    },
    {
      path: '/Roles',
      name: 'Roles',
      component: Roles,
      props: true
    },
    {
      path: '/AgregarRol',
      name: 'AgregarRol',
      component: AgregarRol,
    },
    {
      path: '/EditarRol',
      name: 'EditarRol',
      component: EditarRol,
      props: true
    },
    {
      path: '/*',
      name: 'Navigation',
      component: Navigation
    },
  ]
})
