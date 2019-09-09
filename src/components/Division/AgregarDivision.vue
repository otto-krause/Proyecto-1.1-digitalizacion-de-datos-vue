<template>
  <div>
    <navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light" >
        <router-link to="/Divisiones" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div class="col-md-8 col-lg-5 mx-auto mt-3">
      <div class="card">
        <div class="row no-gutters">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Nueva division</h3>
            <form autocomplete="off" v-on:submit.prevent="PostNewDivision">
              <div class="form-group input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text">Año</label>
                </div>
                <input
                  type="text"
                  name="año"
                  class="form-control"
                  placeholder="Año"
                  v-model="año"
                  min="1" max="6"
                  required
                  oninvalid="this.setCustomValidity('Ingrese el Año (1ro a 6to)')"
                  oninput="setCustomValidity('')"
                />
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
                  <multiselect v-model="turnoSeleccionado" placeholder="Lista de Turnos" label="name" track-by="value" :searchable="true" :options="turnos" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
                  <label class="typo__label form__label" v-if="isInvalid">*Debes seleccionar el turno</label>
                </div>
              </div>
              <div class="form-group">
                  <label class="input-group-text text-center">Especialidades</label>
                <div>
                  <multiselect v-model="especialidadSeleccionada" placeholder="Lista de especialidades" :searchable="true" :options="especialidades" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
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
                  <label class="input-group-text text-center">Cargos</label>
                <div>
                  <multiselect v-model="preceptorSeleccionado" :options="preceptores" :custom-label="LabelPreceptor" track-by="dniAutoridad" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Lista de preceptores"></multiselect>
                  <label class="typo__label form__label">*Es posible crear divisiones sin preceptor, luego deberá asignarse uno</label>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-danger btn-block" type="submit" >Crear nueva division</button>
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
  name: "AgregarDivision",
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      especialidad: '',
      año: '',
      numDivision: '',
      cicloLectivo: '',
      turnoSeleccionado:'',
      turnos:[{ name: 'Mañana', value: 0 },{ name: 'Tarde', value: 0 }],
      especialidadSeleccionada:'',
      especialidades:['computacion','electronica','electricidad','construcciones','mecanica','quimica'],
      preceptorSeleccionado:[],
      preceptores: [],
      isInvalid: false
    };
  },
  created(){
    this.GetPreceptores();
  },
  methods: {
    LabelPreceptor({dniAutoridad,nombre,apellido}){
      return dniAutoridad + ` - ` + nombre + ', ' + apellido;
    },
    validar () {
      if (!this.turnoSeleccionado){
        this.isInvalid = true
        return false
      }else
        return true
    },
    GetPreceptores(){
      axios.get("/api/autoridad/preceptores").then(result => {
          result.data.forEach(preceptor => {
            let nuevoPreceptor = preceptor.nombre + ', ' + preceptor.apellido;
            this.preceptores.push(preceptor);
          });
      });
    },
    async PostNewDivision() {
      if(this.validar()){
      await axios.post("/api/division/add", {
          dniPreceptor: this.preceptorSeleccionado.dniAutoridad,
          especialidad: this.especialidadSeleccionada,
          año: this.año,
          turno: this.turnoSeleccionado.value,
          numDivision: this.numDivision,
          cicloLectivo: this.cicloLectivo,
        })
        .then(res=>{this.$router.push({ name: 'Divisiones', params: {SuccessCountDownCreationProp: 4 }})})
        .catch(err=>{this.$router.push({ name: 'Divisiones', params: {ErrorCountDownCreationProp: 6 }})})

      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>
