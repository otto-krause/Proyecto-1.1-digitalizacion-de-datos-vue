<template>
  <div>
    <navigation/>
    <div>
      <nav class="navbar navbar-expand-xs navbar-dark border-bottom border-dark" style="background-color:#1a1a1d">
     
        <b-form-group>
          <b-form-radio-group
            id="botonesOpcion"
            v-model="tomarLista"
            :options= "[
          { text: 'Tomar Lista', value: true },
          { text: 'Modificar Asistencias', value: false }]"
            buttons
            button-variant="outline-info"
            size="lg"
            class="mt-3"
            name="radio-btn-outline"
          ></b-form-radio-group>
        </b-form-group>

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
          <div class="container-fluid row">
            <div class="col-sm-6">
              <article class="card-group-item">
                <h3 class="mt-1 mb-0" style="color:#FAFAFA">Especialidad</h3>
                <multiselect class="col-sm-7" v-model="especialidadFiltro" :options="especialidades" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Especialidad"></multiselect>
              </article>
            </div>
            
            <div class="col-sm-6">
              <article class="card-group-item" v-if="especialidadFiltro != ''">
                <h3 class="mt-1 mb-0" style="color:#FAFAFA">Año</h3>
                <multiselect class="col-sm-7" v-model="añoFiltro" :options="años" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Año"></multiselect>
              </article>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <!--Fin Segunda Barra -->

    <div v-for="(division, index) in DivisionesFiltradas" v-bind:key="index">
      <template v-if="tomarLista">
        <router-link
          :to="{ name: 'TomarAsistencia', params: {division} }" class="text-decoration-none"
        >
          <button type="button" class="btn btn-info pl-5 pr-5 my-2 btn-block">
            <span>
              <h3> {{division.año}} {{division.especialidad}} {{division.numDivision}} </h3> 
              <h4> Turno {{division.turno ? 'tarde' : 'mañana'}} </h4>
            </span>
          </button>
        </router-link>
      </template>
      
      <template v-else>
        <router-link
          :to="{ name: 'ModificarAsistencia', params: {division} }" class="text-decoration-none"
        >
          <button type="button" class="btn btn-info pl-5 pr-5 my-2 btn-block">
            <span>
              <h3> {{division.año}} {{division.especialidad}} {{division.numDivision}} </h3> 
              <h4> Turno {{division.turno ? 'tarde' : 'mañana'}} </h4>
            </span>
          </button>
        </router-link>
      </template>
      
    </div>
  </div>
</template>
<script>

import Navigation from "../Navegacion/Navigation";
import axios from "axios";
import multiselect from 'vue-multiselect';

export default {
  name: "Asistencia",
  props: ["title","message","type","timer"],
  components:
  {
    Navigation,
    multiselect,
  },
  data() {
    return {
      tomarLista:true,
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
    if(this.timer){
      this.makeToast(this.type);
    }
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
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style scoped>
.container {
  padding: 0 !important;
}
[class*="col"] {
  padding: 0 !important;
}
</style>
