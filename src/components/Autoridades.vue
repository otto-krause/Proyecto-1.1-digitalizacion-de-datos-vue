<template>
  <div>
    <navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 col-lg-2">
          <div class="card">
            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Cargos</h6>
              </header>
              <div class="card-body">
                <form>
                  <label class="form-check">
                    <input class="form-check-input" type="checkbox" value />
                    <span class="form-check-label">Profesor</span>
                  </label>
                  <!-- form-check.// -->
                  <label class="form-check">
                    <input class="form-check-input" type="checkbox" value />
                    <span class="form-check-label">Preceptor</span>
                  </label>
                  <!-- form-check.// -->
                  <label class="form-check">
                    <input class="form-check-input" type="checkbox" value />
                    <span class="form-check-label">Coordinador</span>
                  </label>
                  <!-- form-check.// -->
                </form>
              </div>
              <!-- card-body.// -->
            </article>
            <!-- card-group-item.// -->

            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Choose type</h6>
              </header>
              <div class="card-body">
                <label class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadio" value />
                  <span class="form-check-label">First option</span>
                </label>
                <label class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadio" value />
                  <span class="form-check-label">Brand new option</span>
                </label>
                <label class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadio" value />
                  <span class="form-check-label">Some other option</span>
                </label>
              </div>
              <!-- card-body.// -->
            </article>
            <!-- card-group-item.// -->

            <!-- card.// -->

            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Edad</h6>
              </header>
              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label>Min</label>
                    <input type="number" class="form-control" id="inputEmail4" placeholder="18" />
                  </div>
                  <div class="form-group col-md-6 text-right">
                    <label>Max</label>
                    <input type="number" class="form-control" placeholder="100" />
                  </div>
                </div>
              </div>
              <!-- card-body.// -->
            </article>
            <!-- card-group-item.// -->
            <article class="card-group-item">
              <header class="card-header">
                <h6 class="title">Selection</h6>
              </header>
              <div class="card-body">
                <div class="custom-control custom-checkbox">
                  <span class="float-right badge badge-light round">52</span>
                  <input type="checkbox" class="custom-control-input" id="Check1" />
                  <label class="custom-control-label" for="Check1">Xiaomi</label>
                </div>
                <!-- form-check.// -->

                <div class="custom-control custom-checkbox">
                  <span class="float-right badge badge-light round">132</span>
                  <input type="checkbox" class="custom-control-input" id="Check2" />
                  <label class="custom-control-label" for="Check2">Panqueque</label>
                </div>
                <!-- form-check.// -->

                <div class="custom-control custom-checkbox">
                  <span class="float-right badge badge-light round">17</span>
                  <input type="checkbox" class="custom-control-input" id="Check3" />
                  <label class="custom-control-label" for="Check3">Otra</label>
                </div>
                <!-- form-check.// -->
              </div>
              <!-- card-body.// -->
            </article>
            <!-- card-group-item.// -->
          </div>
          <!-- card.// -->
        </div>
        <div class="col">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Telefono</th>
                <th scope="col">Ficha Medica</th>
              </tr>
            </thead>
            <tbody v-for="autoridad in autoridades" v-bind:key="autoridad.idAutoridad">
              <tr>
                <td>{{autoridad.dni}}</td>
                <td>{{autoridad.nombre}}</td>
                <td>{{autoridad.apellido}}</td>
                <td>{{autoridad.telefono}}</td>
                <td>{{autoridad.fichaMedica ? "Si": "No"}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation";

import axios from "axios";

export default {
  name: "Autoridades",
  components: {
    Navigation
  },
  data() {
    return {
      autoridades: []
    };
  },
  mounted() {
    this.GetAutoridades();
  },
  methods: {
    GetAutoridades() {
      axios.get("/api/autoridad").then(result => {
        this.autoridades = result.data;
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0 !important;
}
[class*="col"] {
  padding: 0 !important;
}
</style>
