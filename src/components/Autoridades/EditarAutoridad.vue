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
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Nombre</label>
                </div>
                <input
                  type="text"
                  name="nombre"
                  class="form-control"
                  placeholder="Nombre"
                  v-model="nombre"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el nombre de la autoridad')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Apellido</label>
                </div>
                <input
                  type="text"
                  name="apellido"
                  class="form-control"
                  placeholder="Apellido"
                  v-model="apellido"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el apellido de la autoridad')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">DNI</label>
                </div>
                <input
                  disabled
                  type="number"
                  name="dniAutoridad"
                  class="form-control"
                  placeholder="DNI"
                  v-model="dniAutoridad"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el DNI de la autoridad')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Direccion</label>
                </div>
                <input
                  type="text"
                  name="calle"
                  class="form-control"
                  placeholder="Calle"
                  v-model="calle"
                />
                <input
                  type="number"
                  name="nCalle"
                  class="form-control col-sm-4"
                  placeholder="Numero"
                  v-model="ncalle"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Telefono</label>
                </div>
                <input
                  type="number"
                  name="Telefono"
                  class="form-control"
                  placeholder="Telefono"
                  v-model="telefono"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha de Alta</label>
                </div>
                <input type="date" v-model="fechaAlta" id="fechaAlta" name="fechaAlta" class="form-control" min='1970-01-01' max='2100-01-01' required oninvalid="this.setCustomValidity('Ingrese la fecha de alta de la autoridad')" oninput="setCustomValidity('')"/>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha de nacimiento</label>
                </div>
                <input type="date" v-model="fechaNacimiento" id="fechaNacimiento" name="fechaNacimiento" min='1970-01-01' max='2100-01-01' class="form-control" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Ficha Medica</label>
                </div>
                <select class="form-control" name="fichaMedica" v-model="fichaMedica">
                  <option value="1">Si</option>
                  <option value="0" selected>No</option>
                </select>
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Cargos</label>
                <div>
                  <multiselect v-model="cargos" placeholder="Lista de cargos" label="rol" track-by="idRol" :options="roles" :multiple="true"></multiselect>
                  <label class="typo__label form__label" v-if="isInvalid">*Debe seleccionar al menos un rol</label>
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
  name: "EditarAutoridad",
  props: ["autoridad","rolesReenviar","rolesMostrar"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      dniAutoridad: this.autoridad.dniAutoridad,
      telefono:this.autoridad.telefono,
      calle: this.calleModificada,
      calle: this.autoridad.direccion.split(' ').slice(0,this.autoridad.direccion.split(' ').length -1).join(' '),
      ncalle: this.autoridad.direccion.split(' ').pop(),
      nombre: this.autoridad.nombre,
      apellido: this.autoridad.apellido,
      fechaAlta: this.autoridad.fechaAlta.slice(0,10),
      fechaNacimiento: this.autoridad.fechaNacimiento != '1970-01-01T03:00:00.000Z' ? this.autoridad.fechaNacimiento.slice(0,10) : new Date(null).toISOString(),
      fichaMedica: this.autoridad.fichaMedica,
      cargos:this.rolesMostrar,
      roles: [],
      autoridadesReenviar:this.autoridad,
      isInvalid: false
    };
  },
  created(){
    this.getRoles();
  },
  mounted() {
    if(!this.autoridad){
      this.$router.push({ name: 'Autoridades'})
    }
  },
  methods: {
    getRoles(){
      axios.get('/api/rol').then(result =>{
        if(result.data != 0){
          this.ThereAreRoles = true
          result.data.forEach(rol => {
            this.roles.push(rol)
          });
        }
      })
    },
    validar () {
      if (this.cargos.length === 0){
        this.isInvalid = true
        return false
      }else
        return true
    },
    async PostNewAutoridad(rolesReenviar) {
      if(this.validar()){
      await axios.post("/api/autoridad/update", {
          dniAutoridad: this.dniAutoridad,
          telefono: this.telefono,
          direccion: this.calle + " " + this.ncalle,
          nombre: this.nombre,
          apellido: this.apellido,
          fechaAlta: new Date(this.fechaAlta).toISOString(),
          fechaNacimiento: new Date(this.fechaNacimiento).toISOString(),
          FichaMedica: this.fichaMedica,
          cargos: this.cargos
        })
        .then(async(res)=>{
          await axios.get("/api/autoridad/" + this.dniAutoridad)
          .then(result =>{
            this.autoridadesReenviar = result.data[0]
            this.$router.push({ name: 'AutoridadCompleta', params: {title:"Autoridad modificada",timer: 6,type:"success",message:"La autoridad se modifico correctamente",autoridad:this.autoridadesReenviar,roles:rolesReenviar}})
          })
        })
        .catch(err=>{this.$router.push({ name: 'AutoridadCompleta', params: {title:"Error",timer: 7,type:"danger",message:"La autoridad no pudo ser modificada",autoridad,roles:rolesReenviar}})})
      }
    },
    onTouch () {
      this.isTouched = true
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
