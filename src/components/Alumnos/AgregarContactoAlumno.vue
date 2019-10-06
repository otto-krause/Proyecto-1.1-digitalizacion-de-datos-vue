<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name:'AlumnoCompleto', params:{alumno}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Nuevo Contacto del Alumno <br> {{alumno.apellido}}, {{alumno.nombre}} <br> DNI:{{alumno.dniAlumno}}</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewContactoAlumno(alumno)">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Nombre</label>
                </div>
                <input
                  type="text"
                  name="nombre"
                  class="form-control"
                  placeholder="Nombre - Campo obligatorio"
                  v-model="nombre"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el nombre del contacto')"
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
                  placeholder="Apellido - Campo obligatorio"
                  v-model="apellido"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el apellido del contacto')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">DNI</label>
                </div>
                <input
                  type="number"
                  name="dniContacto"
                  class="form-control"
                  placeholder="DNI"
                  v-model="dniContacto"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Celular</label>
                </div>
                <input
                  type="number"
                  name="celular"
                  class="form-control"
                  placeholder="Celular"
                  v-model="celular"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">E-Mail</label>
                </div>
                <input
                  type="text"
                  name="mail"
                  class="form-control"
                  placeholder="E-Mail"
                  v-model="mail"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Relacion</label>
                </div>
                <select class="form-control" name="relacion" v-model="relacion" required>
                  <option value="" selected>None</option>
                  <option value="Padre">Padre</option>
                  <option value="Madre">Madre</option>
                  <option value="Tutor">Tutor</option>
                </select>
              </div>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit" >Crear nuevo alumno</button>
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
  name: "AgregarContactoAlumno",
  props:["alumno"],
  components: {
    Navigation,
  },
  data() {
    return {
      celular: '',
      nombre: '',
      apellido: '',
      relacion: '',
      mail:'',
      dniContacto:'',
    };
  },
  methods: {
    async PostNewContactoAlumno(alumno) {
      await axios.post("/api/contacto_alumno/add", {
        dniAlumno: this.alumno.dniAlumno,
        celular: this.celular,
        nombre: this.nombre,
        apellido: this.apellido,
        mail:this.mail,
        dniContacto: this.dniContacto,
        relacion: this.relacion,
      })
      .then(res=>{this.$router.push({ name: 'AlumnoCompleto', params: {alumno,title:"Contacto creado",timer: 4,type:"success",message:"El contacto se ha creado correctamente" }})})
      .catch(err=>{this.$router.push({ name: 'AlumnoCompleto', params: {alumno,title:"Error",timer: 6,type:"danger",message:"El contacto no ha podido ser creado. Posiblemente haya un problema con los datos ingresados"  }})})
    }
  }
};
</script>
<style scoped>
</style>
