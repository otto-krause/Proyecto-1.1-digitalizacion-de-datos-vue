<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link to="/PlanEstudios" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Nuevo plan de estudios</h3>
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
                  oninvalid="this.setCustomValidity('Debe ingresar la resolucion')"
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
                  ></textarea>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Vigencia desde</label>
                </div>
                <input type="date" v-model="vigenciaDesde" name="vigenciaDesde" class="form-control" min='1970-01-01' max='2100-01-01' required oninvalid="this.setCustomValidity('Debe ingresar una fecha valida')" oninput="setCustomValidity('')"/>
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

import axios from "axios";

export default {
  name: "AgregarPlanEstudios",
  components: {
    Navigation,
  },
  data() {
    return {
      resolucion: '',
      descripcion: '',
      vigenciaDesde: new Date(null).toISOString()
    };
  },
  methods: {
    async PostNewPL() {
      await axios.post("/api/plan_estudios/add", {
        resolucion: this.resolucion,
        descripcion: this.descripcion,
        vigenciaDesde: this.vigenciaDesde
      })
      .then(res=>{this.$router.push({ name: 'PlanEstudios', params: {title:"Plan de estudios creado",timer: 4,type:"success",message:"El plan de estudios se ha creado correctamente" }})})
      .catch(err=>{
        if(err.message.includes('409')){
          this.makeToast('Plan de estudios existente',6,'warning',"(resolucion Existente) - El plan de estudios ya existe.");
        }else
          this.makeToast('Error',6,'danger',"El plan de estudios no ha podido ser creado.");
        })
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
