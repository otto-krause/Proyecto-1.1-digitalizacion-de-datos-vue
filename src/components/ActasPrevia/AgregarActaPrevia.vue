<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link to="/ActasPrevia" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Nueva Acta Previa</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewAlumno">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">ID Acta Previa</label>
                </div>
                <input
                  type="text"
                  name="id acta previa"
                  class="form-control"
                  placeholder="ID Acta Previa"
                  v-model="idActaPrevia"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el id de acta previa)"
                  oninput="setCustomValidity('')"
                />
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
                  <multiselect v-model="turnoSeleccionado" placeholder="Lista de Turnos" label="name" track-by="value" :searchable="true" :options="turnos" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                  <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar el turno</label>
                </div>
              </div>
              <div class="form-group">
                <label class="input-group-text text-center">Situaciones</label>
                <div>
                    <multiselect v-model="situacionSeleccionado" placeholder="Lista de Situaciones" label="situacion" track-by="value" :options="situaciones" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                    <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar al menos una situación</label>
                </div>
              </div>
              <div class="form-group">
                  <button class="btn btn-danger btn-block" type="submit" >Crear nuevo Acta Previa</button>
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
  name: "AgregarActaPrevia",
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      idActa: '',
      idMateria: '',
      situacion: '',
      fechaCierre: '',
      turnoSeleccionado:'',
      turnos:[{ name: 'Mañana', value: 0 },{ name: 'Tarde', value: 1 }],
      materiaSeleccionado: '',
      materias: [],
      situacionSeleccionado: '',
      situaciones: [
        {situacion: 'Mi mamá no me quiere pagar la cuota', value: 0}, 
        {situacion: 'Se me murió el perro', value: 1},
        {situacion: 'No sé que es un acta previa, por lo tanto, no sé que poner', value: 2}
      ]
    };
  },
  created(){
    this.GetMaterias();
  },
  methods: {
    LabelMateria({resolucion,titulo,cantHoras}){
      return titulo + ` - Resolución: ` + resolucion + ` - ` + ' Horas Cátedra: ' + cantHoras;
    },
    GetMaterias(){
      axios.get("/api/materia/planmateria").then(result => {
        this.materias = result.data;
      })
    },
    validar () {
      if (!this.situacionSeleccionado && !this.materiaSeleccionado){
        this.isInvalid = true
        return false
      }else
        return true
    },
    async PostNewAutoridad() {
      if(this.validar()){
      await axios.post("/api/acta_previa/add", {
          idActa: this.idActa,
          idMateria: this.idMateria,
          situacion: this.situacion,
          fechaCierre: this.fechaCierre,
          turno: this.turno
        })
        .then(res=>{this.$router.push({ name: 'ActaPrevia', params: {title:"Acta Previa creada",timer: 4,type:"success",message:"El Acta Previa se ha creado correctamente"}})})
        .catch(err=>{
          if(err.message.includes('409')){
            this.makeToast('Acta Previa existente',6,'warning',"(ID Acta Existente) - El Acta Previa ya existe. Debe darla de baja para registrarla nuevamente");
          }else
            this.makeToast('Error',6,'danger',"El Acta Previa no ha podido ser creada. Posiblemente haya un problema con los datos ingresados");
          })
      }
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
<style scoped>
</style>
