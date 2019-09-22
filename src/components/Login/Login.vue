<template>
  <div>
    <Navigation/>
    <!-- Default form login -->
    <form class="text-center p-5 container col-md-5 col-lg-3" action="#!">
      <div id="login">
        <p class="h4 mb-4">Iniciar sesión</p>

        <!-- Email -->
        <input
          type="email"
          id="defaultLoginFormEmail"
          class="form-control mb-4"
          placeholder="Usuario"
        />

        <!-- Password -->
        <input
          type="password"
          id="defaultLoginFormPassword"
          class="form-control mb-4"
          placeholder="Contraseña"
        />

        <div class="d-flex justify-content-around">
          <div>
            <!-- Remember me -->
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" />
              <label class="custom-control-label" for="defaultLoginFormRemember">Recordarme</label>
            </div>
          </div>
          <div>
            <!-- Forgot password -->
            <a href>Te olvidaste la contra?</a>
          </div>
        </div>

        <!-- Sign in button -->
        <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>

        <!-- Register -->
        <p>No tene cuenta? Contactá a secretaria padre</p>
      </div>
    </form>
    <!-- Default form login -->
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";

import axios from "axios";

export default {
  name: "Login",
  components:{
    Navigation
  },
  data() {
    return {};
  },
  beforeMount() {
    //this.getTasks();
  },
  methods: {
    /*getTasks() {
      axios.get("/api/autoridad").then(result => {
        console.log({result});
      });
    }*/
  }
};
</script>

<style>
#login
{
  border: 1px rgb(199, 199, 199) solid;
  border-radius: 5%;
  padding: 10%;
}
</style>
