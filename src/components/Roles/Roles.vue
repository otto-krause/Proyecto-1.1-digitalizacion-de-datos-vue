<template>
  <div>
    <navigation />
    <div class="container-fluid">
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
          <h4 class="modal-title">Eliminar Rol</h4>
          <div class="modal-body">
            <p>Desea eliminar este rol? Este proceso no puede deshacerse.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-danger" v-on:click="DeleteRol">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
      <b-alert
          :show="SuccessCountDownEdit"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownEdit =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El rol se modifico correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownEdit"
          dismissible
          variant="warning"
          @dismissed="ErrorCountDownEdit =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El rol no pudo ser modificado</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownCreation"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownCreation =0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El rol se ha creado correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownCreation"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownCreation = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El rol no ha podido ser creado</p>
        </b-alert>
        <b-alert
          :show="SuccessCountDownDeletion"
          dismissible
          variant="success"
          @dismissed="SuccessCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El rol ha sido eliminada correctamente</p>
        </b-alert>
        <b-alert
          :show="ErrorCountDownDeletion"
          dismissible
          variant="danger"
          @dismissed="ErrorCountDownDeletion = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>El rol no ha podido ser eliminado</p>
        </b-alert>
      <div class="row">
        <div class="col-3 col-lg-2" style="height:100vh; background-color:#FAFAFA">
          <div class="card rounded-0 border-0">
            <article>
              <div class="card-body" style="background-color:#FAFAFA">
                <h6 class="card-title">Busqueda</h6>
                <div class="form-row">
                  <input type="text" v-model="search" class="form-control" placeholder="Buscador" />
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="col">
          <nav class="navbar navbar-light" style="background-color:#1a1a1d">
            <h1 class="navbar-brand text-white col-sm-3 col-md-2 mr-0">Roles</h1>
            <router-link :to="{ name: 'AgregarRol' }" class="btn btn-info">Crear Rol</router-link>
          </nav>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Rol</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody v-for="(rol,index) in displayedRoles" v-bind:key="index">
              <tr>
                <th scope="col">{{index + 2}}</th>
                <th scope="col">{{rol.rol}}</th>
                <th scope="col">
                  <button
                    type="button"
                    class="nav-link btn btn-danger fas fa-trash"
                    data-toggle="modal"
                    data-target=".deleteModal"
                  ></button>
                  <router-link
                    :to="{ name: 'EditarRol', params: {rol} }"
                    class="nav-link btn btn-info fas fa-edit"
                  ></router-link>
                </th>
              </tr>
            </tbody>
          </table>
          <nav class="d-flex justify-content-center" v-if="filteredRoles.length >9">
          <ul class="pagination">
            <li class="page-item" v-if="page != 1">
              <a class="page-link" href="#" v-on:click="page = 1">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li v-for="pageNumber in pages.slice(Math.max(0,page-4), page+4)" v-bind:key="pageNumber" v-on:click="page = pageNumber" class="page-item"><a class="page-link" href="#">{{pageNumber}}</a></li>
            <li class="page-item" v-if="page < pages.length">
              <a class="page-link" href="#" v-on:click="page = pages.length">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";

import axios from "axios";

export default {
  name: "Roles",
  props: ["SuccessCountDownCreationProp", "ErrorCountDownCreationProp","SuccessCountDownDeletionProp","ErrorCountDownDeletionProp","SuccessCountDownEditProp","ErrorCountDownEditProp"],
  components: {
    Navigation
  },
  data() {
    return {
      search: "",
      page: 1,
      perPage: 9,
      pages: [],
      roles: [],
      dismissSecs: 4,
      SuccessCountDownCreation:this.SuccessCountDownCreationProp ? this.SuccessCountDownCreationProp : 0,
      ErrorCountDownCreation:this.ErrorCountDownCreationProp ? this.ErrorCountDownCreationProp : 0,
      SuccessCountDownDeletion:this.SuccessCountDownDeletionProp ? this.SuccessCountDownDeletionProp : 0,
      ErrorCountDownDeletion:this.ErrorCountDownDeletionProp ? this.ErrorCountDownDeletionProp : 0,
      SuccessCountDownEdit:this.SuccessCountDownEditProp ? this.SuccessCountDownEditProp : 0,
      ErrorCountDownEdit:this.ErrorCountDownEditProp ? this.ErrorCountDownEditProp : 0,
      ErrorCountDownRol:0,
    };
  },
  mounted() {
    this.GetRoles();
  },
  computed: {
    filteredRoles() {
      return this.roles.filter(rol => {
        return (rol.rol.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
    displayedRoles() {
      return this.paginate();
    }
  },
  methods: {
    GetRoles() {
      axios.get("/api/rol").then(result => {
        this.roles = result.data;
      });
    },
    paginate() {
      let from = this.page * this.perPage - this.perPage;
      let to = this.page * this.perPage;

      return this.filteredRoles.slice(from, to);
    },
    setRoles() {
      let numberOfRoles = Math.ceil(
        this.filteredRoles.length / this.perPage
      );
      this.pages = [];
      for (let i = 1; i <= numberOfRoles; i++) {
        this.pages.push(i);
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    async DeleteRol(){
      $('#myModal').modal('toggle')
      await axios.post("/api/delete", {
        dniAutoridad: this.autoridad.dniAutoridad
      })
      .then(res=>{this.$router.push({ name: 'Autoridades', params: {SuccessCountDownDeletionProp: 4 }})})
      .catch(err=>{this.$router.push({ name: 'Autoridades', params: {ErrorCountDownDeletionProp: 6 }})})
    }
  },
  watch: {
    filteredRoles() {
      this.page = 1;
      this.setRoles();
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0 !important;
}
[class*="col"] {
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
