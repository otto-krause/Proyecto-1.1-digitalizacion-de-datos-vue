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
          <p>(Acta previa Existente) - El acta ya existe.</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El acta se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El acta no ha podido ser creada. Posiblemente haya un problema con los datos ingresados</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El acta ha sido eliminada correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El acta no ha podido ser eliminada</p>
        </b-alert>
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
            <router-link :to="{ name: 'AgregarMateria' }" class="btn btn-info">Crear Acta de previa</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Materia</th>
                <th scope="col">Alumno</th>
                <th scope="col">Profesor</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody v-for="actaPrevia in displayedActas" :key="actaPrevia.idActa">
              <tr>
                <th scope="col">{{actaPrevia.idMateria}}</th>
                <th scope="col">{{actaPrevia.titulo}}</th>
                <th scope="col">{{actaPrevia.cantHoras}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'MateriaCompleta', params: {actaPrevia} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="ActasPrevias.length >9">
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
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","ErrorCountDownCreationRepeatedProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp"],
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
      dismissSecs: 4,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      ErrorCountDownCreationRepeated:this.ErrorCountDownCreationRepeatedProp ? this.ErrorCountDownCreationRepeatedProp : 0
    };
  },
  mounted() {
    this.GetActas()
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
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
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
