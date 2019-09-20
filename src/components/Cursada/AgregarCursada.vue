<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link to="/Cursada" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Nueva acta cursada</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewCursada">
              <div class="form-group">
                  <label class="input-group-text text-center">Profesor</label>
                <div>
                  <multiselect v-model="profesorSeleccionado" :options="profesores" placeholder="Lista de Profesores" :custom-label="LabelProfesor" track-by="dniAutoridad" :searchable="true" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                </div>
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Materia</label>
                <div>
                  <multiselect v-model="materiaSeleccionada" :options="materias" placeholder="Lista de materias" :custom-label="LabelMateria" track-by="idMateria" :searchable="true" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                </div>
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Division</label>
                <div class="form-group input-group">
                  <multiselect class="col-sm-5 px-0" v-model="especialidadSeleccionada" :options="especialidades" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Especialidad"></multiselect>
                  <multiselect class="col-sm-3 px-0" :disabled= "especialidadSeleccionada ? false : true" v-model="cicloLectivoSeleccionado" :options="ciclosLectivos" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="ciclo lectivo"></multiselect>
                  <multiselect class="col-sm-2 px-0" :disabled= "cicloLectivoSeleccionado ? false : true" v-model="año" :options="optionsaño" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Año"></multiselect>
                  <multiselect class="col-sm-2 px-0" :disabled= "año ? false : true" v-model="division" :options="optionsdivision" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Division"></multiselect>
                </div>
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Puede tomar lista el profesor?</label>
                <div>
                  <select class="form-control" name="puedeTomarLista" v-model="puedeTomarLista">
                  <option value=true>Si</option>
                  <option value=false selected>No</option>
                </select>
                </div>
              </div>
              <article class="card-group-item">
                <label class="input-group-text text-center">Dia</label>
                <div class="form-group input-group">
                  <multiselect v-model="diaSeleccionado" :options="dias" track-by="value" label="name" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Dias"></multiselect>
                </div>
              </article>
              <article class="card-group-item">
                <label class="input-group-text text-center">Horario</label>
                <div class="form-group input-group">
                  <label class="input-group-text text-center">Inicio</label>
                  <input class="col-sm-4" type="time" v-model="horarioInicioString" placeholder="Horario inicio">
                  <label class="input-group-text text-center">Fin</label>
                  <input class="col-sm-4" type="time" v-model="horarioFinString" placeholder="Horario final">
                </div>
              </article>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit" >Crear acta cursada</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";

import Multiselect from 'vue-multiselect'
import axios from "axios";

export default {
  name: "AgregarCursada",
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      especialidad: '',
      año: '',
      optionsaño:[],
      division:'',
      optionsdivision:[],
      divisiones:[],
      cicloLectivoSeleccionado:'',
      ciclosLectivos:[],
      especialidadSeleccionada:'',
      especialidades:['Ciclo Basico','computacion','electronica','electricidad','construcciones','mecanica','quimica'],
      puedeTomarLista:false,
      profesorSeleccionado:'',
      profesores:[],
      materiaSeleccionada:[],
      materias:[],
      diaSeleccionado:'',
      dias:[
        {name:'lunes', value:0},
        {name:'martes', value:1},
        {name:'miercoles', value:2},
        {name:'jueves', value:3},
        {name:'viernes', value:4},
        ],
      horarioInicioString:'',
      horarioFinString:'',
      isInvalid: false
    };
  },
  created(){
    this.GetProfesores();
    this.GetMaterias();
    this.GetDivisiones()
  },
  computed: {
    filteredDivisiones() {
      return this.divisiones.filter(division => {
        return (
          (
            this.cicloLectivoSeleccionado ? division.cicloLectivo == this.cicloLectivoSeleccionado : true
          ) &&
          (
            this.año ? division.año.toString().includes(this.año) : true
          ) &&
          (
            this.division ? division.numDivision.toString().includes(this.division) : true
          ) &&
          (
            this.especialidadSeleccionada == 'computacion' ? division.especialidad == 'computacion' : true
          ) &&
          (
            this.especialidadSeleccionada == 'electronica' ? division.especialidad == 'electronica' : true
          ) &&
          (
            this.especialidadSeleccionada == 'electricidad' ? division.especialidad == 'electricidad' : true
          ) &&
          (
            this.especialidadSeleccionada == 'quimica' ? division.especialidad == 'quimica' : true
          ) &&
          (
            this.especialidadSeleccionada == 'mecanica' ? division.especialidad == 'mecanica' : true
          ) &&
          (
            this.especialidadSeleccionada == 'construcciones' ? division.especialidad == 'construcciones' : true
          ) &&
          (
            this.especialidadSeleccionada == 'Ciclo Basico' ? division.especialidad == 'Ciclo Basico' : true
          )
        );
      });
    }
  },
  methods: {
    LabelProfesor({dniAutoridad,nombre,apellido}){
      return dniAutoridad + ` - ` + nombre + ', ' + apellido;
    },
    LabelMateria({resolucion,titulo,cantHoras}){
      return titulo + ` - resolucion: ` + resolucion + ` - ` + ' horas catedra: ' + cantHoras;
    },
    validar () {
      if (!this.turnoSeleccionado){
        this.isInvalid = true
        return false
      }else
        return true
    },
    GetProfesores(){
      axios.get("/api/autoridad/profesores").then(result =>{
        this.profesores = result.data;
      })
    },
    GetMaterias() {
      axios.get("/api/materia/planmateria").then(result => {
        this.materias = result.data;
      });
    },
    GetDivisiones() {
      axios.get("/api/division/").then(result => {
        this.divisiones = result.data;
      });
    },
    filterNumDiv(){
      let numDivisiones = [];
      this.filteredDivisiones.forEach(division => {
        numDivisiones.push(division.numDivision);
      });
      let unique = [...new Set(numDivisiones)]
      this.optionsdivision = unique;
    },
    filterAño(){
      let años = [];
      this.filteredDivisiones.forEach(division => {
        años.push(division.año);
      });
      let unique = [...new Set(años)]
      this.optionsaño = unique;
    },
    filterCicloLectivo(){
      let CL = [];
      this.filteredDivisiones.forEach(division => {
        CL.push(division.cicloLectivo);
      });
      let unique = [...new Set(CL)]
      this.ciclosLectivos = unique;
    },
    async PostNewCursada() {
      await axios.post("/api/cursada/add", {
          idDivision: this.filteredDivisiones[0].idDivision,
          idMateria: this.materiaSeleccionada.idMateria,
          dniProfesor: this.profesorSeleccionado.dniAutoridad,
          tomarLista: this.puedeTomarLista == 'true',
          dia: this.diaSeleccionado.value,
          entrada: new Date().setHours(this.horarioInicioString.split(':')[0],this.horarioInicioString.split(':')[1]),
          salida: new Date().setHours(this.horarioFinString.split(':')[0],this.horarioFinString.split(':')[1])
        })
        .then(res=>{this.$router.push({ name: 'Cursada', params: {SuccessCountDownCreationProp: 4 }})})
        .catch(err=>{
          if(err.message.includes('409')){
            this.$router.push({ name: 'Cursada', params: {ErrorCountDownCreationRepeatedProp: 7 }})
          }else
            this.$router.push({ name: 'Cursada', params: {ErrorCountDownCreationProp: 6 }})
          })
    }
  },
  watch: {
    año:function (){
      this.division = '';
      this.filterNumDiv();
    },
    cicloLectivoSeleccionado:function (){
      this.año = '';
      this.filterAño();
    },
    especialidadSeleccionada:function (){
      this.cicloLectivoSeleccionado = '';
      this.filterCicloLectivo();
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
input {
  border: 1px solid #ccc;
  color: #888;
  vertical-align: middle;
  outline: 0;
  padding: 0.5em 1em;
  border-radius: 4px;
  width: calc(100% - 3em - 2px);
  font-family: sans-serif;
}
</style>
