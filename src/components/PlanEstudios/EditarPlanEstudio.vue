<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name: 'PlanEstudioCompleto', params: {PlanEstudio}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar Plan de estudios</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewPL">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Resolucion</label>
                </div>
                <input
                  type="text"
                  name="resolucion"
                  class="form-control"
                  placeholder="Resolucion"
                  v-model="resolucion"
                  required
                  oninvalid="this.setCustomValidity('Ingrese numero de resolucion')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">descripcion</label>
                </div>
                <textarea name="descripcion" cols="50" rows="12" class="form-control"
                  placeholder="descripcion"
                  v-model="descripcion"
                  required
                  oninvalid="this.setCustomValidity('Ingrese la resolucion')"
                  oninput="setCustomValidity('')"></textarea>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Vigencia desde</label>
                </div>
                <input type="date" v-model="vigenciaDesde" name="vigenciaDesde" class="form-control" required oninvalid="this.setCustomValidity('Ingrese la fecha del comienzo de la vigencia')" oninput="setCustomValidity('')"/>
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

import axios from "axios";

export default {
  name: "EditarPlanEstudio",
  props: ["PlanEstudio"],
  components: {
    Navigation,
  },
  data() {
    return {
      resolucion: this.PlanEstudio.resolucion,
      descripcion: this.PlanEstudio.descripcion,
      vigenciaDesde: this.PlanEstudio.vigenciaDesde.slice(0,10)
    };
  },
  mounted() {
    if(!this.PlanEstudio){
      this.$router.push({ name: 'PlanEstudios'})
    }
  },
  methods: {
    async PostNewPL() {
      await axios.post("/api/plan_estudios/update", {
        resolucion: this.resolucion,
        descripcion: this.descripcion,
        vigenciaDesde: new Date(this.vigenciaDesde).toISOString()
        })
        .then(async(res)=>{
          await axios.get("/api/plan_estudios/" + this.resolucion)
          .then(result =>{
            this.$router.push({ name: 'PlanEstudioCompleto', params: {PlanEstudio:result.data[0],SuccessCountDownEditProp: 6 }})
          })
        })
        .catch(err=>{this.$router.push({ name: 'PlanEstudioCompleto', params: {PlanEstudio:this.PlanEstudio,ErrorCountDownEditProp: 7 }})})
    }
  }
};
</script>
<style scoped>
</style>
