<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link :to="{ name: 'DivisionCompleta', params:{division}}" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Editar division</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewDivision">
              <div class="form-group">
                <label class="input-group-text text-center">Especialidades</label>
                <div>
                  <multiselect v-model="especialidadSeleccionada" placeholder="Lista de especialidades" :searchable="true" :options="especialidades" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                </div>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Año</label>
                </div>
                <multiselect :disabled= "especialidadSeleccionada ? false : true" v-model="añoSeleccionado" :options="años" class="form-control" :allow-empty="false" :close-on-select="true" :show-labels="false" placeholder="Año"></multiselect>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Division</label>
                </div>
                <input
                  type="text"
                  name="numDivision"
                  class="form-control"
                  placeholder="Division"
                  v-model="numDivision"
                  min="1"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el numero de division')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Turno</label>
                <div>
                  <multiselect v-model="turno" placeholder="Lista de Turnos" label="name" track-by="value" :searchable="true" :options="turnos" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                  <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar el turno</label>
                </div>
              </div>
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Ciclo Lectivo</label>
                </div>
                <input
                  type="number"
                  name="cicloLectivo"
                  class="form-control"
                  placeholder="Ciclo Lectivo"
                  v-model="cicloLectivo"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el Ciclo lectivo')"
                  oninput="setCustomValidity('')"
                />
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Preceptor</label>
                <div>
                  <multiselect v-model="preceptorSeleccionado" :options="preceptores" :custom-label="LabelPreceptor" track-by="dniAutoridad" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Lista de preceptores"></multiselect>
                  <label class="typo__label form__label">*Es posible crear divisiones sin preceptor, luego deberá asignarse uno</label>
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
  name: "EditarDivision",
  props: ["division"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      especialidadSeleccionada:this.division.especialidad,
      especialidades:['Ciclo Básico','Computación','Electrónica','Electricidad','Construcciones','Mecánica','Química'],
      añoSeleccionado:this.division.año,
      turno: this.division.turno ? { name: 'Tarde', value: 1 } : { name: 'Mañana', value: 0 },
      numDivision: this.division.numDivision,
      cicloLectivo: this.division.cicloLectivo,
      turnos:[{ name: 'Mañana', value: 0 },{ name: 'Tarde', value: 1 }],
      preceptorSeleccionado:[{}],
      preceptores: [{dniAutoridad: '', nombre: '', apellido: 'No seleccionar Preceptor'}],
      años:[],
      isInvalid: false
    };
  },
  mounted() {
    if(!this.division){
      this.$router.push({ name: 'Divisiones'})
    }
    if(this.especialidadSeleccionada == 'Ciclo Básico'){
        this.añoSeleccionado = 1;
        this.años = [1,2];
      }else{
        this.añoSeleccionado = 3;
        this.años = [3,4,5,6];
      }
  },
  created(){
    this.GetPreceptor();
    this.GetPreceptores();
  },
  methods: {
    LabelPreceptor({dniAutoridad,nombre,apellido}){
      return dniAutoridad + ` - ` + nombre + ' ' + apellido;
    },
    async GetPreceptor(){
      await axios.get("/api/autoridad/" + this.division.dniPreceptor)
      .then(res =>{
        if(res.data[0]){
          this.preceptorSeleccionado = res.data[0];
        }else
          this.preceptorSeleccionado = this.preceptores[0];
      });
    },
    validar () {
      if (!this.turno){
        this.isInvalid = true
        return false
      }else
        return true
    },
    async GetPreceptores(){
      await axios.get("/api/autoridad/preceptores").then(result => {
          result.data.forEach(preceptor => {
            this.preceptores.push(preceptor);
          });
      });
    },
    async PostNewDivision() {
      if(this.validar()){
        await axios.post("/api/division/update", {
            idDivision: this.division.idDivision,
            especialidad: this.especialidadSeleccionada,
            año:this.añoSeleccionado,
            turno: this.turno.value,
            numDivision: this.numDivision,
            cicloLectivo: this.cicloLectivo,
            dniPreceptor:this.preceptorSeleccionado ? this.preceptorSeleccionado.dniAutoridad : null
          })
          .then(async(res)=>{
            await axios.get("/api/division/" + this.division.idDivision)
            .then((res)=>{
              this.$router.push({ name: 'DivisionCompleta', params: {division:res.data[0], title:"Division editada",timer: 4,type:"success",message:"La division se modifico correctamente" }})
            })
          })
          .catch(err=>{this.$router.push({ name: 'DivisionCompleta', params: {division:this.division, title:"Error",timer: 6,type:"danger",message:"La division no pudo ser modificada" }})})
      }
    },
    onTouch () {
      this.isTouched = true
    }
  },
  watch:{
    especialidadSeleccionada: function(){
      if(this.especialidadSeleccionada == 'Ciclo Básico'){
        this.añoSeleccionado = 1;
        this.años = [1,2];
      }else{
        this.añoSeleccionado = 3;
        this.años = [3,4,5,6];
      }
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
