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
          <p>(DNI Existente) - La autoridad ya existe. Debe darla de baja para registrarla nuevamente</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La autoridad se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La autoridad no ha podido ser creada. Posiblemente haya un problema con los datos ingresados</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La autoridad ha sido eliminada correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La autoridad no ha podido ser eliminada</p>
        </b-alert>
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
                <div class="custom-control custom-checkbox" v-for="ObjetoRol in roles" v-bind:key="ObjetoRol.idRol" >
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="ObjetoRol.idRol"
                    v-model="roleFiltersBoolean[ObjetoRol.idRol - 1]"
                  />
                  <label class="custom-control-label" :for="ObjetoRol.idRol">{{ObjetoRol.rol}}</label>
                </div>
              </div>
            </article>
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Fecha Alta</h6>
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
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Autoridades</h1>
            <router-link :to="{ name: 'AgregarAutoridad' }" class="btn btn-info">Crear autoridad</router-link>
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
            <tbody v-for="autoridad in displayedAutoridades" v-bind:key="autoridad.dniAutoridad">
              <tr>
                <th scope="col">{{autoridad.dniAutoridad}}</th>
                <th scope="col">{{autoridad.nombre}}</th>
                <th scope="col">{{autoridad.apellido}}</th>
                <th scope="col">{{autoridad.telefono}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'AutoridadCompleta', params: {autoridad,roles} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="filteredAutoridades.length >10">
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
  name: "Autoridades",
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","ErrorCountDownCreationRepeatedProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp"],
  components: {
    Navigation
  },
  data() {
    return {
      search: "",
      fechaInicio: new Date("1970-01-01").toISOString(),
      fechaFin: new Date().toISOString(),
      page: 1,
      perPage: 10,
      pages: [],
      autoridades: [],
      roles:[],
      roleFilters:[],
      roleFiltersBoolean:[],
      dismissSecs: 4,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      ErrorCountDownCreationRepeated:this.ErrorCountDownCreationRepeatedProp ? this.ErrorCountDownCreationRepeatedProp : 0,
    };
  },
  mounted() {
    this.GetAutoridades()
    this.getRoles();
  },
  computed: {
    filteredAutoridades() {
      return this.autoridades.filter(autoridad => {
        return (
          (this.roles.every((rol) => {
            return this.roleFiltersBoolean[rol.idRol - 1] ? autoridad.idRol.includes(this.roleFilters[rol.idRol - 1]) : true
          })) &&
          (autoridad.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
          autoridad.apellido.toLowerCase().includes(this.search.toLowerCase()) ||
          autoridad.dniAutoridad.toString().includes(this.search)
          ) &&
          (
            autoridad.fechaAlta >= this.fechaInicio && autoridad.fechaAlta <= this.fechaFin
          )
        );
      });
    },
    displayedAutoridades() {
      return this.paginate();
    },
  },
  methods: {
    getRoles(){
      axios.get('/api/rol').then(result =>{
        this.roles = result.data;
        this.roles.forEach(rol => {
          this.roleFiltersBoolean.push(false)
          this.roleFilters.push(rol.idRol)
        });
      })
    },
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
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  watch: {
    filteredAutoridades() {
      if(!this.fechaInicio){
        this.fechaInicio = new Date("1970-01-01").toISOString()
      }
      if(!this.fechaFin){
        this.fechaFin = new Date().toISOString()
      }
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
