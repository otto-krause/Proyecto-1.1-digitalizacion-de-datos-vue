<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name: 'AlumnoCompleto', params: {alumno}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar alumno</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewAlumno">
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
                  oninvalid="this.setCustomValidity('Ingrese el nombre del alumno')"
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
                  oninvalid="this.setCustomValidity('Ingrese el apellido del alumno')"
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
                  name="dniAlumno"
                  class="form-control"
                  placeholder="DNI"
                  v-model="dniAlumno"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el DNI del alumno')"
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
                <input type="date" v-model="fechaAlta" id="fechaAlta" min='1970-01-01' max='2100-01-01' name="fechaAlta" class="form-control" required oninvalid="this.setCustomValidity('Ingrese la fecha de alta del alumno')" oninput="setCustomValidity('')"/>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha de nacimiento</label>
                </div>
                <input type="date" v-model="fechaNacimiento" id="fechaNacimiento" min='1970-01-01' max='2100-01-01' name="fechaNacimiento" class="form-control" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">es repetidor?</label>
                </div>
                <select class="form-control" name="repetidor" v-model="repetidor">
                  <option value="1">Si</option>
                  <option value="0" selected>No</option>
                </select>
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
  name: "EditarAlumno",
  props: ["alumno"],
  components: {
    Navigation,
  },
  data() {
    return {
      dniAlumno: this.alumno.dniAlumno,
      telefono:this.alumno.telefono,
      calle: this.alumno.direccion.split(' ').reverse().pop(),
      ncalle: (this.alumno.direccion.split(' ')).reverse()[0],
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido,
      fechaAlta: this.alumno.fechaAlta.slice(0,10),
      fechaNacimiento: this.alumno.fechaNacimiento.slice(0,10),
      repetidor: this.alumno.repetidor,
      alumnoReenviar: this.alumno
    };
  },
  mounted() {
    if(!this.alumno){
      this.$router.push({ name: 'Alumnos'})
    }
  },
  methods: {
    async PostNewAlumno() {
      await axios.post("/api/alumno/update", {
        dniAlumno: this.dniAlumno,
        telefono: this.telefono,
        direccion: this.calle + " " + this.ncalle,
        nombre: this.nombre,
        apellido: this.apellido,
        fechaAlta: new Date(this.fechaAlta).toISOString(),
        fechaNacimiento: new Date(this.fechaNacimiento).toISOString(),
        repetidor: this.repetidor,
        })
        .then(async(res)=>{
          await axios.get("/api/alumno/" + this.dniAlumno)
          .then(result =>{
            this.alumnoReenviar = result.data[0]
            this.$router.push({ name: 'AlumnoCompleto', params: {alumno:this.alumnoReenviar,title:"Alumno modificado",timer: 6,type:"success",message:"El alumno se modifico correctamente" }})
          })
        })
        .catch(err=>{this.$router.push({ name: 'AlumnoCompleto', params: {alumno:this.alumno,title:"Error",timer: 7,type:"danger",message:"El alumno no pudo ser modificado" }})})
    }
  }
};
</script>
<style scoped>
</style>
