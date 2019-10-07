<template>
  <div>
    <Navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light">
        <router-link to="/Cursada" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div
      class="modal fade deleteModal"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-confirm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="icon-box">
              <i class="material-icons fas fa-times"></i>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <h4 class="modal-title">Eliminar acta de cursada</h4>
          <div class="modal-body">
            <p>¿Desea eliminar esta acta? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteCursada">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mx-auto">
        <div class="col mx-4">
          <div class="card mt-5">
            <div class="card-body">
              <nav class="navbar">
                <h4 class="card-title">Cursada</h4>
              </nav>
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr v-if="cursada.especialidad">
                      <th>Especialidad</th>
                      <td>{{cursada.especialidad}}</td>
                    </tr>
                    <tr>
                      <th>Año y Div</th>
                      <td>{{cursada.año}} / {{cursada.numDivision}}</td>
                    </tr>
                    <tr>
                      <th>Turno</th>
                      <td>{{cursada.turno ? 'Tarde' : 'Mañana'}}</td>
                    </tr>
                    <tr>
                      <th>Ciclo Lectivo</th>
                      <td>{{cursada.cicloLectivo}}</td>
                    </tr>
                    <tr>
                      <th>Opciones</th>
                      <td>
                        <!-- <button
                          type="button"
                          class="nav-link btn btn-danger fas fa-trash"
                          data-toggle="modal"
                          data-target=".deleteModal"
                        ></button>-->
                        <router-link
                          :to="{ name: 'EditarCursada', params: {cursada} }"
                          class="nav-link btn btn-info fas fa-edit"
                        ></router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="dropdown-divider"></div>
              <nav class="navbar">
                <h4 class="card-title">Profesor</h4>
              </nav>
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>DNI</th>
                      <td>{{cursada.dniProfesor}}</td>
                    </tr>
                    <tr>
                      <th>Nombre</th>
                      <td>{{cursada.nombre}} , {{cursada.apellido}}</td>
                    </tr>
                    <tr>
                      <th>¿Puede tomar lista?</th>
                      <td>{{cursada.tomarLista ? 'Si' : 'No'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="dropdown-divider"></div>
              <nav class="navbar">
                <h4 class="card-title">Materia</h4>
              </nav>
              <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>Título</th>
                      <td>{{cursada.titulo}}</td>
                    </tr>
                    <tr>
                      <th>Descripción</th>
                      <td>
                        <p class="form-control">{{cursada.descripcion}}</p>
                      </td>
                    </tr>
                    <tr>
                      <th>Horas catedra</th>
                      <td>{{cursada.cantHoras}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 mx-auto">
          <div class="card mt-5">
            <div class="card-body">
              <nav class="navbar">
                <h4 class="card-title">Horarios</h4>
                <div class="form-group input-group col col-md-7 form-inline">
                  <multiselect
                    class="col-xs-12 px-0"
                    v-model="diaSeleccionado"
                    :options="dias"
                    :searchable="false"
                    track-by="value"
                    label="name"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Dia"
                  ></multiselect>
                  <multiselect
                    class="col px-0"
                    :disabled="diaSeleccionado ? false : true"
                    v-model="horarioInicioSeleccionado"
                    :options="horariosInicio"
                    :searchable="false"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Inicio"
                  ></multiselect>
                  <multiselect
                    class="col px-0"
                    :disabled="diaSeleccionado ? false : true"
                    v-model="horarioFinSeleccionado"
                    :options="horariosFin"
                    :searchable="false"
                    :close-on-select="true"
                    :show-labels="false"
                    placeholder="Fin"
                  ></multiselect>
                  <button
                    type="submit"
                    class="btn btn-info col"
                    :disabled="horarioInicioSeleccionado && horarioFinSeleccionado && diaSeleccionado ? false : true"
                    v-on:click="PostNewHorario"
                  >Agregar</button>
                </div>
              </nav>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Día</th>
                      <th scope="col">Hora Entrada</th>
                      <th scope="col">Hora salida</th>
                      <th scope="col">Opciones</th>
                    </tr>
                  </thead>
                  <tbody v-for="horario in horarios" :key="horario.idHorario">
                    <tr>
                      <th scope="col">{{ParseDia(horario)}}</th>
                      <th scope="col">{{horario.entrada ? horario.entrada.slice(0,5) : ' - '}}</th>
                      <th scope="col">{{horario.salida ? horario.salida.slice(0,5) : ' - '}}</th>
                      <th scope="col">
                        <button
                          type="button"
                          class="nav-link btn btn-danger fas fa-trash"
                          data-toggle="modal"
                          data-target=".deleteHorario"
                          :click="horarioSeleccionadoBorrar = horario.idHorario"
                        ></button>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navigation from "../Navegacion/Navigation";

import Multiselect from "vue-multiselect";
import axios from "axios";

export default {
  name: "CursadaCompleta",
  props: ["cursada","title","message","type","timer"],
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      rolesMostrar: [],
      preceptor: {},
      diaSeleccionado: "",
      horarioInicioSeleccionado: "",
      horarioFinSeleccionado: "",
      dias: [
        { name: "Lunes", value: 0 },
        { name: "Martes", value: 1 },
        { name: "Miercoles", value: 2 },
        { name: "Jueves", value: 3 },
        { name: "Viernes", value: 4 }
      ],
      horariosTotales: [
        "07:45",
        "08:25",
        "09:05",
        "09:20",
        "10:00",
        "10:05",
        "10:40",
        "10:50",
        "11:20",
        "11:30",
        "12:50",
        "13:30",
        "14:10",
        "14:50",
        "15:00",
        "15:40",
        "15:50",
        "16:30",
        "16:35",
        "17:10",
        "17:15",
        "17:55"
      ],
      horariosInicio: [
        "07:45",
        "08:25",
        "09:05",
        "09:45",
        "10:00",
        "10:40",
        "11:20",
        "11:30",
        "12:00",
        "12:10",
        "13:30",
        "14:10",
        "14:50",
        "15:30",
        "15:40",
        "16:20",
        "16:30",
        "17:10",
        "17:15",
        "17:50",
        "17:55"
      ],
      horariosFin: [
        "07:45",
        "08:25",
        "09:05",
        "09:45",
        "10:00",
        "10:40",
        "11:20",
        "11:30",
        "12:00",
        "12:10",
        "13:30",
        "14:10",
        "14:50",
        "15:30",
        "15:40",
        "16:20",
        "16:30",
        "17:10",
        "17:15",
        "17:50",
        "17:55"
      ],
      horarios: [],
      horarioSeleccionadoBorrar:''
    };
  },
  mounted() {
    if (!this.cursada) {
      this.$router.push({ name: "Cursada" });
    }
    this.GetHorarios();
    if(this.timer){
      this.makeToast(this.type);
    }
  },
  methods: {
    ParseDia(DiaHorario) {
      if (DiaHorario.dia == 0) {
        return "Lunes";
      }
      if (DiaHorario.dia == 1) {
        return "Martes";
      }
      if (DiaHorario.dia == 2) {
        return "Miercoles";
      }
      if (DiaHorario.dia == 3) {
        return "Jueves";
      }
      if (DiaHorario.dia == 4) {
        return "Viernes";
      }
      return "Desconocido";
    },
    GetHorarios() {
      axios.get("/api/cursada/horarios/" + this.cursada.idCursada).then(res => {
        this.horarios = res.data;
      });
    },
    PostNewHorario() {
      axios
        .post("/api/dia_horario/add", {
          idCursada: this.cursada.idCursada,
          dia: this.diaSeleccionado.value,
          entrada: this.horarioInicioSeleccionado,
          salida: this.horarioFinSeleccionado
        })
        .then(res => {
          this.makeToast('Horario agregado',4,'success',"El horario ha sido creado correctamente");
          this.GetHorarios();
        })
        .catch(err => {
          if (err.message.includes("409")) {
            this.makeToast('Horario existente',5,'warning',"El horario ya existe.");
          } else this.makeToast('Error',6,'danger',"El horario no pudo ser creado.");
        });
    },
    async DeleteCursada() {
      $("#myModal").modal("toggle");
      await axios
        .post("/api/autoridad/delete", {
          dniAutoridad: this.autoridad.dniAutoridad
        })
        .then(res => {
          this.$router.push({
            name: "Autoridades",
            params: { title:"Cursada eliminada",timer: 4,type:"success",message:"La cursada ha sido eliminada correctamente" }
          });
        })
        .catch(err => {
          this.$router.push({
            name: "Autoridades",
            params: { title:"Error",timer: 6,type:"danger",message:"La cursada no ha podido ser eliminada" }
          });
        });
    },
    async DeleteHorario(idHorario) {
      $("#modalHorario").modal("toggle");
      await axios
        .post("/api/dia_horario/delete", {
          idHorario
        })
        .then(res => {
          this.SuccessCountDownDeletion= 4;
        })
        .catch(err => {
          ErrorCountDownDeletionProp=6;
        });
        this.GetHorarios();
        this.horarioSeleccionadoBorrar = '';
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
  },
  watch: {
    horarioInicioSeleccionado: function() {
      this.horariosFin = this.horariosTotales;
      this.horariosFin = this.horariosFin.slice(
        this.horariosFin.indexOf(this.horarioInicioSeleccionado) + 1
      );
    },
    horarioFinSeleccionado: function() {
      this.horariosInicio = this.horariosTotales;
      this.horariosInicio = this.horariosInicio.slice(
        0,
        this.horariosInicio.indexOf(this.horarioFinSeleccionado)
      );
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
.modal-confirm {
  color: #636363;
  width: 400px;
}
.modal-confirm .modal-content {
  padding: 20px;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 14px;
}
.modal-confirm .modal-header {
  border-bottom: none;
  position: relative;
}
.modal-confirm h4 {
  text-align: center;
  font-size: 26px;
  margin: 0 10px;
}
.modal-confirm .close {
  position: absolute;
  top: -5px;
  right: -2px;
}
.modal-confirm .modal-body {
  color: #999;
}
.modal-confirm .modal-footer {
  border: none;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  padding: 10px 15px 25px;
}
.modal-confirm .modal-footer a {
  color: #999;
}
.modal-confirm .icon-box {
  width: 80px;
  height: 80px;
  margin: auto;
  border-radius: 50%;
  z-index: 9;
  text-align: center;
  border: 3px solid #f15e5e;
}
.modal-confirm .icon-box i {
  color: #f15e5e;
  font-size: 46px;
  display: inline-block;
  margin-top: 13px;
}
.modal-confirm .btn {
  color: #fff;
  border-radius: 4px;
  background: #60c7c1;
  text-decoration: none;
  transition: all 0.4s;
  line-height: normal;
  min-width: 120px;
  border: none;
  min-height: 40px;
  border-radius: 3px;
  margin: 0 7%;
  outline: none !important;
}
.modal-confirm .btn-info {
  background: #c1c1c1;
}
.modal-confirm .btn-info:hover,
.modal-confirm .btn-info:focus {
  background: #a8a8a8;
}
.modal-confirm .btn-danger {
  background: #f15e5e;
}
.modal-confirm .btn-danger:hover,
.modal-confirm .btn-danger:focus {
  background: #ee3535;
}
.trigger-btn {
  display: inline-block;
  margin: 100px auto;
}
</style>
