<template>
  <div>
    <div>
      <v-btn color="primary" @click="navigateToAbmReservaAula">Agregar Reserva de Aula</v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="listadoReservaAula"
      height="400"
      item-value="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editarReservaAula(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="confirmarEliminarReservaAula(item)" class="ml-2">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="mostrarAbmReservaAula" max-width="500px" persistent>
      <AbmReservaAula
        :reservaAula="reservaAulaSeleccionada"
        :editar="editar"
        @guardar="guardarAbmReservaAula"
        @cancelar="cancelarAbmReservaAula"
      />
    </v-dialog>

    <v-dialog v-model="mostrarConfirmacion" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar la reserva de aula?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="mostrarConfirmacion = false">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="eliminarReservaAulaConfirmada">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import AbmReservaAula from './AbmReservaAula.vue';

export default {
  components: {
    AbmReservaAula,
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'ID Aula', value: 'id_aula' },
        { text: 'Fecha Hora Desde', value: 'fh_desde' },
        { text: 'Fecha Hora Hasta', value: 'fh_hasta' },
        { text: 'Observación', value: 'observacion' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      listadoReservaAula: [],
      mostrarAbmReservaAula: false,
      mostrarConfirmacion: false,
      reservaAulaSeleccionada: {},
      reservaAulaAEliminar: null,
      editar: false,
    };
  },
  methods: {
    todasLasReservasAula() {
      axios
        .get('/apiv1/reservaaula')
        .then(response => {
          if (response.status === 200) {
            this.listadoReservaAula = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    navigateToAbmReservaAula() {
      this.reservaAulaSeleccionada = { id: '', id_aula: '', fh_desde: '', fh_hasta: '', observacion: '' };
      this.editar = false;
      this.mostrarAbmReservaAula = true;
    },
    editarReservaAula(item) {
      this.reservaAulaSeleccionada = { ...item };
      this.editar = true;
      this.mostrarAbmReservaAula = true;
    },
    confirmarEliminarReservaAula(item) {
      this.reservaAulaAEliminar = item;
      this.mostrarConfirmacion = true;
    },
    eliminarReservaAulaConfirmada() {
      axios
        .delete(`/apiv1/reservaaula/${this.reservaAulaAEliminar.id}`)
        .then(response => {
          if (response.status === 204) {
            this.todasLasReservasAula();
            this.mostrarConfirmacion = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    guardarAbmReservaAula() {
      this.mostrarAbmReservaAula = false;
      this.todasLasReservasAula();
    },
    cancelarAbmReservaAula() {
      this.mostrarAbmReservaAula = false;
    },
  },
  mounted() {
    this.todasLasReservasAula();
  },
};
</script>

<style scoped>
.mr-2 {
  margin-right: 8px;
}
.ml-2 {
  margin-left: 8px;
}
</style>
