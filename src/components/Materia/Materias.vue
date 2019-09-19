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
          <p>(Materia Existente) - La materia ya existe.</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La materia se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La materia no ha podido ser creada. Posiblemente haya un problema con los datos ingresados</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La materia ha sido eliminada correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La materia no ha podido ser eliminada</p>
        </b-alert>
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Materia</h6>
                <div class="form-row">
                  <input type="text" v-model="searchMateria" class="form-control" placeholder="Busqueda" />
                </div>
              </div>
            </article>
            <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Resolucion</h6>
                <div class="form-group input-group">
                  <multiselect class="col" v-model="selectedResolucion" :options="opcionresoluciones" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="resoluciones"></multiselect>
               </div>
              </div>
            </article>
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Materias</h1>
            <router-link :to="{ name: 'AgregarMateria' }" class="btn btn-info">Crear materia</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Titulo</th>
                <th scope="col">Horas Catedra</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody v-for="materia in displayedMaterias" :key="materia.idMateria">
              <tr>
                <th scope="col">{{materia.idMateria}}</th>
                <th scope="col">{{materia.titulo}}</th>
                <th scope="col">{{materia.cantHoras}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'MateriaCompleta', params: {materia} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="filteredMaterias.length >9">
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

import Multiselect from 'vue-multiselect'
import axios from "axios";

export default {
  name: "Materias",
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","ErrorCountDownCreationRepeatedProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      searchMateria: "",
      page: 1,
      perPage: 9,
      pages: [],
      materias: [],
      opcionresoluciones:[],
      selectedResolucion:[],
      dismissSecs: 4,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      ErrorCountDownCreationRepeated:this.ErrorCountDownCreationRepeatedProp ? this.ErrorCountDownCreationRepeatedProp : 0
    };
  },
  mounted() {
    this.GetMaterias(),
    this.GetResoluciones()
  },
  computed: {
    filteredMaterias() {
      return this.materias.filter(materia => {
        return (
          (
          materia.titulo.toString().includes(this.searchMateria)
          ) &&
          (
            materia.cantHoras.toString().includes(this.searchMateria)
          )&&
          (
            this.selectedResolucion ? materia.resolucion.includes(this.selectedResolucion) : true
          )
        );
      });
    },
    displayedMaterias() {
      return this.paginate();
    },
  },
  methods: {
    GetMaterias() {
      axios.get("/api/materia/planmateria").then(result => {
        this.materias = result.data;
      });
    },
    GetResoluciones(){
      axios.get("/api/plan_estudios/resoluciones").then(result => {
        result.data.forEach(resolucion => {
          this.opcionresoluciones.push(resolucion.resolucion)
        });
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredMaterias.slice(from, to);
    },
    setMaterias() {
      let numberOfMaterias = Math.ceil(
        this.filteredMaterias.length / this.perPage
      );
      this.pages = [];
      for (let i = 1; i <= numberOfMaterias; i++) {
        this.pages.push(i);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  watch: {
    filteredMaterias() {
      this.page = 1;
      this.setMaterias();
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.container {
  padding: 0 !important;
}
[class*="col"] {
  padding: 0 !important;
}
</style>
