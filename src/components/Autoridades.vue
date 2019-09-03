<template>
  <div>
    <navigation />
    <div class="container-fluid">
      <b-alert
          :show="SuccessCountDownEdit"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownEdit =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La autoridad se modifico correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownEdit"
          dismissible
          variant="warning"
          @dismissed="ErrorCountDownEdit =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>La autoridad no pudo ser modificada</p>
        </b-alert>
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
                <h6 class="card-title">Fecha Ingreso</h6>
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
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Autoridades</h1>
            <router-link :to="{ name: 'AgregarAutoridad' }" class="btn btn-info" v-if="ThereAreRoles">Crear autoridad</router-link>
            <button class="btn btn-info" v-if="!ThereAreRoles" v-on:click="ErrorCountDownRol = 6">Crear autoridad</button>
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
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp","SuccessCountDownEditProp","ErrorCountDownEditProp"],
  components: {
    Navigation
  },
  data() {
    return {
      search: "",
      fechaInicio: new Date("1984-01-01").toISOString(),
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
      SuccessCountDownEdit:this.SuccessCountDownEditProp ? this.SuccessCountDownEditProp : 0,
      ErrorCountDownEdit:this.ErrorCountDownEditProp ? this.ErrorCountDownEditProp : 0,
      ErrorCountDownRol:0,
      ThereAreRoles:false
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
            autoridad.fechaIngreso >= this.fechaInicio && autoridad.fechaIngreso <= this.fechaFin
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
        if(result.data != 0){
          this.ThereAreRoles = true
          this.roles = result.data;
          this.roles.forEach(rol => {
            this.roleFiltersBoolean.push(false)
            this.roleFilters.push(rol.idRol)
          });
        }
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
        this.fechaInicio = new Date("1984-01-01").toISOString()
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
