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
            <h4 class="card-title text-center mb-4">Historial de Altas del alumno <br>Nombre: {{alumno.nombre}}, Apellido: {{alumno.apellido}} <br>DNI:{{alumno.dni}}</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">INDEX</th>
                    <th scope="col">fecha Alta</th>
                    <th scope="col">fecha Baja</th>
                  </tr>
                </thead>
                <tbody v-for="(historial,index) in historialAlumno" :key="historial.idFecha">
                  <tr>
                    <th scope="col">{{index}}</th>
                    <th scope="col">{{historial.fechaAlta != '1970-01-01T03:00:00.000Z' && historial.fechaAlta != null ? historial.fechaAlta.slice(0,10) : ' - '}}</th>
                    <th scope="col">{{historial.fechaBaja != '1970-01-01T03:00:00.000Z' && historial.fechaBaja != null ? historial.fechaBaja.slice(0,10) : ' - '}}</th>
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
  name: "HistorialAlumno",
  props:["alumno"],
  components: {
    Navigation
  },
  data() {
    return {
      historialAlumno: [],
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
      axios.get("/api/alumno/historial/" + this.alumno.dniAlumno)
        .then(result => {
          this.historialAlumno = result.data;
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
