<template>
  <div>
    <navigation />
    <div class="container-fluid">
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El alumno se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El alumno no ha podido ser creado. Posiblemente haya un problema con los datos ingresados</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El alumno ha sido eliminado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El alumno no ha podido ser eliminado</p>
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
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Alumnos</h1>
            <router-link :to="{ name: 'AgregarAlumno' }" class="btn btn-info">Crear alumno</router-link>
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
            <tbody v-for="alumno in displayedAlumnos" :key="alumno.dniAlumno">
              <tr>
                <th scope="col">{{alumno.dniAlumno}}</th>
                <th scope="col">{{alumno.nombre}}</th>
                <th scope="col">{{alumno.apellido}}</th>
                <th scope="col">{{alumno.telefono}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'AlumnoCompleto', params: {alumno} }"
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
import Navigation from "../Navegacion/Navigation";

import axios from "axios";

export default {
  name: "Alumnos",
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp"],
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
      alumnos: [],
      dismissSecs: 4,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      ThereAreRoles:false
    };
  },
  mounted() {
    this.GetAlumnos()
  },
  computed: {
    filteredAlumnos() {
      return this.alumnos.filter(alumno => {
        return (
          (alumno.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
          alumno.apellido.toLowerCase().includes(this.search.toLowerCase()) ||
          alumno.dniAlumno.toString().includes(this.search)
          ) &&
          (
            alumno.fechaIngreso >= this.fechaInicio && alumno.fechaIngreso <= this.fechaFin
          )
        );
      });
    },
    displayedAlumnos() {
      return this.paginate();
    },
  },
  methods: {
    GetAlumnos() {
      axios.get("/api/alumno").then(result => {
        this.alumnos = result.data;
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredAlumnos.slice(from, to);
    },
    setAlumnos() {
      let numberOfAlumnos = Math.ceil(
        this.filteredAlumnos.length / this.perPage
      );
      this.pages = [];
      for (let i = 1; i <= numberOfAlumnos; i++) {
        this.pages.push(i);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  },
  watch: {
    filteredAlumnos() {
      if(!this.fechaInicio){
        this.fechaInicio = new Date("1970-01-01").toISOString()
      }
      if(!this.fechaFin){
        this.fechaFin = new Date().toISOString()
      }
      this.page = 1;
      this.setAlumnos();
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
