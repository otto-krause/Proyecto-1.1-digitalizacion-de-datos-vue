<template>
  <div>
    <b-form @submit.prevent="PostAsistencia">
      <h1 v-if="!division">Seleccione un curso</h1>
      <h1 v-if="division && !fecha">Seleccione una fecha</h1>
      <h1 v-if="division && fecha && !turno">Seleccione un turno</h1>
      <h1 v-if="division && fecha && turno">Tome asistencia </h1>
      <b-alert v-show="exito" show variant="success">¡Se tomó lista con éxito!</b-alert>
      <b-row>
        <b-col>
          <article class="card-group-item">
           <multiselect @change="ObtenerAlumnos(division)" class="col-sm-7" v-model="division" :options="divisiones" :disabled= "divisiones ? false : true" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Divisiones"></multiselect>
          </article>
        </b-col>

        <!--<b-col>
          <b-dropdown right text="División">
            <b-dd-item v-for="(Curso, index) in Cursos" v-bind:key="index">
              <b-button block variant="dark" @click="ObtenerAlumnos(Curso.idDivision)">{{Curso.Division}}</b-button>
            </b-dd-item>
          </b-dropdown>
        </b-col>
        <article class="card-group-item">
          <multiselect class="col-sm-7" v-model="division" :options="divisiones" :disabled= "divisiones ? false : true" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Divisiones"></multiselect>
        </article>
        
        ObtenerTurnos(Cursos[0].idDivision,fecha)
         -->

        <b-col>
          <b-input type="date" v-model="fecha"></b-input>
        </b-col>

        <b-col>
          <b-dropdown right v-model="turno" text="Turno">
            <b-dd-item v-for="(Turno, index) in Semana" v-bind:key="index">
              <b-button block variant="dark">{{Turno.turno}}</b-button>
            </b-dd-item>
          </b-dropdown>               
        </b-col>

      </b-row>
      <br>  
        <b-table class="table mx-6" :items="AlumnosFiltrados" :fields="[ { key: 'dniAlumno', label: 'DNI' }, 'Nombre', 'Apellido', 'Asistencia']">
          <template v-slot:cell(Asistencia)="data">
            <b-form-group>
              <b-form-radio-group
                id="'radios'+data.index"
                v-model="Asistencia[data.index].valor"
                buttons
                container="fluid"
                :options="Opciones"
                name="'radios'+data.index"
              ></b-form-radio-group>
            </b-form-group>
          </template>
        </b-table> 
      <b-button type="submit">Enter</b-button>
    </b-form>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios';
import multiselect from 'vue-multiselect'
export default {
  components:
  {
    multiselect
  },
  name: "TomarLista",
  data() {
    return {
      turno:"",
      division:"",
      divisiones:[],
      exito: false,
      semanaActual:{},
      Semana:[],
      fecha: "",
      Asistencia: [],
      Alumnos: [],
      Opciones: [
        { text: "Presente" },
        { text: "Tarde" },
        { text: "Ausente con Permanencia" },
        { text: "Ausente" },
        { text: "Ausente Justificado" }
      ],
      Cursos: {}
    };
  },
  computed:{
    AlumnosFiltrados: function() {
      return this.Alumnos.filter(alumno => {
        return (
          alumno.Division.includes(this.division)
        );
      });
    },
  },
  mounted() {
    this.ObtenerCursos();
    this.ObtenerAlumnos();
  },
  methods: {
    MostrarAlgo(algo)
    {
      console.log(algo);
    },
    GenerarVacias(largo) {
      this.Asistencia = [];
      console.log("Se intentó limpiar el array de Asistencia ");
      console.log(largo);
      for (var i = 0; i < largo; i++) {
        this.Asistencia.push({
          valor: "",
          dniAlumno: "",
          fecha: "",
          idSemana:""
        });
      }
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
      axios.get("http://localhost:3001/ObtenerSemSistencia/" + division + "/" + diaSemana)
      .then(response =>{
          this.Semana = response.data;
      });
    },
    ObtenerAlumnos() {
      console.log("Intentando obtener alumnos");
      axios.get("http://localhost:3001/ListaAlumnos/")
        .then(response => {
          this.Alumnos = response.data;
          this.GenerarVacias(this.Alumnos.length);
        })
        .catch(function (error) {
        {
          console.log("FRACASÉ");
          console.log(error);
        }
      });
    },
    ObtenerCursos() {
      axios.get("http://localhost:3001/ObtenerCursos/").then(response => {
        this.Cursos = response.data;
        this.divisiones = [];
        this.Cursos.forEach(curso =>
        {
          this.divisiones.push(curso.Division);
        })
      });
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style>
</style>