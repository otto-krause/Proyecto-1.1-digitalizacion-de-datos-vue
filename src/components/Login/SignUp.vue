<template>
  <div>
    <Navigation/>
    <!-- Default form register -->
    <form class="text-center p-5 container col-md-5 col-lg-4" action="#!">
      <div id="signup">
        <p class="h4 mb-4">Registro</p>

        <div class="form-group">
            <label class="input-group-text text-center">Autoridades</label>
          <div>
            <multiselect v-model="autoridadSeleccionada" :options="autoridades" placeholder="Lista de autoridades" :custom-label="LabelAutoridades" track-by="idAutoridad" :searchable="true" :close-on-select="true" :show-labels="false" :multiple="false"></multiselect>
          </div>
        </div>

        <div class="form-group input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">Usuario</label>
          </div>
          <input
            type="text"
            name="Usuario"
            class="form-control"
            placeholder="Ejemplo: maria474"
            v-model="Usuario"
            required
            oninvalid="this.setCustomValidity('Ingrese el usuario')"
            oninput="setCustomValidity('')"
          />
        </div>

        <div class="form-group input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">E-Mail</label>
          </div>
          <input
            type="text"
            name="mail"
            class="form-control"
            placeholder="Ejemplo: m.angene474@gmail.com"
            v-model="mail"
          />
        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">Contraseña</label>
          </div>
          <input
            type="password"
            id="defaultRegisterFormPassword"
            name="Contraseña"
            class="form-control"
            placeholder="Contraseña"
            v-model="Contraseña"
            required
            oninvalid="this.setCustomValidity('Ingrese la Contraseña')"
            oninput="setCustomValidity('')"
            aria-describedby="defaultRegisterFormPasswordHelpBlock"
          />
        </div>
        <small
          id="defaultRegisterFormPasswordHelpBlock"
          class="form-text text-muted mb-4"
        >Como mínimo 8 dígitos y una mayúscula</small>

        <!-- Sign up button -->
        <button class="btn btn-danger my-4 btn-block" type="submit">Registrarse</button>
      </div>
    </form>
    <!-- Default form register -->
  </div>
</template>
<script>
import Navigation from "../Navegacion/Navigation";
import Multiselect from 'vue-multiselect'

import axios from "axios";

export default {
  name: "SignUp",
  components: {
    Navigation,
    Multiselect
  },
  data() {
    return {
      autoridades: [],
      autoridadSeleccionada:''
    };
  },
  created() {
    this.GetAutoridades();
  },
  methods: {
    GetAutoridades() {
      axios.get("/api/autoridad").then(result => {
        this.autoridades = result.data;
      });
    },
    LabelAutoridades({nombre, apellido, dniAutoridad}){
      return dniAutoridad + ' - ' + nombre + ', ' + apellido;
    },
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
#signup
{
  border: 1px rgb(199, 199, 199) solid;
  border-radius: 5%;
  padding: 10%;
}
</style>
