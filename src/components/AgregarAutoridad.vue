<template>
  <div>
    <navigation />
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card bg-light">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Nueva Autoridad</h3>
            <form autocomplete="off" action="/clients/add" method="POST">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Nombre</label>
                </div>
                <input
                  type="text"
                  name="nombre"
                  class="form-control"
                  placeholder="Nombre"
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
                  required
                  oninvalid="this.setCustomValidity('Ingrese el DNI de la autoridad')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Direccion</label>
                </div>
                <input type="text" name="calle" class="form-control" placeholder="Calle" />
                <input type="number" name="nCalle" class="form-control col-sm-4" placeholder="Numero" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Telefono</label>
                </div>
                <input type="number" name="Telefono" class="form-control" placeholder="Telefono" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha de ingreso</label>
                </div>
                <input type="date" name="fechaIngreso" class="form-control" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Fecha de cumpleaños</label>
                </div>
                <input type="date" name="fechaNacimiento" class="form-control" />
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Ficha Medica</label>
                </div>
                <select class="form-control" name="fichaMedica">
                  <option value disabled selected>Ficha Medica</option>
                  <option value=1>Si</option>
                  <option value=0>No</option>
                  <option value=NULL>Desconocido</option>
                </select>
              </div>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit">Crear nueva Autoridad</button>
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
      autoridades: []
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios.get("/api/autoridad").then(result => {
        this.autoridades = result.data;
      });
    }
  }
};
</script>

<style scoped>
</style>
