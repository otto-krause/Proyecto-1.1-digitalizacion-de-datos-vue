<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name: 'CursadaCompleta', params:{cursada}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar cursada</h3>
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
                  <label class="input-group-text text-center">División</label>
                <div class="form-group input-group">
                  <multiselect class="col-sm-5 px-0" v-model="especialidadSeleccionada" :options="especialidades" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Especialidad"></multiselect>
                  <multiselect class="col-sm-3 px-0" :disabled= "especialidadSeleccionada ? false : true" v-model="cicloLectivoSeleccionado" :options="ciclosLectivos" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="ciclo lectivo"></multiselect>
                  <multiselect class="col-sm-2 px-0" :disabled= "cicloLectivoSeleccionado ? false : true" v-model="año" :options="optionsaño" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Año"></multiselect>
                  <multiselect class="col-sm-2 px-0" :disabled= "año ? false : true" v-model="division" :options="optionsdivision" :searchable="false" :close-on-select="true" :show-labels="false" placeholder="Division"></multiselect>
                </div>
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">¿Puede tomar lista el profesor?</label>
                <div>
                  <select class="form-control" name="puedeTomarLista" v-model="puedeTomarLista">
                  <option value=true>Sí</option>
                  <option value=false selected>No</option>
                </select>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit" >Guardar cambios</button>
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
  name: "EditarCursada",
  props: ["cursada"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      año: this.cursada.año,
      optionsaño:[],
      division:this.cursada.numDivision,
      optionsdivision:[],
      divisiones:[],
      cicloLectivoSeleccionado:this.cursada.cicloLectivo,
      ciclosLectivos:[],
      especialidadSeleccionada: this.cursada.especialidad,
      especialidades:['Ciclo Básico','Computación','Electrónica','Electricidad','Construcciones','Mecánica','Química'],
      puedeTomarLista:this.cursada.tomarLista ? true : false,
      profesorSeleccionado:[],
      profesores:[],
      materiaSeleccionada:[],
      materias:[],
      isInvalid: false
    };
  },
  mounted() {
    if(!this.cursada){
      this.$router.push({ name: 'Cursada'})
    }
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
            this.especialidadSeleccionada == 'Computación' ? division.especialidad == 'Computación' : true
          ) &&
          (
            this.especialidadSeleccionada == 'Electrónica' ? division.especialidad == 'Electrónica' : true
          ) &&
          (
            this.especialidadSeleccionada == 'Electricidad' ? division.especialidad == 'Electricidad' : true
          ) &&
          (
            this.especialidadSeleccionada == 'Química' ? division.especialidad == 'Química' : true
          ) &&
          (
            this.especialidadSeleccionada == 'Mecánica' ? division.especialidad == 'Mecánica' : true
          ) &&
          (
            this.especialidadSeleccionada == 'Construcciones' ? division.especialidad == 'Construcciones' : true
          ) &&
          (
            this.especialidadSeleccionada == 'Ciclo Básico' ? division.especialidad == 'Ciclo Básico' : true
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
      if (!this.turno){
        this.isInvalid = true
        return false
      }else
        return true
    },
    GetProfesores(){
      axios.get("/api/autoridad/profesores").then(result =>{
        this.profesores = result.data;
        this.profesorSeleccionado = this.profesores.find(profesor =>{
          return profesor.dniAutoridad == this.cursada.dniProfesor;
        })

      })
    },
    GetMaterias() {
      axios.get("/api/materia/planmateria").then(result => {
        this.materias = result.data;
        this.materiaSeleccionada = this.materias.find(materia =>{
          return materia.idMateria == this.cursada.idMateria;
        });
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
      await axios.post("/api/cursada/update", {
        idCursada:this.cursada.idCursada,
        idDivision: this.filteredDivisiones[0].idDivision,
        idMateria: this.materiaSeleccionada.idMateria,
        dniProfesor: this.profesorSeleccionado.dniAutoridad,
        tomarLista: this.puedeTomarLista == 'true',
        })
        .then(async(res)=>{
          await axios.get("/api/cursada/completa/" + this.cursada.idCursada)
          .then((res)=>{
            this.$router.push({ name: 'CursadaCompleta', params: {cursada:res.data[0], title:"Cursada editada",timer: 5,type:"success",message:"La cursada se modifico correctamente" }})
          })
        })
        .catch(err=>{this.$router.push({ name: 'CursadaCompleta', params: {cursada:this.cursada, title:"Error",timer: 6,type:"danger",message:"El acta de cursada no pudo ser modificada" }})})
    },
    onTouch () {
      this.isTouched = true
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
.container {
  padding: 0 !important;
}
[class*="container-fluid"] {
  padding: 0 !important;
}
</style>
