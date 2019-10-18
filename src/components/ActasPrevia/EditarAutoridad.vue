<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name: 'AutoridadCompleta', params:{autoridad,roles:rolesReenviar}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar autoridad</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewAutoridad(rolesReenviar)">
              <div class="form-group">
                <div class="form-group">
                  <label class="input-group-text text-center">Alumno</label>
                  <div>
                      <multiselect v-model="alumnoSeleccionado" :options="alumnos" placeholder="Lista de alumnos" :custom-label="LabelAlumno" track-by="dniAlumno" :searchable="true" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-group">
                  <label class="input-group-text text-center">Profesor</label>
                  <div>
                      <multiselect v-model="profesorSeleccionado" :options="profesores" placeholder="Lista de profesores" :custom-label="LabelProfesor" track-by="dniAutoridad" :searchable="true" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-group">
                  <label class="input-group-text text-center">Materias</label>
                  <div>
                      <multiselect v-model="materiaSeleccionada" :options="materias" placeholder="Lista de materias" :custom-label="LabelMateria" track-by="idMateria" :searchable="true" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                      <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar al menos una materia</label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="input-group-text text-center">Turno</label>
                <div>
                  <multiselect v-model="turnoSeleccionado" placeholder="Lista de Turnos" label="name" track-by="value" :searchable="false" :options="turnos" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                  <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar el turno</label>
                </div>
              </div>
              <div class="form-group">
                <label class="input-group-text text-center">Situaciones</label>
                <div>
                    <multiselect v-model="situacionSeleccionada" placeholder="Lista de Situaciones" label="situacion" track-by="value" :searchable="false" :options="situaciones" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                    <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar al menos una situación</label>
                </div>
              </div>
              <div class="form-group">
                  <button class="btn btn-danger btn-block" type="submit" >Crear nuevo Acta Previa</button>
              </div>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit" >Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";

import Multiselect from 'vue-multiselect'
import axios from "axios";

export default {
  name: "EditarActaPrevia",
  props: ["actaPrevia"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      idActa: '',
      situacion: '',
      turnoSeleccionado:'',
      turnos:[{ name: 'Mañana', value: 0 },{ name: 'Tarde', value: 1 }],
      materiaSeleccionada: '',
      materias: [],
      profesores:[],
      profesorSeleccionado:'',
      alumnos:[],
      alumnoSeleccionado:'',
      situacionSeleccionada: '',
      situaciones: [
        {situacion: 'Diciembre', value: 0},
        {situacion: 'Marzo', value: 1},
        {situacion: 'Previa', value: 2}
      ]
    };
  },
  created(){
    this.GetMaterias();
    this.GetAlumnos();
    this.GetProfesores();
  },
  mounted() {
    if(!this.autoridad){
      this.$router.push({ name: 'Autoridades'})
    }
  },
  methods: {
    LabelMateria({resolucion,titulo,cantHoras}){
      return titulo + ` - Resolución: ` + resolucion + ` - ` + ' Horas Cátedra: ' + cantHoras;
    },
    LabelAlumno({dniAlumno,nombre,apellido}){
      return dniAlumno + ` - ` + nombre + ', ' + apellido;
    },
    LabelProfesor({dniAutoridad,nombre,apellido}){
      return dniAutoridad + ` - ` + nombre + ', ' + apellido;
    },
    GetMaterias(){
      axios.get("/api/materia/planmateria").then(result => {
        this.materias = result.data;
      })
    },
    GetAlumnos(){
      axios.get("/api/alumno").then(result => {
        this.alumnos = result.data;
      });
    },
    GetProfesores(){
      axios.get("/api/autoridad/profesores").then(result => {
        this.profesores = result.data;
      });
    },
    validar () {
      if (!this.situacionSeleccionada && !this.materiaSeleccionada){
        this.isInvalid = true
        return false
      }else
        return true
    },
    PostNewActaPrevia() {
      axios.post("/api/acta_previa/add", {
          dniAlumno: this.alumnoSeleccionado.dniAlumno,
          dniAutoridad: this.profesorSeleccionado.dniAutoridad,
          idMateria: this.materiaSeleccionada.idMateria,
          situacion: this.situacionSeleccionada.situacion,
          turno: this.turnoSeleccionado.value
        })
        .then(async(res)=>{
          await axios.get("/api/autoridad/" + this.dniAutoridad)
          .then(result =>{
            this.autoridadesReenviar = result.data[0]
            this.$router.push({ name: 'ActaPreviaCompleta', params: {title:"Acta previa modificada",timer: 6,type:"success",message:"El acta previa se modifico correctamente",actaPrevia:this.actaPrevia}})
          })
        })
        .catch(err=>{this.$router.push({ name: 'ActaPreviaCompleta', params: {title:"Error",timer: 7,type:"danger",message:"El acta previa no pudo ser modificada",actaPrevia}})})
    },
    makeToast(title,timer,variant = null,message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
        toaster: "b-toaster-top-left",
        autoHideDelay:timer * 1000,
        appendToast: true
      })
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.container {
  padding: 0 !important;
}
[class*="container-fluid"] {
  padding: 0 !important;
}
</style>
