<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link to="/Autoridades" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar rol</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewRol">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Nombre del rol</label>
                </div>
                <input
                  type="text"
                  name="rolN"
                  class="form-control"
                  placeholder="Nombre del rol"
                  v-model="rolN"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el nombre del rol')"
                  oninput="setCustomValidity('')"
                />
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
  name: "EditarRol",
  props: ["rol"],
  components: {
    Navigation,
  },
  data() {
    return {
      rolN: this.rol.rol,
    };
  },
  mounted() {
    if(!this.rol){
      this.$router.push({ name: 'Roles'})
    }
  },
  methods: {
    async PostNewRol() {
      await axios.post("/api/rol/update", {
          idRol:this.rol.idRol,
          rol: this.rolN
        })
        .then(res=>{this.$router.push({ name: 'Roles', params: {SuccessCountDownEditProp: 4 }})})
        .catch(err=>{this.$router.push({ name: 'Roles', params: {ErrorCountDownEditProp: 6 }})})
    },
  }
};
</script>
<style scoped>
</style>
