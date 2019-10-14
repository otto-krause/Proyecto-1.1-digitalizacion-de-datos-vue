<template>
  <div>
    <navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Actas de previas</h6>
                <div class="form-row">
                  <input type="text" v-model="searchActa" class="form-control" placeholder="Busqueda" />
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Actas de previas</h1>
            <router-link :to="{ name: 'AgregarActaPrevia' }" class="btn btn-info">Crear Acta de previa</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Alumno</th>
                <th scope="col">Profesor</th>
                <th scope="col">Materia</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-for="actaPrevia in displayedActas" :key="actaPrevia.idActa">
              <tr>
                <th scope="col">{{actaPrevia.dniAlumno}} - {{actaPrevia.NombreAlumno}}, {{actaPrevia.ApellidoAlumno}}</th>
                <th scope="col">{{actaPrevia.dniAutoridad}} - {{actaPrevia.NombreAutoridad}}, {{actaPrevia.ApellidoAutoridad}}</th>
                <th scope="col">{{actaPrevia.titulo}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'ActaPreviaCompleta', params: {actaPrevia} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="ActasPrevias.length >10">
          <ul class="pagination">
            <li class="page-item" v-if="page != 1">
              <a class="page-link" href="#" v-on:click="page = 1">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li v-for="pageNumber in pages.slice(Math.max(0,page-4), page+4)" v-bind:key="pageNumber" v-on:click="page = pageNumber" class="page-item"><a class="page-link" href="#">{{pageNumber}}</a></li>
            <li class="page-item" v-if="page < pages.length">
              <a class="page-link" href="#" v-on:click="page = pages.length">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";

import axios from "axios";

export default {
  name: "ActasPrevia",
  props: ["title","message","type","timer"],
  components: {
    Navigation
  },
  data() {
    return {
      searchActa: "",
      page: 1,
      perPage: 10,
      pages: [],
      ActasPrevias: [],
      dismissSecs: 4
    };
  },
  mounted() {
    this.GetActas()
    if(this.timer){
      this.makeToast(this.type);
    }
  },
  computed: {
    filteredActas() {
      return this.ActasPrevias.filter(Acta => {
        return ( true
        );
      });
    },
    displayedActas() {
      return this.paginate();
    },
  },
  methods: {
    GetActas() {
      axios.get("/api/acta_previa/").then(result => {
        this.ActasPrevias = result.data;
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredActas.slice(from, to);
    },
    setActas() {
      let numberOfActas = Math.ceil(
        this.filteredActas.length / this.perPage
      );
      this.pages = [];
      for (let i = 1; i <= numberOfActas; i++) {
        this.pages.push(i);
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast(this.message, {
        title: this.title,
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-left",
        autoHideDelay: this.timer * 1000,
        appendToast: true
      })
    }
  },
  watch: {
    filteredActas() {
      this.page = 1;
      this.setActas();
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
