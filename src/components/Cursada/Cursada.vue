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
          <p>(Cursada Existente) - La cursada ya existe. Debe darla de baja para registrarla nuevamente</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La cursada se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La cursada no pudo ser creada. Posiblemente haya un problema con los datos ingresados</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La cursada ha sido eliminada correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La cursada no ha podido ser eliminada</p>
        </b-alert>
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Actas cursada</h6>
                <div class="form-row">
                  <input type="text" placeholder="Buscador" v-model="searchCursada" class="form-control" />
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
                  <label class="custom-control-label" for="computacion">Computación</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="electronica"
                    v-model="electronica"
                  />
                  <label class="custom-control-label" for="electronica">Electrónica</label>
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
                  <label class="custom-control-label" for="quimica">Química</label>
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
                  <label class="custom-control-label" for="mecanica">Mecánica</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="CicloBasico"
                    v-model="CicloBasico"
                  />
                  <label class="custom-control-label" for="CicloBasico">Ciclo Básico</label>
                </div>
              </div>
            </article>
            <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Año y división</h6>
                <div class="form-group input-group">
                  <multiselect class="col-sm-5" v-model="año" :options="optionsaño" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Años"></multiselect>
                  <multiselect class="col-sm-7" v-model="division" :options="optionsdivision" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Divisiones"></multiselect>
                </div>
              </div>
            </article>
            <!-- <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Horario inicio-fin</h6>
                <div class="form-group input-group">
                  <input class="col-sm-5 mr-2" type="time" v-model="horarioInicioString" placeholder="Horario inicio">
                  <input class="col-sm-5 ml-2" type="time" v-model="horarioFinString" placeholder="Horario final">
                </div>
              </div>
            </article> -->
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Actas cursada</h1>
            <router-link :to="{ name: 'AgregarCursada' }" class="btn btn-info">Crear acta cursada</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Materia</th>
                <th scope="col">Profesor</th>
                <th scope="col">División</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-for="cursada in displayedCursada" v-bind:key="cursada.idDivision">
              <tr>
                <th scope="col">{{cursada.titulo}}</th>
                <th scope="col">{{cursada.dniProfesor}} - {{cursada.nombre}},{{cursada.apellido}}</th>
                <th scope="col">{{cursada.especialidad}} {{cursada.año}}/{{cursada.numDivision}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'CursadaCompleta', params: {cursada} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="filteredCursadas.length >9">
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
  name: "Cursada",
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp ","ErrorCountDownCreationRepeatedProp"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      searchCursada: '',
      horarioInicioString: '',
      horarioFinString:'',
      horarioInicio: new Date(),
      horarioFin:new Date(),
      año: '',
      optionsaño:['','1','2','3','4','5','6'],
      division:'',
      optionsdivision:[],
      page: 1,
      perPage: 9,
      pages: [],
      divisiones: [],
      Cursadas:[],
      dismissSecs: 4,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      ErrorCountDownCreationRepeated:this.ErrorCountDownCreationRepeatedProp ? this.ErrorCountDownCreationRepeatedProp : 0,
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
    this.GetCursadas()
  },
  beforeUpdate(){
    this.horarioInicio = new Date().setHours(this.horarioInicioString.split(':')[0],this.horarioInicioString.split(':')[1])
    this.horarioFin = new Date().setHours(this.horarioFinString.split(':')[0],this.horarioFinString.split(':')[1])
  },
  computed: {
    filteredCursadas() {
      return this.Cursadas.filter(Cursada => {
        return (
          (
            Cursada.nombre.toLowerCase().includes(this.searchCursada.toLowerCase()) ||
            Cursada.apellido.toLowerCase().includes(this.searchCursada.toLowerCase()) ||
            Cursada.titulo.toLowerCase().includes(this.searchCursada.toLowerCase())
          ) &&
          (
            this.año ? Cursada.año.toString().includes(this.año) : true
          ) &&
          (
            this.division ? Cursada.numDivision.toString().includes(this.division) : true
          ) &&
          (
            this.computacion ? Cursada.especialidad == 'Computación' : true
          ) &&
          (
            this.electronica ? Cursada.especialidad == 'Electrónica' : true
          ) &&
          (
            this.electricidad ? Cursada.especialidad == 'Electricidad' : true
          ) &&
          (
            this.quimica ? Cursada.especialidad == 'Química' : true
          ) &&
          (
            this.mecanica ? Cursada.especialidad == 'Mecánica' : true
          ) &&
          (
            this.construcciones ? Cursada.especialidad == 'Construcciones' : true
          ) &&
          (
            this.CicloBasico ? Cursada.especialidad == 'Ciclo Básico' : true
          )
        );
      });
    },
    displayedCursada() {
      return this.paginate();
    },
  },
  methods: {
    filterNumDiv(){
      let numDivisiones = [];
      this.filteredCursadas.forEach(cursada => {
        numDivisiones.push(cursada.numDivision);
      });
      let unique = [...new Set(numDivisiones)]
      this.optionsdivision = unique;
      this.optionsdivision.unshift('');
    },
    GetCursadas() {
      axios.get("/api/cursada/completa").then(result => {
        this.Cursadas = result.data;
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredCursadas.slice(from, to);
    },
    setDivisiones() {
      let numberOfDivisiones = Math.ceil(
        this.filteredCursadas.length / this.perPage
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
input {
  border: 1px solid #ccc;
  color: #888;
  vertical-align: middle;
  outline: 0;
  padding: 0.5em 1em;
  border-radius: 4px;
  width: calc(100% - 3em - 2px);
  font-family: sans-serif;
}
</style>
