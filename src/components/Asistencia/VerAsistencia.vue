<template>
  <div>
    <navigation/>
    <b-tabs>
      <b-tab title="División y Fecha" active>
        <b-row>
          <b-col>
            <b-card>
              <b-dropdown right text="División" container="fluid" ref="division" class="w-100">
                <b-dd-item v-for="(Curso, index) in Cursos" v-bind:key="index">
                  <b-dropdown-item @click="divisionFiltro = Curso.Division">{{Curso.Division}}</b-dropdown-item>
                </b-dd-item>
              </b-dropdown>
              <b-input type="date" v-model="fecha"></b-input>
            </b-card>
          </b-col>
          <b-col cols="9">
            <b-pagination
              v-model="paginaActual"
              :total-rows="largoFDF"
              :per-page="porPagina"
              aria-controls="tablaAsistAlum"
              align="fill"
              size="sm"
            ></b-pagination>

            <b-table
              id="tablaAsistAlum"
              :items="FiltradoPorDyF"
              :per-page="porPagina"
              :current-page="paginaActual"
              small
            ></b-table>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Alumno">
        <transition name="fade">
          <b-row v-if="mostrarCardsAlum">
            <b-col>
              <b-card>
                <b-input type="text" placeholder="NombreAlumno" v-model="nombreFiltro"></b-input>
                <b-input type="text" placeholder="dniAlumno" v-model="dniFiltro"></b-input>
                <b-dropdown
                  right
                  text="División"
                  v-model="divisionFiltro"
                  container="fluid"
                  class="w-100"
                >
                  <b-dd-item v-for="(Curso, index) in Cursos" v-bind:key="index">
                    <b-button
                      block
                      variant="dark"
                      @click="divisionFiltro = Curso.Division"
                    >{{Curso.Division}}</b-button>
                  </b-dd-item>
                </b-dropdown>
                <h5>{{divisionFiltro}}</h5>
              </b-card>
            </b-col>
            <b-col cols="9">
              <div>
                <b-card-group deck>
                  <div v-for="(Alumno,index) in FiltradoPorA" v-bind:key="index">
                    <b-card style="max-width: 15rem; min-width: 15rem">
                      <b-card-text>{{Alumno.Nombre}}</b-card-text>
                      <b-card-text>{{Alumno.Apellido}}</b-card-text>
                      <b-card-text>{{Alumno.Division}}</b-card-text>
                      <b-card-text>Faltas totales: jaja algún día</b-card-text>
                      <b-button @click="MostrarDetalle(Alumno)">Ver más</b-button>
                    </b-card>
                  </div>
                </b-card-group>
              </div>
            </b-col>
          </b-row>
          <div v-else>
            <b-button @click="Volver()" class="float-left">Volver</b-button>
            <h3>{{alumnoActual.Nombre + " " + alumnoActual.Apellido}}</h3>
            <h5>{{alumnoActual.DNI}}</h5>
            <h5>{{alumnoActual.Division}}</h5>
            <b-pagination
              class="bg-variant-danger"
              v-model="paginaActualB"
              :total-rows="largoFA"
              :per-page="porPaginaB"
              aria-controls="tablaAsistAlum"
              align="fill"
              size="sm"
            ></b-pagination>

            <b-table
              id="tablaAsistAlum"
              :items="AsistenciaAlumno(alumnoActual.DNI)"
              :per-page="porPaginaB"
              :current-page="paginaActualB"
              small
            ></b-table>
          </div>
        </transition>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Navigation from "../Navegacion/Navigation";

export default {
  components: {
    Navigation
  },
  mounted() {
    this.ObtenerCursos();
  },
  computed: {
    FiltradoPorDyF: function() {
      return this.Asistencia.filter(asistencia => {
        return (
          asistencia.division.includes(this.divisionFiltro) &&
          asistencia.fecha.toString().includes(this.fecha.toString())
        );
      });
    },
    FiltradoPorA: function() {
      return this.Alumnos.filter(alumno => {
        return (
          (alumno.Nombre.toLowerCase().includes(
            this.nombreFiltro.toLowerCase()
          ) ||
            alumno.Apellido.toLowerCase().includes(
              this.nombreFiltro.toLowerCase()
            )) &&
          alumno.DNI.includes(this.dniFiltro) &&
          alumno.Division.toString().includes(this.divisionFiltro.toString())
        );
      });
    },
    largoFDF: function() {
      return this.FiltradoPorDyF.length;
    },
    largoFA: function() {
      return this.FiltradoPorA.length;
    }
  },
  methods: {
    ObtenerCursos() {
      const datos = [
        {
          usuario: "User1",
          idDivision: "1",
          Division: "6CP1"
        },
        {
          usuario: "User1",
          idDivision: "2",
          Division: "6CP2"
        }
      ];
      this.Cursos = datos;
    },
    AsistenciaAlumno(dniAlum) {
      return this.Asistencia.filter(asistencia => {
        return asistencia.dniAlumno === dniAlum;
      });
    },
    Volver() {
      this.mostrarCardsAlum = !this.mostrarCardsAlum;
    },
    MostrarDetalle(Alumno) {
      this.alumnoActual = Alumno;
      this.AsistenciaAlumno(Alumno.DNI);
      this.mostrarCardsAlum = !this.mostrarCardsAlum;
    }
  },
  data() {
    return {
      paginaActual: 1,
      paginaActualB: 1,
      porPaginaB: 20,
      porPagina: 11,
      divisionFiltro: "",
      alumnoActual: "",
      dniFiltro: "",
      nombreFiltro: "",
      mostrarCardsAlum: true,
      fecha: "",
      Cursos: {},
      Alumnos: [
        {
          DNI: "434343433",
          Nombre: "Nombre1",
          Apellido: "Apellido1",
          Division: "6CP1"
        },
        {
          DNI: "434343434",
          Nombre: "Nombre2",
          Apellido: "Apellido2",
          Division: "6CP1"
        },
        {
          DNI: "434343435",
          Nombre: "Nombre5",
          Apellido: "Apellido5",
          Division: "6CP1"
        },
        {
          DNI: "434343436",
          Nombre: "Nombre3",
          Apellido: "Apellido3",
          Division: "6CP1"
        },
        {
          DNI: "434343437",
          Nombre: "Nombre4",
          Apellido: "Apellido4",
          Division: "6CP1"
        },
        {
          DNI: "13232",
          Nombre: "no",
          Apellido: "Apellidow",
          Division: "6CP2"
        },
        {
          DNI: "798462146/84",
          Nombre: "Nombre7",
          Apellido: "Apellido7",
          Division: "6CP2"
        },
        {
          DNI: "6546546556",
          Nombre: "Alumno",
          Apellido: "ApellidoAlumno",
          Division: "6CP2"
        }
      ],
      Asistencia: [
        {
          valor: "T",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "T",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "T",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-15",
          division: "6CP1"
        },
        {
          valor: "T",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-15",
          division: "6CP1"
        },
        {
          valor: "T",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-13",
          division: "6CP1"
        },
        {
          valor: "T",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-14",
          division: "6CP1"
        },
        {
          valor: "T",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-16",
          division: "6CP1"
        },
        {
          valor: "A",
          nombre: "NombreAlumno2",
          apellido: "ApellidoAlumno2",
          dniAlumno: "434343434",
          fecha: "2019-10-16",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno3",
          apellido: "ApellidoAlumno3",
          dniAlumno: "434343435",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno4",
          apellido: "ApellidoAlumno4",
          dniAlumno: "434343436",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno5",
          apellido: "ApellidoAlumno5",
          dniAlumno: "434343437",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "A",
          nombre: "NombreAlumno7",
          apellido: "ApellidoAlumno7",
          dniAlumno: "434343434",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno3",
          apellido: "ApellidoAlumno3",
          dniAlumno: "434343435",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno9",
          apellido: "ApellidoAlumno9",
          dniAlumno: "434343436",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno11",
          apellido: "ApellidoAlumno11",
          dniAlumno: "434343437",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "A",
          nombre: "NombreAlumno1",
          apellido: "ApellidoAlumno1",
          dniAlumno: "434343433",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "A",
          nombre: "NombreAlumno13",
          apellido: "ApellidoAlumno13",
          dniAlumno: "434343434",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno3",
          apellido: "ApellidoAlumno3",
          dniAlumno: "434343435",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno15",
          apellido: "ApellidoAlumno15",
          dniAlumno: "434343436",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno16",
          apellido: "ApellidoAlumno16",
          dniAlumno: "434343437",
          fecha: "2019-10-11",
          division: "6CP1"
        },
        {
          valor: "P",
          nombre: "NombreAlumno17",
          apellido: "ApellidoAlumno17",
          dniAlumno: "13232",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno18",
          apellido: "ApellidoAlumno18",
          dniAlumno: "798462146/84",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno19",
          apellido: "ApellidoAlumno19",
          dniAlumno: "6546546556",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno21",
          apellido: "ApellidoAlumno21",
          dniAlumno: "13232",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno22",
          apellido: "ApellidoAlumno22",
          dniAlumno: "798462146/84",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno23",
          apellido: "ApellidoAlumno23",
          dniAlumno: "6546546556",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno24",
          apellido: "ApellidoAlumno24",
          dniAlumno: "13232",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno25",
          apellido: "ApellidoAlumno25",
          dniAlumno: "798462146/84",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno26",
          apellido: "ApellidoAlumno26",
          dniAlumno: "6546546556",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno27",
          apellido: "ApellidoAlumno27",
          dniAlumno: "13232",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno",
          apellido: "ApellidoAlumno",
          dniAlumno: "798462146/84",
          fecha: "2019-10-11",
          division: "6CP2"
        },
        {
          valor: "P",
          nombre: "NombreAlumno",
          apellido: "ApellidoAlumno",
          dniAlumno: "6546546556",
          fecha: "2019-10-11",
          division: "6CP2"
        }
      ]
    };
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
