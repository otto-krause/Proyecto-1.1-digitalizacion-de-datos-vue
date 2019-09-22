<template>
  <div>
    <navigation />
    <div class="container-fluid">
      <b-alert
          :show="ErrorCountDownCreationRepeated"
          dismissible
          variant="warning"
          @dismissed="ErrorCountDownCreationRepeated =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>(resolucion Existente) - El plan de estudios ya existe.</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El plan de estudios se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El plan de estudios no ha podido ser creado. Posiblemente haya un problema con los datos ingresados</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El plan de estudios ha sido eliminado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El plan de estudios no ha podido ser eliminado</p>
        </b-alert>
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
                      v-model="fechaInicio"
                      id="fechaInicio"
                      class="form-control"
                    />
                    <label>Hasta</label>
                    <input
                      type="date"
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
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","ErrorCountDownCreationRepeatedProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp"],
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
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      ErrorCountDownCreationRepeated:this.ErrorCountDownCreationRepeatedProp ? this.ErrorCountDownCreationRepeatedProp : 0
    };
  },
  mounted() {
    this.GetPlanesEstudio()
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
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
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
