<template>
  <div>
    <navigation />

    <div class="container-fluid">
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Busqueda</h6>
                <div class="form-row">
                  <input type="text" v-model="search" class="form-control" placeholder="Buscador" />
                </div>
              </div>
            </article>
            <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Cargos</h6>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="Check1" v-model="profesor"/>
                  <label class="custom-control-label" for="Check1">Profesor</label>
                </div>

                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="Check2" v-model="preceptor"/>
                  <label class="custom-control-label" for="Check2">Preceptor</label>
                </div>

                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="Check3" v-model="coordinador"/>
                  <label class="custom-control-label" for="Check3">Coordinador</label>
                </div>
              </div>
            </article>
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Fecha Ingreso</h6>
                <div class="form-row">
                  <div class="form-group col-sm-12">
                    <label>Desde</label>
                    <input
                      type="date"
                      v-model="fechaInicio"
                      class="form-control"
                      data-date-format="YYYY-MM-DD"
                    />
                    <label>Hasta</label>
                    <input
                      type="date"
                      v-model="fechaFin"
                      class="form-control"
                      data-date-format="YYYY-MM-DD"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Autoridades</h1>
            <router-link
              :to="{ name: 'AgregarAutoridad' }"
              class="btn btn-info"

            >Crear autoridad</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Telefono</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-for="autoridad in displayedAutoridades" v-bind:key="autoridad.idAutoridad">
              <tr>
                <th scope="col">{{autoridad.dni}}</th>
                <th scope="col">{{autoridad.nombre}}</th>
                <th scope="col">{{autoridad.apellido}}</th>
                <th scope="col">{{autoridad.telefono}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'AutoridadCompleta', params: {autoridad} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
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
      search: "",
      profesor: false,
      preceptor: false,
      coordinador: false,
      fechaInicio: new Date("1984-01-01").toISOString(),
      fechaFin: new Date().toISOString(),
      page: 1,
      perPage: 10,
      pages: [],
      autoridades: []
    };
  },
  mounted() {
    this.GetAutoridades();
  },
  computed: {
    filteredAutoridades() {
      return this.autoridades.filter(autoridad => {
        return (
          (this.profesor ? autoridad.idRol.includes("1") : true) &&
          (this.preceptor ? autoridad.idRol.includes("2") : true) &&
          (this.coordinador ? autoridad.idRol.includes("3") : true) &&
          (autoridad.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
            autoridad.apellido
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            autoridad.dni.toString().includes(this.search))
        );
      });
    },
    displayedAutoridades() {
      return this.paginate();
    }
  },
  methods: {
    GetAutoridades() {
      axios.get("/api/autoridad").then(result => {
        this.autoridades = result.data;
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredAutoridades.slice(from, to);
    },
    setAutoridades() {
      let numberOfAutoridades = Math.ceil(
        this.filteredAutoridades.length / this.perPage
      );
      this.pages = [];
      for (let i = 1; i <= numberOfAutoridades; i++) {
        this.pages.push(i);
      }
    }
  },
  watch: {
    filteredAutoridades() {
      this.page = 1;
      this.setAutoridades();
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
