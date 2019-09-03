<template>
  <div>
    <Navigation />
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
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-light" style="background-color:#1a1a1d">
        <router-link to="/Alumnos" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
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
          <th>Fecha de Ingreso</th>
          <td>{{alumno.fechaIngreso != '1970-01-01T03:00:00.000Z' ? alumno.fechaIngreso.slice(0,10) : 'No tiene'}}</td>
        </tr>
        <tr>
          <th>Fecha de Nacimineto</th>
          <td>{{alumno.fechaNacimiento != '1970-01-01T03:00:00.000Z' ? alumno.fechaNacimiento.slice(0,10) : 'No tiene'}}</td>
        </tr>
        <tr>
          <th>es Repetidor?</th>
          <td>{{alumno.repetidor ? 'Si' : 'No'}}</td>
        </tr>
        <tr>
          <th>Opciones</th>
          <td>
            <button
              type="button"
              class="nav-link btn btn-danger fas fa-trash"
              data-toggle="modal"
              data-target=".deleteModal"
            ></button>
            <router-link
              :to="{ name: 'EditarAlumno', params: {alumno} }"
              class="nav-link btn btn-info fas fa-edit"
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <hr/>
    <div class="container">
      <nav class="navbar navbar-light">
            <h1 class="navbar-brand col-sm-3 col-md-2 mr-0">Contactos del Alumno</h1>
            <router-link :to="{ name: 'AgregarContacto' }" class="btn btn-info">Crear contacto</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Relacion</th>
                <th scope="col">Celular</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-for="contactoAlumno in contactosAlumno" :key="contactoAlumno.idContacto">
              <tr>
                <th scope="col">{{contactoAlumno.nombre}}</th>
                <th scope="col">{{contactoAlumno.apellido}}</th>
                <th scope="col">{{contactoAlumno.relacion}}</th>
                <th scope="col">{{contactoAlumno.celular}}</th>
                <th scope="col">
                  <router-link
                    :to="{ name: 'ContactoCompleto', params: {contactoAlumno} }"
                    class="nav-link btn btn-info fas fa-eye"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
    </div>
  </div>
</template>
<script>
import Navigation from "../Navegacion/Navigation";
import axios from "axios";

export default {
  name: "AlumnoCompleto",
  props: ["alumno"],
  components: {
    Navigation
  },
  data() {
    return {
      contactosAlumno: [],
    };
  },
  mounted() {
    if(!this.alumno){
      this.$router.push({ name: 'Alumnos'})
    }
    this.GetContactos();
  },
  methods: {
    GetContactos(){
      axios.get("/api/contacto_alumno/", {
        dniAlumno: this.alumno.dniAlumno
      })
      .then(result =>{
        this.contactosAlumno = result.data;
      })
    },
    async DeleteAlumno(){
      $('#myModal').modal('toggle')
      await axios.post("/api/alumno/delete", {
        dniAlumno: this.alumno.dniAlumno
      })
      .then(res=>{this.$router.push({ name: 'Alumnos', params: {SuccessCountDownDeletionProp: 4 }})})
      .catch(err=>{this.$router.push({ name: 'Alumnos', params: {ErrorCountDownDeletionProp: 6 }})})
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
    .modal-confirm .btn-info:hover, .modal-confirm .btn-info:focus {
        background: #a8a8a8;
    }
    .modal-confirm .btn-danger {
        background: #f15e5e;
    }
    .modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
        background: #ee3535;
    }
	.trigger-btn {
		display: inline-block;
		margin: 100px auto;
	}
</style>
