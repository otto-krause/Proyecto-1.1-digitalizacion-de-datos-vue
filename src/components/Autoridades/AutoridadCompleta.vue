<template>
  <div>
    <Navigation />
    <div class="container-fluid" style="background-color:#1a1a1d">
      <nav class="navbar navbar-expand-md navbar-light">
        <router-link to="/Autoridades" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <b-alert
      :show="SuccessCountDownEdit"
      dismissible
      variant="success"
      @dismissed="SuccessCountDownEdit =0"
      @dismiss-count-down="countDownChanged"
      class="col-md-10 col-lg-7 mx-auto mt-3"
    >
      <p>La autoridad se modifico correctamente</p>
    </b-alert>
    <b-alert
      :show="ErrorCountDownEdit"
      dismissible
      variant="warning"
      @dismissed="ErrorCountDownEdit =0"
      @dismiss-count-down="countDownChanged"
      class="col-md-10 col-lg-7 mx-auto mt-3"
    >
      <p>La autoridad no pudo ser modificada</p>
    </b-alert>
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
          <h4 class="modal-title">Eliminar autoridad</h4>
          <div class="modal-body">
            <p>Desea eliminar esta autoridad? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteAutoridad">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-lg-5 mx-auto">
        <div class="card mt-4">
          <div class="card-body">
            <nav class="navbar">
              <h4 class="card-title">Autoridad</h4>
            </nav>
            <div class="table-responsive">
              <table class="table">
                <tbody v-bind="autoridad">
                  <tr>
                    <th>DNI</th>
                    <td>{{autoridad.dniAutoridad}}</td>
                  </tr>
                  <tr>
                    <th>Nombre</th>
                    <td>{{autoridad.nombre}}</td>
                  </tr>
                  <tr>
                    <th>Apellido</th>
                    <td>{{autoridad.apellido}}</td>
                  </tr>
                  <tr>
                    <tr>
                    <th>Direccion</th>
                    <td>{{autoridad.direccion}}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Ingreso</th>
                    <td>{{autoridad.fechaAlta != '1970-01-01T03:00:00.000Z' ? autoridad.fechaAlta.slice(0,10) : 'No tiene'}}</td>
                  </tr>
                  <tr>
                    <th>Fecha de Nacimiento</th>
                    <td>{{autoridad.fechaNacimiento != '1970-01-01T03:00:00.000Z' ? autoridad.fechaNacimiento.slice(0,10) : 'No tiene'}}</td>
                  </tr>
                  <tr>
                    <th>Ficha Medica</th>
                    <td>{{autoridad.fichaMedica ? 'Tiene' : 'No tiene'}}</td>
                  </tr>
                  <tr>
                    <th>Cargos</th>
                    <td>
                      <div v-for="rol in rolesMostrar" v-bind:key="rol.idRol">{{rol.rol}}</div>
                    </td>
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
                        :to="{ name: 'EditarAutoridad', params: {autoridad,rolesReenviar:roles,rolesMostrar} }"
                        class="nav-link btn btn-info fas fa-edit"
                      ></router-link>
                    </td>
                  </tr>
                  <tr>
                    <th>Historias Altas</th>
                    <td>
                      <router-link
                        :to="{ name: 'HistorialAutoridad', params: {autoridad,roles} }"
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
    </div>
  </div>
</template>
<script>
import Navigation from "../Navegacion/Navigation";
import axios from "axios";

export default {
  name: "AutoridadCompleta",
  props: [
    "autoridad",
    "roles",
    "SuccessCountDownEditProp",
    "ErrorCountDownEditProp"
  ],
  components: {
    Navigation
  },
  data() {
    return {
      rolesMostrar: [],
      SuccessCountDownEdit: this.SuccessCountDownEditProp
        ? this.SuccessCountDownEditProp
        : 0,
      ErrorCountDownEdit: this.ErrorCountDownEditProp
        ? this.ErrorCountDownEditProp
        : 0
    };
  },
  mounted() {
    if (!this.autoridad || !this.roles) {
      this.$router.push({ name: "Autoridades" });
    }
    this.SetRoles();
  },
  methods: {
    SetRoles() {
      this.rolesMostrar = this.roles.filter(rol => {
        return this.autoridad.idRol
          .split(",")
          .some(elemento => elemento == rol.idRol);
      });
    },
    async DeleteAutoridad() {
      $("#myModal").modal("toggle");
      await axios
        .post("/api/autoridad/delete", {
          dniAutoridad: this.autoridad.dniAutoridad
        })
        .then(res => {
          this.$router.push({
            name: "Autoridades",
            params: { SuccessCountDownDeletionProp: 4 }
          });
        })
        .catch(err => {
          this.$router.push({
            name: "Autoridades",
            params: { ErrorCountDownDeletionProp: 6 }
          });
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
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
