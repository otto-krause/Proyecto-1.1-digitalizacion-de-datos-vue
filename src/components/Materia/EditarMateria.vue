<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name: 'MateriaCompleta', params: {materia}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar materia</h3>
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
  name: "EditarMateria",
  props: ["materia","resoluciones"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      titulo: this.materia.titulo,
      cantHoras: this.materia.cantHoras,
      descripcion: this.materia.descripcion,
      Selectedresoluciones: this.resoluciones,
      ListaResoluciones:[],
      isInvalid: false
    };
  },
  mounted() {
    if(!this.materia || !this.resoluciones){
      this.$router.push({ name: 'MateriaCompleta'})
    }
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
        await axios.post("/api/materia/update", {
        idMateria:this.materia.idMateria,
        titulo: this.titulo,
        descripcion: this.descripcion,
        cantHoras:this.cantHoras,
        resoluciones:this.Selectedresoluciones
        })
        .then(async(res)=>{
          await axios.get("/api/materia/" + this.materia.idMateria)
          .then(result =>{
            this.$router.push({ name: 'MateriaCompleta', params: {materia:result.data[0],SuccessCountDownEditProp: 6 }})
          })
        })
        .catch(err=>{this.$router.push({ name: 'MateriaCompleta', params: {materia:this.materia,ErrorCountDownEditProp: 7 }})})
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
