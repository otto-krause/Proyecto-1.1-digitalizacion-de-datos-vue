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
            <h3 class="card-title text-center mb-4">Nueva Autoridad</h3>
            <form autocomplete="off" v-on:submit="PostNewAutoridad">
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
                  name="DNI"
                  class="form-control"
                  placeholder="DNI"
                  v-model="dni"
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
                  <label class="input-group-text">Fecha de ingreso</label>
                </div>
                <input type="date" v-model="fechaIngreso" name="fechaIngreso" class="form-control" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha de cumpleaños</label>
                </div>
                <input type="date" v-model="fechaNacimiento" name="fechaNacimiento" class="form-control" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Ficha Medica</label>
                </div>
                <select class="form-control" name="fichaMedica" v-model="fichaMedica">
                  <option value disabled selected>Ficha Medica</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                  <option value="NULL">Desconocido</option>
                </select>
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
import Navigation from "./Navigation";

import axios from "axios";

export default {
  name: "AgregarAutoridad",
  components: {
    Navigation
  },
  data() {
    return {
      dni: '',
      telefono: '',
      calle: '',
      ncalle: '',
      nombre: '',
      apellido: '',
      fechaIngreso: new Date(null).toISOString(),
      fechaNacimiento: new Date(null).toISOString(),
      fichaMedica: ''
    };
  },
  methods: {
    PostNewAutoridad() {
      axios.post("/api/autoridad/add", {
          dni: this.dni,
          telefono: this.telefono,
          direccion: this.calle + " " + this.ncalle,
          nombre: this.nombre,
          apellido: this.apellido,
          fechaIngreso: this.fechaIngreso,
          fechaNacimiento: this.fechaNacimiento,
          fichaMedica: this.fichaMedica
        })
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>
