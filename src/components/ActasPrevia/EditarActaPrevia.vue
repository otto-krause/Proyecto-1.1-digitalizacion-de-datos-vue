<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name: 'ActaPreviaCompleta', params:{actaPrevia}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar autoridad</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewActaPrevia(actaPrevia)">
              <div class="form-group">
                <div class="form-group">
                  <label class="input-group-text text-center">Alumno</label>
                  <div>
                    <input
                      disabled
                      type="text"
                      name="alumnoSeleccionado"
                      class="form-control"
                      v-model="alumnoSeleccionado"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-group">
                  <label class="input-group-text text-center">Profesor</label>
                  <div>
                    <input
                      disabled
                      type="text"
                      name="profesorSeleccionado"
                      class="form-control"
                      v-model="profesorSeleccionado"
                    />
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
                  <multiselect v-model="turnoSeleccionado" placeholder="Lista de Turnos" :searchable="false" :options="turnos" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                  <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar el turno</label>
                </div>
              </div>
              <div class="form-group">
                <label class="input-group-text text-center">Situaciones</label>
                <div>
                    <multiselect v-model="situacionSeleccionada" placeholder="Lista de Situaciones" :searchable="false" :options="situaciones" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                    <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar al menos una situación</label>
                </div>
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
      idActa: this.actaPrevia.idActa,
      turnoSeleccionado:this.actaPrevia.turno,
      turnos:['Mañana','Tarde'],
      materiaSeleccionada: '',
      materias: [],
      profesorSeleccionado:'',
      alumnoSeleccionado:'',
      situacionSeleccionada: this.actaPrevia.situacion,
      situaciones: ['Diciembre','Marzo','Previa'],
      isInvalid: false
    };
  },
  mounted() {
    if(!this.actaPrevia){
      this.$router.push({ name: 'ActasPrevia'})
    }
    this.GetMaterias();
    this.SetAlumnoProp();
    this.SetProfesorProp();
  },
  methods: {
    LabelMateria({resolucion,titulo,cantHoras}){
      return titulo + ` - Resolución: ` + resolucion + ` - ` + ' Horas Cátedra: ' + cantHoras;
    },
    LabelAlumno(dniAlumno,nombre,apellido){
      return dniAlumno + ` - ` + nombre + ', ' + apellido;
    },
    LabelProfesor(dniAutoridad,nombre,apellido){
      return dniAutoridad + ` - ` + nombre + ', ' + apellido;
    },
    SetAlumnoProp(){
      this.alumnoSeleccionado = this.LabelAlumno(this.actaPrevia.dniAlumno,this.actaPrevia.NombreAlumno,this.actaPrevia.ApellidoAlumno)
    },
    SetProfesorProp(){
      this.profesorSeleccionado = this.LabelProfesor(this.actaPrevia.dniAutoridad,this.actaPrevia.NombreAutoridad,this.actaPrevia.ApellidoAutoridad)
    },
    SetMateriaProp(){
      this.materiaSeleccionada = this.materias.filter(materia =>{ return (materia.idMateria == this.actaPrevia.idMateria)})
    },
    GetMaterias(){
      axios.get("/api/materia/planmateria").then(result => {
        this.materias = result.data;
      })
    },
    validar () {
      if (this.cargos.length === 0){
        this.isInvalid = true
        return false
      }else
        return true
    },
    PostNewActaPrevia(actaPrevia) {
      axios.post("/api/acta_previa/update", {
          idActa: this.idActa,
          idMateria: this.materiaSeleccionada[0].idMateria,
          situacion: this.situacionSeleccionada,
          turno: this.turnoSeleccionado
        })
        .then(async(res)=>{
          await axios.get("/api/acta_previa/" + this.idActa)
          .then(result =>{
            this.$router.push({ name: 'ActaPreviaCompleta', params: {title:"Acta previa modificada",timer: 6,type:"success",message:"El acta previa se modifico correctamente",actaPrevia: result.data[0]}})
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
  },
  watch:{
    materias: function(){
      this.SetMateriaProp();
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
