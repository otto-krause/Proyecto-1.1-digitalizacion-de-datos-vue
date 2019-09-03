import Vue from 'vue'
import Router from 'vue-router'

import Navigation from '@/components/Navegacion/Navigation'
import Login from '@/components/Login/Login'
import SignUp from '@/components/Login/SignUp'
import Autoridades from '@/components/Autoridades/Autoridades'
import AgregarAutoridad from '@/components/Autoridades/AgregarAutoridad'
import AutoridadCompleta from '@/components/Autoridades/AutoridadCompleta'
import EditarAutoridad from '@/components/Autoridades/EditarAutoridad'
import Roles from '@/components/Roles/Roles'
import AgregarRol from '@/components/Roles/AgregarRol'
import EditarRol from '@/components/Roles/EditarRol'
import Alumnos from '@/components/Alumnos/Alumnos'
import AgregarAlumno from '@/components/Alumnos/AgregarAlumno'
import AlumnoCompleto from '@/components/Alumnos/AlumnoCompleto'
import EditarAlumno from '@/components/Alumnos/EditarAlumno'

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
      path: '/Alumnos',
      name: 'Alumnos',
      component: Alumnos,
      props: true
    },
    {
      path: '/AgregarAlumno',
      name: 'AgregarAlumno',
      component: AgregarAlumno,
    },
    {
      path: '/AlumnoCompleto',
      name: 'AlumnoCompleto',
      component: AlumnoCompleto,
      props: true
    },
    {
      path: '/EditarAlumno',
      name: 'EditarAlumno',
      component: EditarAlumno,
      props: true
    },
    {
      path: '/*',
      name: 'Navigation',
      component: Navigation
    },
  ]
})
