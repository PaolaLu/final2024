<template>
  <div>
    <v-btn color="primary" @click="navigateToAbmHorarioMateria">Agregar Horario de Materia</v-btn>

    <v-data-table
      :headers="headers"
      :items="listadoHorarioMateria"
      height="400"
      item-value="id"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editarHorarioMateria(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="confirmarEliminarHorarioMateria(item)" class="ml-2">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="mostrarAbmHorarioMateria" max-width="500px" persistent>
      <AbmHorarioMateria
        :horarioMateria="horarioMateriaSeleccionado"
        :editar="editar"
        @guardar="guardarAbmHorarioMateria"
        @cancelar="cancelarAbmHorarioMateria"
      />
    </v-dialog>

    <v-dialog v-model="mostrarConfirmacion" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar el horario de materia?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="mostrarConfirmacion = false">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="eliminarHorarioMateriaConfirmado">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import AbmHorarioMateria from './AbmHorarioMateria.vue';

export default {
  components: {
    AbmHorarioMateria,
  },
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'ID Materia', value: 'id_materia' },
        { text: 'Día de la Semana', value: 'dia_semana' },
        { text: 'Hora de Inicio', value: 'hora_inicio' },
        { text: 'Hora de Fin', value: 'hora_fin' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      listadoHorarioMateria: [],
      mostrarAbmHorarioMateria: false,
      mostrarConfirmacion: false,
      horarioMateriaSeleccionado: {},
      horarioMateriaAEliminar: null,
      editar: false,
    };
  },
  methods: {
    todasLosHorariosMateria() {
      axios
        .get('/apiv1/horariosmateria')
        .then(response => {
          if (response.status === 200) {
            this.listadoHorarioMateria = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    navigateToAbmHorarioMateria() {
      this.$router.push('/abmhorariomateria');
    },
    editarHorarioMateria(item) {
      this.horarioMateriaSeleccionado = { ...item };
      this.editar = true;
      this.mostrarAbmHorarioMateria = true;
    },
    confirmarEliminarHorarioMateria(item) {
      this.horarioMateriaAEliminar = item;
      this.mostrarConfirmacion = true;
    },
    eliminarHorarioMateriaConfirmado() {
      axios
        .delete(`/apiv1/horariosmateria/${this.horarioMateriaAEliminar.id}`)
        .then(response => {
          if (response.status === 204) {
            this.todasLosHorariosMateria();
            this.mostrarConfirmacion = false;
            this.$router.push('/horariosmateria');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    guardarAbmHorarioMateria() {
      this.mostrarAbmHorarioMateria = false;
      this.todasLosHorariosMateria();
    },
    cancelarAbmHorarioMateria() {
      this.mostrarAbmHorarioMateria = false;
    },
  },
  mounted() {
    this.todasLosHorariosMateria();
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
