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
            <h3 class="card-title text-center mb-4">Nueva autoridad</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewAutoridad">
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
                <input type="date" v-model="fechaAlta" name="fechaAlta" class="form-control" min='1970-01-01' max='2100-01-01' required oninvalid="this.setCustomValidity('Debe ingrese una fecha mayor a 01/01/1970')" oninput="setCustomValidity('')"/>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha de nacimiento</label>
                </div>
                <input type="date" v-model="fechaNacimiento" name="fechaNacimiento" class="form-control" min='1970-01-01' max='2100-01-01'/>
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
                  <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar al menos un rol</label>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit" >Crear nueva Autoridad</button>
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
  name: "AgregarRol",
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      dniAutoridad: '',
      telefono: '',
      calle: '',
      ncalle: '',
      nombre: '',
      apellido: '',
      fechaAlta: new Date(null).toISOString(),
      fechaNacimiento: new Date(null).toISOString(),
      fichaMedica: 0,
      cargos:[],
      roles: [],
      isInvalid: false
    };
  },
  created(){
    this.GetRoles();
  },
  methods: {
    GetRoles(){
      axios.get("/api/rol").then(result => {
          result.data.forEach(rol => {
            this.roles.push(rol)
          });
      });
    },
    validar () {
      if (this.cargos.length === 0){
        this.isInvalid = true
        return false
      }else
        return true
    },
    async PostNewAutoridad() {
      if(this.validar()){
      await axios.post("/api/autoridad/add", {
          dniAutoridad: this.dniAutoridad,
          telefono: this.telefono,
          direccion: this.calle + " " + this.ncalle,
          nombre: this.nombre,
          apellido: this.apellido,
          fechaAlta: this.fechaAlta,
          fechaNacimiento: this.fechaNacimiento,
          fichaMedica: this.fichaMedica,
          cargos: this.cargos
        })
        .then(res=>{this.$router.push({ name: 'Autoridades', params: {title:"Autoridad creada",timer: 4,type:"success",message:"La autoridad se ha creado correctamente"}})})
        .catch(err=>{
          if(err.message.includes('409')){
            this.makeToast('Autoridad existente',6,'warning',"(DNI Existente) - La autoridad ya existe. Debe darla de baja para registrarla nuevamente");
          }else
            this.makeToast('Error',6,'danger',"La autoridad no ha podido ser creada. Posiblemente haya un problema con los datos ingresados");
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>
