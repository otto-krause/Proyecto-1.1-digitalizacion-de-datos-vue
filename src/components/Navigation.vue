<template>
  <nav class="navbar navbar-expand-md navbar-light" style="background-color:#ee4540">
    <a class="navbar-brand" href="#">OK System</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link to="/" class="nav-link">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Perfil</router-link>
        </li>
      </ul>
      <ul class="navbar-nav mr-5">
        <li class="nav-item dropdown mr-5">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Dase de Batos</a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/autoridades" class="dropdown-item">Autoridades</router-link>
            <router-link to="/" class="dropdown-item">Otra cosa</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/" class="dropdown-item">Y otra cosa mas</router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "Navigation",
  data() {
    return {};
  },
};
</script>

<style>
</style>
