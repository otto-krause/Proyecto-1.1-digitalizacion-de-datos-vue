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
                  <span class="form-check-label">First hand items</span>
                </label>
                <label class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadio" value />
                  <span class="form-check-label">Brand new items</span>
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
                <h6 class="title">Barrita</h6>
              </header>
              <div class="card-body">
                <input class="custom-range" min="0" max="100" name type="range" />
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
                <th scope="col">Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>42240922</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Profesor</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Profesor</td>
              </tr>
              <tr>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>Profesor</td>
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
    return {};
  },
  beforeMount() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios.get("/api/autoridad").then(result => {
        console.log({result});
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
