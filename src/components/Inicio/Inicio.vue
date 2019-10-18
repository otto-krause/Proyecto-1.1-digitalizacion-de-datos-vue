<template>
  <div>
    <Navigation/>
    <div id="imgBackground">
      <img id="img" src="https://upload.wikimedia.org/wikipedia/commons/9/90/Entrada_Otto_Krause.JPG" class="img-fluid position-relative" alt="Responsive image">
      <div class="caption">
        <p class="text-center text-white font-weight-bold font-italic">Bienvenido</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";

import axios from "axios";

export default {
  name: "Inicio",
  components:{
    Navigation
  },
};
</script>

<style scoped>
.caption {
 position: absolute;
 top: 20%;
 width: 100%;
}
.caption p{
 font-size: 550%;
}
#img {
    opacity: 0.3;
    height: 95vh;
}
#imgBackground {
  background-color: black;
}
</style>
