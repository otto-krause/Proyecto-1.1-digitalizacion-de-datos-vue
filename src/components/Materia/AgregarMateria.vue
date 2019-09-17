<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link to="/Materias" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Nueva materia</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewMateria">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Titulo</label>
                </div>
                <input
                  type="text"
                  name="titulo"
                  class="form-control"
                  placeholder="titulo"
                  v-model="titulo"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el titulo de la materia')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Horas catedra</label>
                </div>
                <input
                  type="number"
                  name="cantHoras"
                  class="form-control"
                  placeholder="Horas Catedra"
                  v-model="cantHoras"
                  required
                  oninvalid="this.setCustomValidity('Ingrese la cantidad de horas catedra')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">descripcion</label>
                </div>
                <textarea name="descripcion" cols="50" rows="12" class="form-control"
                  placeholder="descripcion"
                  v-model="descripcion">
                </textarea>
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Resoluciones</label>
                <div>
                  <multiselect v-model="Selectedresoluciones" :options="ListaResoluciones" :searchable="true" label="resolucion" track-by="resolucion" :close-on-select="true" :show-labels="false" :multiple="true" placeholder="Lista de resoluciones"></multiselect>
                  <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar al menos una resolucion</label>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit" >Crear nuevo plan de estudios</button>
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
  name: "AgregarMateria",
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      titulo: '',
      cantHoras: '',
      descripcion: '',
      Selectedresoluciones: [],
      ListaResoluciones:[],
      isInvalid: false
    };
  },
  mounted(){
    this.GetResoluciones();
  },
  methods: {
    GetResoluciones() {
      axios.get("/api/plan_estudios/resoluciones").then(result => {
        result.data.forEach(resolucion => {
          this.ListaResoluciones.push(resolucion)
        });
      });
    },
    validar () {
      if (this.Selectedresoluciones.length === 0){
        this.isInvalid = true
        return false
      }else
        return true
    },
    async PostNewMateria() {
      if(this.validar()){
        await axios.post("/api/materia/add", {
        titulo: this.titulo,
        descripcion: this.descripcion,
        cantHoras: this.cantHoras,
        resoluciones: this.Selectedresoluciones,
      })
      .then(res=>{this.$router.push({ name: 'Materias', params: {SuccessCountDownCreationProp: 4 }})})
      .catch(err=>{
        if(err.message.includes('409')){
          this.$router.push({ name: 'Materias', params: {ErrorCountDownCreationRepeatedProp: 6 }})
        }else
          this.$router.push({ name: 'Materias', params: {ErrorCountDownCreationProp: 6 }})
        })
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.container {
  padding: 0 !important;
}
[class*="col"] {
  padding: 0 !important;
}
</style>
