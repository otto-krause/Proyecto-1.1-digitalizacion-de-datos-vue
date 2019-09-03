<template>
  <div>
    <Navigation/>
    <!-- Default form register -->
    <form class="text-center border border-light p-5 container col-md-5 col-lg-3" action="#!">
      <p class="h4 mb-4">Registro</p>

      <div class="form-row mb-4">
        <div class="col">
          <!-- First name -->
          <input
            type="text"
            id="defaultRegisterFormFirstName"
            class="form-control"
            placeholder="Usuario"
          />
        </div>
        <div class="col">
          <!-- Last name -->
          <input
            type="text"
            id="defaultRegisterFormLastName"
            class="form-control"
            placeholder="Apellido"
          />
        </div>
      </div>

      <!-- E-mail -->
      <input
        type="email"
        id="defaultRegisterFormEmail"
        class="form-control mb-4"
        placeholder="E-mail"
      />

      <!-- Password -->
      <input
        type="password"
        id="defaultRegisterFormPassword"
        class="form-control"
        placeholder="Contraseña"
        aria-describedby="defaultRegisterFormPasswordHelpBlock"
      />
      <small
        id="defaultRegisterFormPasswordHelpBlock"
        class="form-text text-muted mb-4"
      >Como minimo 8 digitos y una mayuscula</small>

      <!-- Sign up button -->
      <button class="btn btn-danger my-4 btn-block" type="submit">Registrarse</button>
    </form>
    <!-- Default form register -->
  </div>
</template>
<script>
import Navigation from "../Navegacion/Navigation";

import axios from "axios";

export default {
  name: "SignUp",
  components: {
    Navigation
  },
  data() {
    return {};
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios.get("/api/tasks").then(result => {
        console.log(result.data);
      });
    }
  }
};
</script>

<style>
</style>
