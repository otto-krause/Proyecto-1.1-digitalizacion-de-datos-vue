<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-light" style="background-color:#1a1a1d">
        <router-link :to="{ name: 'AlumnoCompleto',params: {alumno} }" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="row">
      <div class="col-md-9 col-lg-6 mx-auto mt-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-center mb-4">Divisiones en las que perteneció/pertenece el alumno:<p><br>{{alumno.nombre}} {{alumno.apellido}} <br>DNI: {{alumno.dniAlumno}}</p></h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Ciclo lectivo</th>
                    <th scope="col">Especialidad</th>
                    <th scope="col">Año</th>
                    <th scope="col">División</th>
                  </tr>
                </thead>
                <tbody v-for="historial in historialAlumnoDivision" :key="historial.idFecha">
                  <tr>
                    <th scope="col">{{historial.cicloLectivo}}</th>
                    <th scope="col">{{historial.especialidad}}</th>
                    <th scope="col">{{historial.año}}</th>
                    <th scope="col">{{historial.numDivision}}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";
import axios from "axios";

export default {
  name: "HistorialAlumnoDivision",
  props:["alumno"],
  components: {
    Navigation
  },
  data() {
    return {
      historialAlumnoDivision: [],
    };
  },
  mounted() {
    if (!this.alumno) {
      this.$router.push({ name: "Alumnos" });
    }
    this.GetHistorial();
  },
  methods: {
    GetHistorial() {
      axios.get("/api/alumno/HistorialDivision/" + this.alumno.dniAlumno)
        .then(result => {
          this.historialAlumnoDivision = result.data;
        });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0 !important;
}
[class*="container-fluid"] {
  padding: 0 !important;
}
</style>
