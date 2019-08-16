<template>
  <!-- Default form login -->
  <form class="text-center border border-light p-5 container col-md-5 col-lg-3" action="#!">
    <p class="h4 mb-4">Iniciar sesion</p>

    <!-- Email -->
    <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="Usuario" />

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
    <p>
      No tene cuenta? Contactá a secretaria padre
    </p>
  </form>
  <!-- Default form login -->
</template>

<script>
import axios from "axios";

export default {
  name: "Navigation",
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
