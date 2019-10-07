<template>
  <div>
    <navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Resolucion</h6>
                <div class="form-row">
                  <input type="text" v-model="searchResolucion" class="form-control" placeholder="Resolucion" />
                </div>
              </div>
            </article>
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Fecha vigente</h6>
                <div class="form-row">
                  <div class="form-group col-sm-12">
                    <label>Desde</label>
                    <input
                      type="date"
                      min='1970-01-01' max='2100-01-01'
                      v-model="fechaInicio"
                      id="fechaInicio"
                      class="form-control"
                    />
                    <label>Hasta</label>
                    <input
                      type="date"
                      min='1970-01-01' max='2100-01-01'
                      v-model="fechaFin"
                      id="fechaFin"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Planes de estudio</h1>
            <router-link :to="{ name: 'AgregarPlanEstudios' }" class="btn btn-info">Crear plan de estudios</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Resolución</th>
                <th scope="col">Vigencia Desde</th>
                <th scope="col">Vigencia Hasta</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody v-for="PL in displayedPL" :key="PL.resolucion">
              <tr>
                <th scope="col">{{PL.resolucion}}</th>
                <th scope="col">{{PL.vigenciaDesde != '1970-01-01T03:00:00.000Z' ? PL.vigenciaDesde.slice(0,10) : ' - '}}</th>
                <th scope="col">{{PL.vigenciaHasta != null ? PL.vigenciaHasta.slice(0,10) : ' - '}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'PlanEstudioCompleto', params: {PlanEstudio:PL} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="filteredPL.length >9">
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
  name: "PlanEstudios",
  props: ["title","message","type","timer"],
  components: {
    Navigation
  },
  data() {
    return {
      searchResolucion: "",
      fechaInicio: new Date("1970-01-01").toISOString(),
      fechaFin: new Date().toISOString(),
      page: 1,
      perPage: 9,
      pages: [],
      planesEstudio: [],
      dismissSecs: 4,
    };
  },
  mounted() {
    this.GetPlanesEstudio()
    if(this.timer){
      this.makeToast(this.type);
    }
  },
  computed: {
    filteredPL() {
      return this.planesEstudio.filter(PL => {
        return (
          (
          PL.resolucion.toString().includes(this.searchResolucion)
          ) &&
          (
            PL.vigenciaDesde >= this.fechaInicio
          )
        );
      });
    },
    displayedPL() {
      return this.paginate();
    },
  },
  methods: {
    GetPlanesEstudio() {
      axios.get("/api/plan_estudios/").then(result => {
        this.planesEstudio = result.data;
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredPL.slice(from, to);
    },
    setPL() {
      let numberOfPL = Math.ceil(
        this.filteredPL.length / this.perPage
      );
      this.pages = [];
      for (let i = 1; i <= numberOfPL; i++) {
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
    filteredPL() {
      if(!this.fechaInicio){
        this.fechaInicio = new Date("1970-01-01").toISOString()
      }
      if(!this.fechaFin){
        this.fechaFin = new Date().toISOString()
      }
      this.page = 1;
      this.setPL();
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
