<template>
  <div>
    <navigation />
    <div class="container-fluid">
      <b-alert
          :show="ErrorCountDownRol"
          dismissible
          variant="warning"
          @dismissed="ErrorCountDownRol =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La autoridad no puede ser creada porque no existen roles para asignarle. Cree un rol para poder continuar</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La division se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La division no ha podido ser creada. Posiblemente haya un problema con los datos ingresados o esten duplicados</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La division ha sido eliminada correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La division no ha podido ser eliminada</p>
        </b-alert>
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Ciclo Lectivo</h6>
                <div class="form-row">
                  <input type="number" v-model="searchCicloLectivo" class="form-control" />
                </div>
              </div>
            </article>
            <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Especialidades</h6>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="computacion"
                    v-model="computacion"
                  />
                  <label class="custom-control-label" for="computacion">Computacion</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="electronica"
                    v-model="electronica"
                  />
                  <label class="custom-control-label" for="electronica">Electronica</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="construcciones"
                    v-model="construcciones"
                  />
                  <label class="custom-control-label" for="construcciones">Construcciones</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="quimica"
                    v-model="quimica"
                  />
                  <label class="custom-control-label" for="quimica">Quimica</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="electricidad"
                    v-model="electricidad"
                  />
                  <label class="custom-control-label" for="electricidad">Electricidad</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="mecanica"
                    v-model="mecanica"
                  />
                  <label class="custom-control-label" for="mecanica">Mecanica</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="CicloBasico"
                    v-model="CicloBasico"
                  />
                  <label class="custom-control-label" for="CicloBasico">Ciclo Basico</label>
                </div>
              </div>
            </article>
            <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Año y division</h6>
                <div class="form-group input-group">
                  <multiselect class="col-sm-5" v-model="año" :options="optionsaño" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Años"></multiselect>
                  <multiselect class="col-sm-7" v-model="division" :options="optionsdivision" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Divisiones"></multiselect>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Divisiones</h1>
            <router-link :to="{ name: 'AgregarDivision' }" class="btn btn-info">Crear division</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Especialidad</th>
                <th scope="col">Año</th>
                <th scope="col">Division</th>
                <th scope="col">turno</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-for="division in displayedDivisiones" v-bind:key="division.idDivision">
              <tr>
                <th scope="col">{{division.especialidad}}</th>
                <th scope="col">{{division.año}}</th>
                <th scope="col">{{division.numDivision}}</th>
                <th scope="col">{{division.turno ? 'Tarde' : 'Mañana'}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'DivisionCompleta', params: {division} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="filteredDivisiones.length >9">
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
//idDivision	dniPreceptor	especialidad	año	turno	numDivision	cicloLectivo
import Multiselect from 'vue-multiselect'

import axios from "axios";

export default {
  name: "Divisiones",
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      searchCicloLectivo: new Date().getFullYear(),
      año: '',
      optionsaño:['','1','2','3','4','5','6'],
      division:'',
      optionsdivision:[],
      page: 1,
      perPage: 9,
      pages: [],
      divisiones: [],
      dismissSecs: 4,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      ErrorCountDownRol:0,
      computacion:false,
      electronica:false,
      electricidad:false,
      quimica:false,
      mecanica:false,
      construcciones:false,
      CicloBasico:false
    };
  },
  mounted() {
    this.GetDivisiones()
  },
  computed: {
    filteredDivisiones() {
      return this.divisiones.filter(division => {
        return (
          (
            division.cicloLectivo == this.searchCicloLectivo
          ) &&
          (
            this.año ? division.año.toString().includes(this.año) : true
          ) &&
          (
            this.division ? division.numDivision.toString().includes(this.division) : true
          ) &&
          (
            this.computacion ? division.especialidad == 'computacion' : true
          ) &&
          (
            this.electronica ? division.especialidad == 'electronica' : true
          ) &&
          (
            this.electricidad ? division.especialidad == 'electricidad' : true
          ) &&
          (
            this.quimica ? division.especialidad == 'quimica' : true
          ) &&
          (
            this.mecanica ? division.especialidad == 'mecanica' : true
          ) &&
          (
            this.construcciones ? division.especialidad == 'construcciones' : true
          ) &&
          (
            this.CicloBasico ? division.especialidad == 'Ciclo Basico' : true
          )
        );
      });
    },
    displayedDivisiones() {
      return this.paginate();
    },
  },
  methods: {
    filterNumDiv(){
      let numDivisiones = [];
      this.filteredDivisiones.forEach(division => {
        numDivisiones.push(division.numDivision);
      });
      let unique = [...new Set(numDivisiones)]
      this.optionsdivision = unique;
      this.optionsdivision.unshift('');
    },
    GetDivisiones() {
      axios.get("/api/division/").then(result => {
        this.divisiones = result.data;
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredDivisiones.slice(from, to);
    },
    setDivisiones() {
      let numberOfDivisiones = Math.ceil(
        this.filteredDivisiones.length / this.perPage
      );
      this.pages = [];
      for (let i = 1; i <= numberOfDivisiones; i++) {
        this.pages.push(i);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  watch: {
    año:function (){
      this.division = '';
      this.filterNumDiv();
    },
    filteredDivisiones() {
      this.page = 1;
      this.setDivisiones();
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
