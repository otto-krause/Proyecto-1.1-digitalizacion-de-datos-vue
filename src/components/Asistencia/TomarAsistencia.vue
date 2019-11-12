<template>
  <div>
    <navigation/>
    <div>
      <nav class="navbar navbar-expand-xs navbar-dark border-bottom border-dark" style="background-color:#1a1a1d">
        <h3 style="color:white">Control de Asistencia</h3>
        <b-input @change="ObtenerTurnos" type="date" v-model="fecha"></b-input>
        <multiselect class="mt-4" v-model="turno" :options="opcionesTurno" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Turno" v-if="fecha != ''"></multiselect>

      </nav>
    </div>
    <!--Fin Segunda Barra -->
    <div id="AlumnosCarousel" class="carousel slide" data-interval="false">
      
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
        
        
        <div class="container-fluid">

          <div class="carousel-item active">
              <div class="card text-center mt-4 mx-3">
                <div class="card-body">
                  <h1> {{division.año}} {{division.especialidad}} {{division.numDivision}} </h1>
                  <br/>
                  <h2>DNI Preceptor: {{division.dniPreceptor}} </h2>
                  <button type="button" class="btn mt-5 pt-5 pb-5 pl-5 pr-5 btn-info" @click="PostAsistencia" v-if="turno != ''"> <h1>Enviar Asistencia</h1></button>
                </div>
              </div>

          </div>

          <!--Card alumno que tiene v-for -->
          <div class="carousel-item" v-for="(alumno, index) in alumnos" v-bind:key="index">

            <div class="card text-center mt-4 mx-3">
              <div class="card-body">
                <h1> {{alumno.nombre}}  </h1>
                <h1> {{alumno.apellido}}  </h1>
                <br/>
                <h2> DNI: {{Asistencia[index].dniAlumno = alumno.dniAlumno}} </h2>
                <br/>
                <b-form-group>
                  <b-form-radio-group
                    id="'radiosAsistencia'+ index"
                    v-model="Asistencia[index].valor"
                    buttons
                    stacked
                    :options="Opciones"
                    size="lg"
                    class="px-0 mt-3"
                    name="'radios'+data.index"
                  ></b-form-radio-group>
                </b-form-group>
              </div>
            </div>
          
          </div>
          <!--fin Card alumno que tiene v-for -->
        
        </div>
        <!--Fin div fluido -->
  
      </div>
      <!-- Items del ccarusel fin -->

      <!-- Indicadores carusle -->
      <ol class="carousel-indicators">
        <div v-for="(alumno, index) in alumnos" v-bind:key="index">
          <li data-target="#AlumnosCarousel" data-slide-to=index class="active"></li>
        </div>
      </ol>
      <!-- Fin indicadores causelseee -->    

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
      fecha:"",
      turno:"",
      opcionesTurno:[], 
      idSemana:'',
      Semana:[], //Acá se guardan la info de la "Semana" (De acá se saca el idSemana y los turnos)
      fecha: "",
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
  },
  mounted() {
    if (!this.division) {
      this.$router.push({ name: "Asistencia" });
    }
    this.ObtenerAlumnos();
  },
  methods: {
    async PostAsistencia() {
      let algoVacio = false;
      this.Semana.forEach(semanaActual =>
      {
        if(semanaActual.turno == this.turno)
        {
          this.idSemana = semanaActual.idSemana;
        }
      })

      this.Asistencia.forEach(asistenciaActual => {
        asistenciaActual.fecha = this.fecha;
        asistenciaActual.idSemana = this.idSemana;
      });
      var asistencias = [];

      this.Asistencia.forEach(asistenciaActual=>
      {
        asistencias.push([asistenciaActual.dniAlumno,asistenciaActual.fecha,asistenciaActual.idSemana,asistenciaActual.valor]);
      })

      this.Asistencia.forEach(asistenciaActual=>
      {
        if(asistenciaActual.valor == '')
        {
          algoVacio = true;
        }
      })
      
      if(algoVacio)
      {
        this.makeToast('Error',6,'danger',"La asistencia no ha podido ser tomada. Faltan asignar valores.");
      }
      else
      {
        await axios.post("/api/asistencia/add", asistencias)
        .then(res=>{this.$router.push({ name: 'Asistencia', params: {title:"Asistencia tomada",timer: 4,type:"success",message:"La asistencia ha sido tomada correctamente"}})})
          .catch(err=>
          {
            if(err.message.includes('409'))
            {
              this.makeToast('Asistencia existente',6,'warning',"(Asistencia Repetida) - Ya se tomó asistencia en esta fecha y turno. Para actualizar una asistencia, seleccione la opción actualizar desde el menú.");
            }
            else
            {
              this.makeToast('Error',6,'danger',"La asistencia no ha podido ser tomada. Posiblemente haya un problema con los datos ingresados");
            }
          })
      }
    },
    ObtenerTurnos()
    {
      this.opcionesTurno = [];
      this.turno =  '';
      axios.get("/api/asistencia/turnos/" + this.division.idDivision + "/" + this.fecha)
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
    GenerarVacias(largo) {
      this.Asistencia = [];
      for (var i = 0; i < largo; i++) {
        this.Asistencia.push({
          valor: "",
          dniAlumno: "",
          fecha: "",
          idSemana:""
        });
      }
    },
    ObtenerAlumnos()
    {
      axios.get("api/alumno/HistorialDivision/" + this.division.idDivision)
      .then(response => 
      {
        this.alumnos = response.data;
        this.GenerarVacias(this.alumnos.length);
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
