<template>
  <div>
    <navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Cursadas</h6>
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
                  <multiselect class="col-sm-7" v-model="division" :options="optionsdivision" :disabled= "año ? false : true" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Divisiones"></multiselect>
                </div>
              </div>
            </article>
            <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Dia</h6>
                <div class="form-group input-group">
                  <multiselect
                    class="col-xs-12 px-0"
                    v-model="diaSeleccionado"
                    :options="dias"
                    :searchable="false"
                    track-by="value"
                    label="name"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Dia"
                  ></multiselect>
                </div>
              </div>
            </article>
            <article class="card-group-item">
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="title">Horario inicio-fin</h6>
                <div class="form-group input-group">
                  <multiselect
                    class="col"
                    v-model="horarioInicioSeleccionado"
                    :options="horariosInicio"
                    :searchable="false"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="inicio"
                  ></multiselect>
                  <multiselect
                    class="col"
                    v-model="horarioFinSeleccionado"
                    :options="horariosFin"
                    :searchable="false"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="final"
                  ></multiselect>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Cursadas</h1>
            <router-link :to="{ name: 'AgregarCursada' }" class="btn btn-info">Crear cursada </router-link>
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
  props: ["title","message","type","timer"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      searchCursada: '',
      horarioInicioSeleccionado: '',
      horarioFinSeleccionado:'',
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
      diaSeleccionado: "",
      dias: [
        { name: "Lunes", value: 0 },
        { name: "Martes", value: 1 },
        { name: "Miercoles", value: 2 },
        { name: "Jueves", value: 3 },
        { name: "Viernes", value: 4 }
      ],
      horariosTotales: [
        "07:45",
        "08:25",
        "09:05",
        "09:20",
        "10:00",
        "10:05",
        "10:40",
        "10:50",
        "11:20",
        "11:30",
        "12:50",
        "13:30",
        "14:10",
        "14:50",
        "15:00",
        "15:40",
        "15:50",
        "16:30",
        "16:35",
        "17:10",
        "17:15",
        "17:55"
      ],
      horariosInicio: [
        "07:45",
        "08:25",
        "09:05",
        "09:45",
        "10:00",
        "10:40",
        "11:20",
        "11:30",
        "12:00",
        "12:10",
        "13:30",
        "14:10",
        "14:50",
        "15:30",
        "15:40",
        "16:20",
        "16:30",
        "17:10",
        "17:15",
        "17:50",
        "17:55"
      ],
      horariosFin: [
        "07:45",
        "08:25",
        "09:05",
        "09:45",
        "10:00",
        "10:40",
        "11:20",
        "11:30",
        "12:00",
        "12:10",
        "13:30",
        "14:10",
        "14:50",
        "15:30",
        "15:40",
        "16:20",
        "16:30",
        "17:10",
        "17:15",
        "17:50",
        "17:55"
      ],
      dismissSecs: 4,
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
    if(this.timer){
      this.makeToast(this.type);
    }
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
    año:function (){
      this.division = '';
      this.filterNumDiv();
    },
    filteredDivisiones() {
      this.page = 1;
      this.setDivisiones();
    },
    horarioInicioSeleccionado: function() {
      this.horariosFin = this.horariosTotales;
      this.horariosFin = this.horariosFin.slice(
        this.horariosFin.indexOf(this.horarioInicioSeleccionado) + 1
      );
    },
    horarioFinSeleccionado: function() {
      this.horariosInicio = this.horariosTotales;
      this.horariosInicio = this.horariosInicio.slice(
        0,
        this.horariosInicio.indexOf(this.horarioFinSeleccionado)
      );
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
