<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-light" style="background-color:#1a1a1d">
        <router-link to="/Materias" class="nav-link btn btn-info fas fa-arrow-circle-left"></router-link>
      </nav>
    </div>
    <div
      class="modal fade DeleteMateria"
      id="DeleteMateria"
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
          <h4 class="modal-title">Eliminar materia</h4>
          <div class="modal-body">
            <p>Desea eliminar esta materia? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteMateria">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-lg-5 mx-auto">
        <div class="card mt-4">
          <div class="card-body">
            <h4 class="card-title">Materia</h4>
            <div class="table-responsive">
              <table class="table">
                <tbody v-bind="materia">
                  <tr>
                    <th>Titulo</th>
                    <td>{{materia.titulo}}</td>
                  </tr>
                  <tr>
                    <th>Horas catedra</th>
                    <td>{{materia.cantHoras}}</td>
                  </tr>
                  <tr>
                    <th>Descripcion</th>
                    <td>{{materia.descripcion}}</td>
                  </tr>
                  <tr>
                    <th>Resoluciones</th>
                    <td><div v-for="resolucion in resoluciones" v-bind:key="resolucion.resolucion">{{resolucion.resolucion}}</div></td>
                  </tr>
                  <tr>
                    <th>Opciones</th>
                    <td>
                      <button
                        type="button"
                        class="nav-link btn btn-danger fas fa-trash"
                        data-toggle="modal"
                        data-target=".DeleteMateria"
                      ></button>
                      <router-link
                        :to="{ name: 'EditarMateria', params: {materia,resoluciones} }"
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
  name: "MateriaCompleta",
  props: ["materia","title","message","type","timer"],
  components: {
    Navigation
  },
  data() {
    return {
      resoluciones:[]
    };
  },
  mounted() {
    if (!this.materia) {
      this.$router.push({ name: "Materias" });
    }
    this.GetResolucion();
    if(this.timer){
      this.makeToast(this.title,this.timer,this.type,this.message)
    }
  },
  methods: {
    GetResolucion() {
      axios.get("/api/materia/plan_Materia/Resolucion/"+ this.materia.idMateria).then(result => {
        this.resoluciones = result.data;
      });
    },
    async DeleteMateria() {
      $("#DeleteMateria").modal("toggle");
      await axios
        .post("/api/materia/delete", {
          idMateria: this.materia.idMateria
        })
        .then(res => {
          this.$router.push({
            name: "Materias",
            params: { title:"Materia eliminada",timer: 4,type:"success",message:"La materia ha sido eliminada correctamente" }
          });
        })
        .catch(err => {
          this.$router.push({
            name: "Materias",
            params: { title:"Error",timer: 6,type:"danger",message:"La materia no ha podido ser eliminada" }
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
