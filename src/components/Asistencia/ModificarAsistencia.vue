<template>
  <div>
    <navigation/>
    <div>
      <nav class="navbar navbar-expand-xs navbar-dark border-bottom border-dark" style="background-color:#1a1a1d">
        <h3 style="color:white">Control de Asistencia</h3>
        <b-input @change="ObtenerTurnos" type="date" v-model="fechaFiltro"></b-input>
        <multiselect class="mt-4" v-model="turno" :options="opcionesTurno" :searchable="false" :close-on-select="true" @input="ObtenerAsistencia" :show-labels="false" placeholder="Turno" v-if="fechaFiltro != ''"></multiselect>

      </nav>
    </div>
    <!--Fin Segunda Barra -->

    <div id="AlumnosCarousel" class="carousel slide" data-interval="false" v-if="turno != ''">
      
      <!-- Controles Carusel -->
      <div class="controls-top">
        <a class="carousel-control-prev" href="#AlumnosCarousel" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#AlumnosCarousel" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
      <!-- Controles del carules fin -->

      <div class="carousel-inner">

        <div class="carousel-item active">
          <div class="card container-fluid text-center mt-4 mr-4">
            <div class="card-body">
              <h1> {{division.año}} {{division.especialidad}} {{division.numDivision}} </h1>
              <br/>
              <h2>DNI Preceptor: {{division.dniPreceptor}} </h2>
              <button type="button" class="btn mt-5 pt-5 pb-5 pl-5 pr-5 btn-info" @click="UpdateAsistencia" v-if="turno != ''"> <h1>Actualizar Asistencia</h1></button>
            </div>
          </div>

        </div>

        <div class="carousel-item" v-for="(asist, index) in Asistencia" v-bind:key="index">

          <!--Card alumno -->

          <div class="card container-fluid text-center mt-4 mr-4" style="width:50% max-width: 18rem">
            <div class="card-body">
              <h1> {{asist.Nombre}}  </h1>
              <br/>
              <h2> DNI: {{asist.DNI}} </h2>
              <br/>
              <b-form-group>
                <b-form-radio-group
                  id="'radiosAsistencia'+ index"
                  v-model="Asistencia[index].Valor"
                  buttons
                  stacked
                  container="fluid"
                  :options="Opciones"
                  size="lg"
                  name="'radios'+data.index"
                ></b-form-radio-group>
              </b-form-group>
            </div>
          </div>
          
          <!--Fin card alumno -->

        </div>
  
      </div>
      <!-- Items del ccarusel fin -->
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
  name: "ModificarAsistencia",
  data() {
    return {
      turno:"",
      opcionesTurno:[], 
      idSemana:'',
      Semana:[], //Acá se guardan la info de la "Semana" (De acá se saca el idSemana y los turnos)
      fechaFiltro: "",
      Asistencia: [], //Asistencia tiene valor (A,P,T, etc), fecha, idSemana y dniAlumno 
      alumnos: [],
      Opciones: [
        { text: "PRESENTE", value:"P"},
        { text: "TARDE", value:"T"},
        { text: "AUSENTE CON PERMANENCIA", value:"AP"},
        { text: "AUSENTE", value:"A"},
        { text: "AUSENTE JUSTIFICADO", value:"AJ"}
      ],
      
    };
  },
  computed:{
    AsistenciaFiltrada: function()
    {
      return this.Asistencia.filter(asustencia=>
      {
        return( asustencia.idSemana == this.idSemana)
      })
    },
  },
  mounted() {
    if (!this.division) {
      this.$router.push({ name: "Asistencia" });
    }
  },
  methods: {
    ObtenerAsistencia()
    {
      axios.get("/api/asistencia/" + this.division.idDivision + "/" + this.fechaFiltro)
      .then(result =>
      {
        this.Asistencia = result.data;
        this.Semana.forEach(semanaActual =>
        {
          if(semanaActual.turno == this.turno)
          {
            this.idSemana = semanaActual.idSemana;
          }
        })
        this.Asistencia = this.AsistenciaFiltrada();
      })
    },
    async UpdateAsistencia() {

      var asistencias= [];
      
      this.Asistencia.forEach(asistenciaActual=>
      {
        asistencias.push([asistenciaActual.idAsistencia,asistenciaActual.Valor]);
      })
      asistencias.forEach(
        asist=>
        {
          axios.post("/api/asistencia/update", asist)
          .then(res=>{this.$router.push({ name: 'Asistencia', params: {title:"Asistencia Modificada",timer: 4,type:"success",message:"La asistencia ha sido modificada correctamente"}})})
          .catch(err=>
          {
            this.makeToast('Error',6,'danger',"La asistencia no ha podido ser modificada. Posiblemente haya un problema con los datos ingresados");
          })
        }
      )
    },
    ObtenerTurnos()
    {
      this.opcionesTurno = [];
      this.turno =  '';
      axios.get("/api/asistencia/turnos/" + this.division.idDivision + "/" + this.fechaFiltro)
      .then(response =>{
        response.data.forEach(
          turno=>
          {
            this.opcionesTurno.push(turno.turno);
          }
        )
        this.Semana = response.data;
      });
    },
    makeToast(title,timer,variant = null,message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
        toaster: "b-toaster-top-left",
        autoHideDelay:timer * 1000,
        appendToast: true
      })
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style>
  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23333' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
  }

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23333' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E");
  }
  .carousel-control .glyphicon-chevron-right, .carousel-control .icon-next {
    right: 0;
  }

  .carousel-control .glyphicon-chevron-left, .carousel-control .icon-prev {
    left: 0; 
  }
</style>
