<template>
  <div>
    <Navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light">
        <router-link to="/Divisiones" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div
      class="modal fade DeleteDivision"
      id="DeleteDivision"
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
          <h4 class="modal-title">Eliminar division</h4>
          <div class="modal-body">
            <p>Desea eliminar esta division? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteDivision">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade DeleteAlumno"
      id="modalDeleteAlumno"
      tabindex="-1"
      role="dialog"
      aria-labelledby="DeleteAlumno"
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
          <h4 class="modal-title">Eliminar alumno?</h4>
          <div class="modal-body">
            <p>Desea eliminar este alumno de la division?</p>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteDivision">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade AgregarAlumno"
      id="modalAgregarAlumno"
      tabindex="-1"
      role="dialog"
      aria-labelledby="AgregarAlumno"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-confirm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Alumno</h4>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>DNI</th>
                      <td>{{AlumnoAgregar.dniAlumno}}</td>
                    </tr>
                    <tr>
                      <th>Nombre</th>
                      <td>{{AlumnoAgregar.nombre}} , {{AlumnoAgregar.apellido}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-Success" v-on:click="PostNewAlumno">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-auto">
      <div class="col mx-5">
        <div class="card mt-5">
          <div class="card-body">
            <nav class="navbar">
              <h4 class="card-title">Division</h4>
            </nav>
            <div class="table-responsive">
              <table class="table">
                <tbody v-bind="division">
                  <tr v-if="division.especialidad">
                    <th>Especialidad</th>
                    <td>{{division.especialidad}}</td>
                  </tr>
                  <tr>
                    <th>Año</th>
                    <td>{{division.año}}</td>
                  </tr>
                  <tr>
                    <th>Division</th>
                    <td>{{division.numDivision}}</td>
                  </tr>
                  <tr>
                    <th>Turno</th>
                    <td>{{division.turno ? 'Tarde' : 'Mañana'}}</td>
                  </tr>
                  <tr>
                    <th>Ciclo Lectivo</th>
                    <td>{{division.cicloLectivo}}</td>
                  </tr>
                  <tr>
                    <th>Opciones</th>
                    <td>
                      <button
                        type="button"
                        class="nav-link btn btn-danger fas fa-trash"
                        data-toggle="modal"
                        data-target=".DeleteDivision"
                      ></button>
                      <router-link
                        :to="{ name: 'EditarDivision', params: {division} }"
                        class="nav-link btn btn-info fas fa-edit"
                      ></router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col mx-5">
        <div class="card mt-5">
          <div class="card-body">
            <nav class="navbar">
              <h4 class="card-title">Preceptor</h4>
              <p v-if="!preceptor">No posee preceptor asignado</p>
            </nav>
            <div class="table-responsive">
              <table class="table">
                <tbody v-if="preceptor" v-bind="preceptor">
                  <tr>
                    <th>DNI</th>
                    <td>{{preceptor.dniAutoridad}}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{{preceptor.nombre}}</td>
                  </tr>
                  <tr>
                    <th>Apellido</th>
                    <td>{{preceptor.apellido}}</td>
                  </tr>
                  <tr>
                    <tr>
                    <th>Telefono</th>
                    <td>{{preceptor.telefono}}</td>
                  </tr>
                  <tr>
                    <tr>
                    <th>Direccion</th>
                    <td>{{preceptor.direccion}}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Ingreso</th>
                    <td>{{preceptor.fechaIngreso != '1970-01-01T03:00:00.000Z' && preceptor.fechaIngreso != null ? preceptor.fechaIngreso.slice(0,10) : 'No tiene'}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-10 mx-auto px-0">
          <div class="card mt-5">
            <div class="card-body">
              <nav class="navbar">
                <h4 class="card-title">Alumnos</h4>
                <div class="form-group ml-auto col-sm-7 col-lg-4 form-inline">
                  <input class="col mr-3 form-control" type="number" placeholder="DNI alumno" v-model="searchAlumnoAgregar"/>
                  <button
                  :disabled="searchAlumnoAgregar.length > 7 ? false : true"
                  type="button"
                  class="col btn btn-info"
                  v-on:click="GetAlumno"
                >Agregar alumno</button>
                </div>
              </nav>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">DNI</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Telefono</th>
                    </tr>
                  </thead>
                  <tbody v-for="alumno in alumnos" :key="alumno.dniAlumno">
                    <tr>
                      <th scope="col">{{alumno.dniAlumno}}</th>
                      <th scope="col">{{alumno.nombre}}</th>
                      <th scope="col">{{alumno.apellido}}</th>
                      <th scope="col">{{alumno.telefono}}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";
import axios from "axios";

export default {
  name: "DivisionCompleta",
  props: ["division","title","message","type","timer"],
  components: {
    Navigation
  },
  data() {
    return {
      rolesMostrar: [],
      preceptor:{},
      alumnos: [],
      searchAlumnoAgregar:'',
      AlumnoAgregar:''
    };
  },
  mounted() {
    if (!this.division) {
      this.$router.push({ name: "Divisiones" });
    }
    this.GetAlumnos();
    this.GetPreceptor();
    if(this.timer){
      this.makeToast(this.title,this.timer,this.type,this.message)
    }
  },
  methods: {
    GetAlumnos() {
      axios
        .get("/api/alumno/HistorialDivision/" + this.division.idDivision)
        .then(res => {
          this.alumnos = res.data;
        });
    },
    GetPreceptor(){
      axios.get("/api/autoridad/" + this.division.dniPreceptor)
      .then(res =>{
        this.preceptor = res.data[0];
      });
    },
    DeleteDivision() {
      $("#DeleteDivision").modal("toggle");
      axios
        .post("/api/division/delete", {
          idDivision: this.division.idDivision
        })
        .then(res => {
          this.$router.push({
            name: "Divisiones",
            params: { title:"Division eliminada",timer: 4,type:"success",message:"La division ha sido eliminada correctamente" }
          });
        })
        .catch(err => {
          this.$router.push({
            name: "Divisiones",
            params: { title:"Error",timer: 6,type:"danger",message:"La division no ha podido ser eliminada" }
          });
        });
    },
    PostNewAlumno(){
      $("#modalAgregarAlumno").modal("toggle");
      axios.post('/api/division/alumno/add',{
        idDivision: this.division.idDivision,
        dniAlumno: this.AlumnoAgregar.dniAlumno
      })
      .then(res=>{
        this.makeToast('Alumno agregado',4,'success',"El alumno ha sido agregado a la division");
        this.GetAlumnos();
      })
      .catch(err=>{
        this.makeToast('Error',6,'danger',"El alumno no ha podido ser agregado.");
      })
    },
    GetAlumno(){
      axios.get('/api/alumno/' + this.searchAlumnoAgregar)
      .then(res => {
        this.AlumnoAgregar = res.data[0];
        if(this.AlumnoAgregar.dniAlumno == null){
          this.makeToast('Alumno no encontrado',6,'warning',"El alumno no pudo ser encontrado");
        }else{
          let AlumnoRepetido = this.alumnos.find(alumno=>{
            return alumno.dniAlumno == this.AlumnoAgregar.dniAlumno;
          })
          if(!AlumnoRepetido){
            $("#modalAgregarAlumno").modal("toggle");
          }else{
            this.makeToast('Alumno existente',5,'warning',"El alumno ya se encuentra en la division");
          }
        }
        })
        .catch(err => {});
    },
    DeleteAlumno() {
      $("#DeleteDivision").modal("toggle");
      axios
        .post("/api/division/delete", {
          idDivision: this.division.idDivision
        })
        .then(res => {
          this.$router.push({
            name: "Divisiones",
            params: { title:"Division eliminada",timer: 4,type:"success",message:"La division se ha eliminado correctamente" }
          });
        })
        .catch(err => {
          this.$router.push({
            name: "Divisiones",
            params: { title:"Error",timer: 6,type:"danger",message:"La division no ha podido ser eliminada" }
          });
        });
    },
    makeToast(title,timer,variant = null,message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
        toaster: "b-toaster-bottom-left",
        autoHideDelay:timer * 1000,
        appendToast: true
      })
    }
  }
};
</script>

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
