<template>
  <div>
    <navigation />
  </div>
</template>

<script>
import Navigation from "./Navigation";

import axios from "axios";

export default {
  name: "Autoridades",
  components: {
    Navigation
  },
  data() {
    return {
      autoridades: [] ,
    };
  },
  mounted(){
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios.get("/api/autoridad").then(result => {
        this.autoridades = result.data;
      });
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
</style>
