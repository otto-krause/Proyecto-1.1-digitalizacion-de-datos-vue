import Vue from 'vue'
import Router from 'vue-router'

import Navigation from '@/components/Navegacion/Navigation'
import Login from '@/components/Login/Login'
import SignUp from '@/components/Login/SignUp'
import Autoridades from '@/components/Autoridades/Autoridades'
import AgregarAutoridad from '@/components/Autoridades/AgregarAutoridad'
import AutoridadCompleta from '@/components/Autoridades/AutoridadCompleta'
import EditarAutoridad from '@/components/Autoridades/EditarAutoridad'
import HistorialAutoridad from '@/components/Autoridades/HistorialAutoridad'
import Roles from '@/components/Roles/Roles'
import AgregarRol from '@/components/Roles/AgregarRol'
import EditarRol from '@/components/Roles/EditarRol'
import Alumnos from '@/components/Alumnos/Alumnos'
import AgregarAlumno from '@/components/Alumnos/AgregarAlumno'
import AlumnoCompleto from '@/components/Alumnos/AlumnoCompleto'
import EditarAlumno from '@/components/Alumnos/EditarAlumno'
import AgregarContactoAlumno from '@/components/Alumnos/AgregarContactoAlumno'
import EditarContactoAlumno from '@/components/Alumnos/EditarContactoAlumno'
import HistorialAlumno from '@/components/Alumnos/HistorialAlumno'
import HistorialAlumnoDivision from '@/components/Alumnos/HistorialAlumnoDivision'
import Divisiones from '@/components/Division/Divisiones'
import AgregarDivision from '@/components/Division/AgregarDivision'
import DivisionCompleta from '@/components/Division/DivisionCompleta'
import EditarDivision from '@/components/Division/EditarDivision'
import PlanEstudios from '@/components/PlanEstudios/PlanEstudios'
import AgregarPlanEstudios from '@/components/PlanEstudios/AgregarPlanEstudios'
import PlanEstudioCompleto from '@/components/PlanEstudios/PlanEstudioCompleto'
import EditarPlanEstudio from '@/components/PlanEstudios/EditarPlanEstudio'
import Materias from '@/components/Materia/Materias'
import MateriaCompleta from '@/components/Materia/MateriaCompleta'
import EditarMateria from '@/components/Materia/EditarMateria'
import AgregarMateria from '@/components/Materia/AgregarMateria'
import ActasPrevia from '@/components/ActasPrevia/ActasPrevia'
import AgregarActaPrevia from '@/components/ActasPrevia/AgregarActaPrevia'
import ActaPreviaCompleta from '@/components/ActasPrevia/ActaPreviaCompleta'
import Cursada from '@/components/Cursada/Cursada'
import AgregarCursada from '@/components/Cursada/AgregarCursada'
import CursadaCompleta from '@/components/Cursada/CursadaCompleta'
import EditarCursada from '@/components/Cursada/EditarCursada'

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
      path: '/HistorialAutoridad',
      name: 'HistorialAutoridad',
      component: HistorialAutoridad,
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
      path: '/AgregarContactoAlumno',
      name: 'AgregarContactoAlumno',
      component: AgregarContactoAlumno,
      props: true
    },
    {
      path: '/EditarContactoAlumno',
      name: 'EditarContactoAlumno',
      component: EditarContactoAlumno,
      props: true
    },
    {
      path: '/HistorialAlumno',
      name: 'HistorialAlumno',
      component: HistorialAlumno,
      props:true
    },
    {
      path: '/HistorialAlumnoDivision',
      name: 'HistorialAlumnoDivision',
      component: HistorialAlumnoDivision,
      props: true
    },
    {
      path: '/Divisiones',
      name: 'Divisiones',
      component: Divisiones,
      props: true
    },
    {
      path: '/AgregarDivision',
      name: 'AgregarDivision',
      component: AgregarDivision,
    },
    {
      path: '/DivisionCompleta',
      name: 'DivisionCompleta',
      component: DivisionCompleta,
      props: true
    },
    {
      path: '/EditarDivision',
      name: 'EditarDivision',
      component: EditarDivision,
      props: true
    },
    {
      path: '/PlanEstudios',
      name: 'PlanEstudios',
      component: PlanEstudios
    },
    {
      path: '/AgregarPlanEstudios',
      name: 'AgregarPlanEstudios',
      component: AgregarPlanEstudios
    },
    {
      path: '/PlanEstudioCompleto',
      name: 'PlanEstudioCompleto',
      component: PlanEstudioCompleto,
      props:true
    },
    {
      path: '/EditarPlanEstudio',
      name: 'EditarPlanEstudio',
      component: EditarPlanEstudio,
      props:true
    },
    {
      path: '/Materias',
      name: 'Materias',
      component: Materias,
      props:true
    },
    {
      path: '/MateriaCompleta',
      name: 'MateriaCompleta',
      component: MateriaCompleta,
      props:true
    },
    {
      path: '/EditarMateria',
      name: 'EditarMateria',
      component: EditarMateria,
      props:true
    },
    {
      path: '/AgregarMateria',
      name: 'AgregarMateria',
      component: AgregarMateria
    },
    {
      path: '/ActasPrevia',
      name: 'ActasPrevia',
      component: ActasPrevia
    },
    {
      path: '/AgregarActaPrevia',
      name: 'AgregarActaPrevia',
      component: AgregarActaPrevia
    },
    {
      path: '/ActaPreviaCompleta',
      name: 'ActaPreviaCompleta',
      component: ActaPreviaCompleta
    },
    {
      path: '/Cursada',
      name: 'Cursada',
      component: Cursada,
      props:true
    },
    {
      path: '/AgregarCursada',
      name: 'AgregarCursada',
      component: AgregarCursada
    },
    {
      path: '/CursadaCompleta',
      name: 'CursadaCompleta',
      component: CursadaCompleta,
      props:true
    },
    {
      path: '/EditarCursada',
      name: 'EditarCursada',
      component: EditarCursada,
      props:true
    },
    {
      path: '/*',
      name: 'Navigation',
      component: Navigation
    },
  ]
})
