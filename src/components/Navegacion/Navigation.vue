<template>
  <nav class="navbar navbar-expand-md navbar-light" style="background-color:#C72C41">
    <a class="navbar-brand" href="/">OK System</a>
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
          <router-link to="/" class="nav-link">Asistencia</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Notas</router-link>
        </li>
      </ul>
      <ul class="navbar-nav mr-2">
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
            <router-link to="/Roles" class="dropdown-item">Roles</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/alumnos" class="dropdown-item">Alumnos</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/Divisiones" class="dropdown-item">Division</router-link>
            <router-link to="/Cursada" class="dropdown-item">Cursadas</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/PlanEstudios" class="dropdown-item">Planes de estudio</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/Materias" class="dropdown-item">Materias</router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/ActasPrevia" class="dropdown-item">Actas de previas</router-link>
          </div>
        </li>
      </ul>
      <ul class="navbar-nav mr-5">
        <li class="nav-item active">
            <router-link to="/" class="nav-link">Maikhol Sozaki</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Log Out</router-link>
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
