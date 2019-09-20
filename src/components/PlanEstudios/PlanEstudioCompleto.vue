<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-light" style="background-color:#1a1a1d">
        <router-link to="/PlanEstudios" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div
      class="modal fade DownPlanEstudio"
      id="DownPlanEstudio"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-confirm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="icon-box">
              <i class="material-icons fas fa-archive"></i>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <h4 class="modal-title">Archivar plan de estudios</h4>
          <div class="modal-body">
            <p>Desea archivar este plan de estudios? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DownPlanEstudio">Archivar</button>
          </div>
        </div>
      </div>
    </div>
    <b-alert
          :show="SuccessCountDownEditContacto"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownEditContacto =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El contacto se ha modificado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownEditContacto"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownEditContacto =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El contacto no ha podido ser modificado</p>
        </b-alert>
    <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El contacto se ha eliminado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El contacto no ha podido ser eliminado</p>
        </b-alert>
    <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El contacto se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El contacto no ha podido ser creado. Posiblemente haya un problema con los datos ingresados</p>
        </b-alert>
    <b-alert
          :show="SuccessCountDownEdit"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownEdit =0"
          @dismiss-count-down="countDownChanged"
          class="col-md-10 col-lg-7 mx-auto mt-3"
        >
          <p>El plan de estudio se modifico correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownEdit"
          dismissible
          variant="warning"
          @dismissed="ErrorCountDownEdit =0"
          @dismiss-count-down="countDownChanged"
          class="col-md-10 col-lg-7 mx-auto mt-3"
        >
          <p>El plan de estudio no pudo ser modificado</p>
        </b-alert>
    <div class="row">
      <div class="col-md-8 col-lg-5 mx-auto">
        <div class="card mt-4">
          <div class="card-body">
            <h4 class="card-title">Plan de estudios</h4>
            <div class="table-responsive">
              <table class="table">
                <tbody v-bind="PlanEstudio">
                  <tr>
                    <th>resolucion</th>
                    <td>{{PlanEstudio.resolucion}}</td>
                  </tr>
                  <tr>
                    <th>Vigencia Desde</th>
                    <td>{{PlanEstudio.vigenciaDesde != '1970-01-01T03:00:00.000Z' ? PlanEstudio.vigenciaDesde.slice(0,10) : '-'}}</td>
                  </tr>
                  <tr>
                    <th>Vigencia Hasta</th>
                    <td>{{PlanEstudio.vigenciaHasta != null ? PlanEstudio.vigenciaHasta.slice(0,10) : '-'}}</td>
                  </tr>
                  <tr>
                    <th>Descripcion</th>
                    <td><p class="form-control">{{PlanEstudio.descripcion}}</p></td>
                  </tr>
                  <tr v-if="!PlanEstudio.vigenciaHasta">
                    <th>Opciones</th>
                    <td>
                      <button
                        type="button"
                        class="nav-link btn btn-danger fas fa-archive"
                        data-toggle="modal"
                        data-target=".DownPlanEstudio"
                      ></button>
                      <router-link
                        :to="{ name: 'EditarPlanEstudio', params: {PlanEstudio} }"
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
    </div>
  </div>
</template>
<script>
import Navigation from "../Navegacion/Navigation";
import axios from "axios";

export default {
  name: "PlanEstudioCompleto",
  props: ["PlanEstudio","SuccessCountDownEditProp","ErrorCountDownEditProp","SuccessCountDownCreationProp","ErrorCountDownCreationProp","SuccessCountDownEditContactoProp","ErrorCountDownEditContactoProp"],
  components: {
    Navigation
  },
  data() {
    return {
      SuccessCountDownEdit:this.SuccessCountDownEditProp ? this.SuccessCountDownEditProp : 0,
      ErrorCountDownEdit:this.ErrorCountDownEditProp ? this.ErrorCountDownEditProp : 0,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownEditContacto:this.SuccessCountDownEditContactoProp ? this.SuccessCountDownEditContactoProp : 0,
      ErrorCountDownEditContacto:this.ErrorCountDownEditContactoProp ? this.ErrorCountDownEditContactoProp : 0,
      SuccessCountDownDeletion:0,
      ErrorCountDownDeletion:0
    };
  },
  mounted() {
    if (!this.PlanEstudio) {
      this.$router.push({ name: "PlanEstudios" });
    }
  },
  methods: {
    async DownPlanEstudio() {
      $("#DownPlanEstudio").modal("toggle");
      await axios
        .post("/api/plan_estudios/down", {
          resolucion: this.PlanEstudio.resolucion
        })
        .then(res => {
          this.$router.push({
            name: "PlanEstudios",
            params: { SuccessCountDownDeletionProp: 4 }
          });
        })
        .catch(err => {
          this.$router.push({
            name: "PlanEstudios",
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
