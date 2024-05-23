<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-card>
      <v-card-title>{{ editar ? 'Editar Horario de Materia' : 'Agregar Horario de Materia' }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="horarioMateriaData.id_materia" label="ID Materia" required></v-text-field>
        <v-text-field v-model="horarioMateriaData.dia_semana" label="Día de la Semana" required></v-text-field>
        <v-text-field v-model="horarioMateriaData.hora_inicio" label="Hora de Inicio" required></v-text-field>
        <v-text-field v-model="horarioMateriaData.hora_fin" label="Hora de Fin" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submit" :disabled="!valid">Guardar</v-btn>
        <v-btn color="secondary" @click="cancelar">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    horarioMateria: {
      type: Object,
      default: () => ({ id: '', id_materia: '', dia_semana: '', hora_inicio: '', hora_fin: '' }),
    },
    editar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      horarioMateriaData: {
        id_materia: '',
        dia_semana: '',
        hora_inicio: '',
        hora_fin: '',
      },
    };
  },
  watch: {
    horarioMateria: {
      handler(nuevoValor) {
        this.horarioMateriaData = { ...nuevoValor };
      },
      deep: true,
    },
  },
  methods: {
    submit() {
      if (this.editar) {
        this.editarHorarioMateria();
      } else {
        this.guardarHorarioMateria();
      }
    },
    guardarHorarioMateria() {
      axios
        .post('/apiv1/horariomateria', this.horarioMateriaData)
        .then((response) => {
          this.$emit('guardar');
          this.$emit('cerrar');
          this.$router.push('/horariosmateria');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editarHorarioMateria() {
      axios
        .patch(`/apiv1/horariomateria/${this.horarioMateriaData.id}`, this.horarioMateriaData)
        .then((response) => {
          this.$emit('guardar');
          this.$emit('cerrar');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelar() {
      this.$emit('cancelar');
    },
  },
};
</script>

<style scoped>
</style>
