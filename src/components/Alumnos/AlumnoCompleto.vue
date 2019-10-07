<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-light" style="background-color:#1a1a1d">
        <router-link to="/Alumnos" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div
      class="modal fade DeleteContactoAlumno"
      id="DeleteContactoAlumno"
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
          <h4 class="modal-title">Eliminar este contacto?</h4>
          <div class="modal-body">
            <p>Desea eliminar este contacto? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteContactoAlumno">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade DeleteAlumno"
      id="DeleteAlumno"
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
          <h4 class="modal-title">Eliminar alumno</h4>
          <div class="modal-body">
            <p>Desea eliminar este alumno? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteAlumno">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col col-sm-6 mx-5">
        <div class="card mt-5">
          <div class="card-body">
            <nav class="navbar">
              <h4 class="card-title">Alumno</h4>
              <button
                type="button"
                class="nav-link btn btn-info"
                data-toggle="modal"
                data-target=".AddDivision"
              >Agregar División
              </button>
            </nav>
            <div class="table-responsive">
              <table class="table">
                <tbody v-bind="alumno">
                  <tr>
                    <th>DNI</th>
                    <td>{{alumno.dniAlumno}}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{{alumno.nombre}}</td>
                  </tr>
                  <tr>
                    <th>Apellido</th>
                    <td>{{alumno.apellido}}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Alta</th>
                    <td>{{alumno.fechaAlta != '1970-01-01T03:00:00.000Z' ? alumno.fechaAlta.slice(0,10) : 'No tiene'}}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Nacimiento</th>
                    <td>{{alumno.fechaNacimiento != '1970-01-01T03:00:00.000Z' ? alumno.fechaNacimiento.slice(0,10) : 'No tiene'}}</td>
                  </tr>
                  <tr>
                    <th>¿Es repetidor?</th>
                    <td>{{alumno.repetidor ? 'Sí' : 'No'}}</td>
                  </tr>
                  <tr>
                    <th>Opciones</th>
                    <td>
                      <button
                        type="button"
                        class="nav-link btn btn-danger fas fa-trash"
                        data-toggle="modal"
                        data-target=".DeleteAlumno"
                      ></button>
                      <router-link
                        :to="{ name: 'EditarAlumno', params: {alumno} }"
                        class="nav-link btn btn-info fas fa-edit"
                      ></router-link>
                    </td>
                  </tr>
                  <tr>
                    <th>Historias Altas</th>
                    <td>
                      <router-link
                        :to="{ name: 'HistorialAlumno', params: {alumno} }"
                        class="nav-link btn btn-info fas fa-clipboard"
                      ></router-link>
                    </td>
                  </tr>
                  <tr>
                    <th>Historial Divisiones</th>
                    <td>
                      <router-link
                        :to="{ name: 'HistorialAlumnoDivision', params: {alumno} }"
                        class="nav-link btn btn-info fas fa-clipboard"
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
              <h4 class="card-title">Contactos del alumno</h4>
              <router-link :to="{ name: 'AgregarContactoAlumno',params: {alumno} }" class="btn btn-info">Crear contacto</router-link>
            </nav>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">DNI</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Relación</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody v-for="contactoAlumno in contactosAlumno" :key="contactoAlumno.idContacto">
                  <tr>
                    <th scope="col">{{contactoAlumno.dniContacto}}</th>
                    <th scope="col">{{contactoAlumno.nombre}}</th>
                    <th scope="col">{{contactoAlumno.apellido}}</th>
                    <th scope="col">{{contactoAlumno.relacion}}</th>
                    <th scope="col">{{contactoAlumno.celular}}</th>
                    <th scope="col">{{contactoAlumno.mail}}</th>
                    <th scope="col">
                      <button
                        type="button"
                        class="nav-link btn btn-danger fas fa-trash"
                        data-toggle="modal"
                        v-on:click="contactoSeleccionado = contactoAlumno"
                        data-target=".DeleteContactoAlumno"
                      ></button>
                      <router-link
                        :to="{ name: 'EditarContactoAlumno', params: {contactoAlumno,alumno} }"
                        class="nav-link btn btn-info fas fa-edit"
                      ></router-link>
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
</template>
<script>
import Navigation from "../Navegacion/Navigation";
import axios from "axios";

export default {
  name: "AlumnoCompleto",
  props: ["alumno","title","message","type","timer"],
  components: {
    Navigation
  },
  data() {
    return {
      contactosAlumno: [],
      contactoSeleccionado: {},
    };
  },
  mounted() {
    if (!this.alumno) {
      this.$router.push({ name: "Alumnos" });
    }
    this.GetContactos();
    if(this.timer){
      this.makeToast(this.title,this.timer,this.type,this.message)
    }
  },
  methods: {
    GetContactos() {
      axios
        .get("/api/contacto_alumno/" + this.alumno.dniAlumno)
        .then(result => {
          this.contactosAlumno = result.data;
        });
    },
    async DeleteAlumno() {
      $("#DeleteAlumno").modal("toggle");
      await axios
        .post("/api/alumno/delete", {
          dniAlumno: this.alumno.dniAlumno
        })
        .then(res => {
          this.$router.push({
            name: "Alumnos",
            params: { title:"Alumno eliminado",timer: 4,type:"success",message:"El alumno ha sido eliminado correctamente" }
          });
        })
        .catch(err => {
          this.$router.push({
            name: "Alumnos",
            params: { title:"Error",timer: 6,type:"danger",message:"El alumno no ha podido ser eliminado" }
          });
        });
    },
    async DeleteContactoAlumno() {
      $("#DeleteContactoAlumno").modal("toggle");
      await axios
        .post("/api/contacto_alumno/delete", {
          idContacto: this.contactoSeleccionado.idContacto
        })
        .then(res => {
          this.makeToast('Contacto eliminado',4,'success',"El contacto se ha eliminado correctamente");
          this.GetContactos();
        })
        .catch(err => {
          this.makeToast('Error',6,'danger',"El contacto no ha podido ser eliminado");
          this.GetContactos();
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

#addDivision .modal-confirm
{
  padding:50%;
}
</style>
