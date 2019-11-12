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
    <h1>Seleccione una división para tomar lista</h1>

    <div v-for="(division, index) in DivisionesFiltradas" v-bind:key="index" class="container-fluid">
      <router-link
        :to="{ name: 'TomarAsistencia', params: {division} }"
      >
        <button type="button" class="btn btn-danger pl-5 pr-5 my-2 btn-block">
          <span>
            <h3> {{division.año}} {{division.especialidad}} {{division.numDivision}} </h3> 
            <h4> Turno {{division.turno ? 'tarde' : 'mañana'}} </h4>
          </span>
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>

import Navigation from "../Navegacion/Navigation";
import axios from "axios";
import multiselect from 'vue-multiselect';

export default {
  components:
  {
    Navigation,
    multiselect,
  },
  name: "TomarLista",
  data() {
    return {
      divisiones:[],
      especialidades:['Computación', 'Electrónica', 'Eléctrica', 'Mecánica', 'Química', 'Construcciones', 'Ciclo Básico'],
      especialidadFiltro:'',
      años:['1','2','3','4','5','6'],
      añoFiltro:'',
    };
  },
  computed:{
    DivisionesFiltradas: function() {
      return this.divisiones.filter(division => {
        return (
          (
            division.especialidad.toString().includes(this.especialidadFiltro)
          ) &&
          (
            this.añoFiltro != false ? division.año == this.añoFiltro : true
          )
        );
      });
    },
  },
  mounted() {
    this.ObtenerDivisiones();
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
    ObtenerDivisiones() {
      axios.get("/api/division/").then(result => {
        this.divisiones = result.data;
      });
    },
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style>

</style>
