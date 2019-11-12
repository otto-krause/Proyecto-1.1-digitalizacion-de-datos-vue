<template>
  <div>
    <navigation/>
    <div>
      <nav class="navbar navbar-expand-xs navbar-dark border-bottom border-dark" style="background-color:#1a1a1d">
        <a class="navbar-brand" href="#">Tomar Lista</a>
        <button
          class="btn btn-info"
          type="button"
          data-toggle="collapse"
          data-target="#Filtros"
          aria-controls="Filtros"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="Filtros">
          <article class="card-group-item">
            <header class="card-title">
              <h3 class="mt-1 mb-0" style="color:#FAFAFA">Especialidad</h3>
            </header>
            <div class="card-body">
              <div class="form-row">
                <div class="form-group col-sm-8">
                  <article class="card-group-item">
                    <multiselect class="col-sm-7" v-model="especialidadFiltro" :options="especialidades" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Especialidad"></multiselect>
                  </article>
                </div>
              </div>
            </div>
          </article>
          <article class="card-group-item" v-if="especialidadFiltro != ''">
            <header class="card-title">
              <h3 class="mt-1 mb-0" style="color:#FAFAFA">Año</h3>
            </header>
            <div class="card-body">
              <div class="form-row">
                <div class="form-group col-sm-8">
                  <article class="card-group-item">
                    <multiselect class="col-sm-7" v-model="añoFiltro" :options="años" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Año"></multiselect>
                  </article>
                </div>
              </div>
            </div>
          </article>
        </div>
      </nav>
    </div>
    <!--Fin Segunda Barra -->

    <div class="container-fluid">
      <h1> Nombre y Apellido </h1>
      <h2> DNI y algo más </h2>
      <h3>uwu</h3>
      <div class="btn-group-vertical" role="group" id="'radiosAsistencia'+1" aria-label="Alumno">
        <button type="button" class="btn btn-secondary btn-block" value="P">Presente</button>
        <button type="button" class="btn btn-secondary btn-block" value="A">Ausente</button>
        <button type="button" class="btn btn-secondary btn-block" value="AJ">Ausente Justificadoo</button>
      </div>
    </div>
  </div>
</template>
<script>

import Navigation from "../Navegacion/Navigation";
import axios from "axios";
import multiselect from 'vue-multiselect';

export default {
  props:["division"],
  components:
  {
    Navigation,
    multiselect,
  },
  name: "TomarAsistencia",
  data() {
    return {
      turno:"",
      semanaActual:{},
      Semana:[],
      fecha: "",
      asistencia: [],
      alumnos: [],
      opcionesBotonesAsistencia: [
        { text: "Presente" },
        { text: "Tarde" },
        { text: "Ausente con Permanencia" },
        { text: "Ausente" },
        { text: "Ausente Justificado" }
      ]
    };
  },
  computed:{
  },
  mounted() {
    this.ObtenerAlumnos();
  },
  watch:{
    especialidadFiltro: function(){
      if(this.especialidadFiltro == 'Ciclo Básico'){
        this.añoSeleccionado = 1;
        this.años = [1,2];
      }else{
        this.añoSeleccionado = 3;
        this.años = [3,4,5,6];
      }
    }
  },
  methods: {
    MostrarAlgo(algo)
    {
      console.log(algo);
    },
    PostAsistencia() {
      this.Semana.forEach(semanaActual =>
      {
        if(semanaActual.valor == this.turno)
        {
          this.semanaActual = semanaActual;
        }
      })
      this.Asistencia.forEach(asistenciaActual => {
        asistenciaActual.fecha = this.fecha;
        asistenciaActual.idSemana = this.semanaActual.idSemana;
      });
      console.log(JSON.stringify(this.Asistencia));
      this.exito = true;
    },
    ObtenerTurnos(division, diaSemana)
    {
      axios.get("api/asistencia/ObtenerSemSistencia/" + division + "/" + diaSemana)
      .then(response =>{
        this.Semana = response.data;
      });
    },
    ObtenerAlumnos()
    {
      axios.get("api/alumno/HistorialDivision/" + this.division.idDivision)
      .then(response => 
      {
        this.alumnos = response.data;
      });
    },
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style>

</style>
