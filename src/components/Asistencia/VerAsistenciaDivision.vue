<template>
  <div>
    <navigation/>
    <div>
      <nav class="navbar navbar-expand-xs navbar-dark border-bottom border-dark" style="background-color:#1a1a1d">
        <a class="navbar-brand" href="#">Ver Asistencia Division</a>
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
          <div class="row">

            <!--Inicio multiselect especialidad-->
            <article class="card-group-item col-sm-8">
              <h4 class="mt-0 mb-0" style="color:#FAFAFA">Especialidad</h4>
              <multiselect v-model="especialidadFiltro" :options="especialidades" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Especialidad"></multiselect>
            </article>
            <!--Fin multiselect especialidad-->

            <!--Inicio multiselect año-->
            <article class="card-group-item col-sm-3" v-if="especialidadFiltro != ''">
              <h4 class="mt-0 mb-0" style="color:#FAFAFA">Año</h4>
              <multiselect v-model="añoFiltro" :options="años" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Año"></multiselect>
            </article>
            <!--Fin multiselect Año-->

            <!--Inicio multiselect numDivision-->
            <article class="card-group-item col-sm-3" v-if="añoFiltro != ''">
              <h3 class="mt-1 mb-0" style="color:#FAFAFA">Numero Division</h3>
              <multiselect v-model="numDivFiltro" :options="numDivOpciones" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Division"></multiselect>
            </article>
            <!-- -->

            <!--Inicio select fecha-->
            <article class="card-group-item col-sm-3" v-if="numDivFiltro != ''">
              <h3 class="mt-1 mb-0" style="color:#FAFAFA">Fecha</h3>
              <b-input type="date" v-model="fechaFiltro"  @change="ObtenerTurnos"> </b-input>
            </article>
            <!-- --> 

            <!--Inicio select turno-->
            <article class="card-group-item col-sm-3" v-if="numDivFiltro != ''">
              <h3 class="mt-1 mb-0" style="color:#FAFAFA">Turno</h3>
              <multiselect v-model="turno" :options="opcionesTurno" :searchable="false" :close-on-select="true" @input="ObtenerAsistencia" :show-labels="false" placeholder="Turno"></multiselect>
            </article>
            <!--Fin Select Turno --> 

          </div>
        </div>
      </nav>
    </div>

    <table class="table">
            <thead>
              <tr>
                <th scope="col">DNI</th>
                <th scope="col">Nombre</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody v-for="(asistencia, index) in AsistenciaFiltrada" v-bind:key="index">
              <tr>
                <th scope="col">{{asistencia.DNI}}</th>
                <th scope="col">{{asistencia.Nombre}} {{asistencia.Apellido}}</th>
                <th scope="col">{{asistencia.Valor}}</th>
              </tr>
            </tbody>
          </table>

    
    
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";
import Multiselect from 'vue-multiselect';
import axios from 'axios';

export default {
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      turno:"",
      opcionesTurno:[],
      divisiones:[],
      especialidades:['Computación', 'Electrónica', 'Eléctrica', 'Mecánica', 'Química', 'Construcciones', 'Ciclo Básico'],
      especialidadFiltro:'',
      fechaFiltro: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
      años:['1','2','3','4','5','6'],
      numDivOpciones:[],
      numDivFiltro:'',
      añoFiltro:'',
      divisionFiltro: '',
      Asistencia: [{division:'',Fecha:''},],
      Alumnos: [
        {
          valor: "P",
          nombre: "NombreAlumno",
          apellido: "ApellidoAlumno",
          dniAlumno: "6546546556",
          fecha: "2019-10-11",
        }
      ]
    };
  },
  mounted() {
    this.ObtenerDivisiones();
  },
  computed: {
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
    largoFDF: function() {
      return this.AsistenciaFiltrada.length;
    },
    AsistenciaFiltrada: function()
    {
      return this.Asistencia.filter(asustencia=>
      {
        return(asustencia.Fecha.includes(this.fechaFiltro))
      })
    },
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
    },
    añoFiltro: function()
    {
      this.numDivOpciones = [];
      this.DivisionesFiltradas.forEach(div=>
      {
        this.numDivOpciones.push(div.numDivision);
      });
    }
  },
  methods: {
    ObtenerTurnos()
    {
      this.opcionesTurno = [];
      var idDiv = this.DivisionesFiltradas[0].idDivision;

      axios.get("/api/asistencia/turnos/" + idDiv + "/" + this.fechaFiltro)
      .then(response =>{
        response.data.forEach(
          turno=>
          {
            this.opcionesTurno.push(turno.turno);
          }
        )
      });
    },
    ObtenerAsistencia()
    {
      this.ObtenerTurnos();
      var idDiv = '';
      this.divisiones.forEach(div=>
      {
        if(div.año == this.añoFiltro && div.especialidad == this.especialidadFiltro && div.numDivision == this.numDivFiltro)
        {
          idDiv = div.idDivision;
        }
      })
      axios.get("/api/asistencia/" + idDiv)
      .then(result =>
      {
        this.Asistencia = result.data;
        this.Asistencia.forEach(asist=>
        {
          if (asist.Valor == 'P')
          {
            asist.Valor = 'Presente'
          }
          if (asist.Valor == 'A')
          {
            asist.Valor = 'Ausente'
          }
          if (asist.Valor == 'AJ')
          {
            asist.Valor = 'Ausente Justificado'
          }
          if (asist.Valor == 'AP')
          {
            asist.Valor = 'Ausente con Permanencia'
          }
          if (asist.Valor == 'T')
          {
            asist.Valor = 'Tarde'
          }
        })
      })

      
    },
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
