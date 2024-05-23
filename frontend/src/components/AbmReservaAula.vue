<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-card>
      <v-card-title>{{ editar ? 'Editar Reserva de Aula' : 'Agregar Reserva de Aula' }}</v-card-title>
      <v-card-text>
        <v-select
          v-model="reservaAulaData.id_aula"
          :items="aulas"
          item-text="nombre"
          item-value="id"
          label="Aula"
          required
        ></v-select>
        <v-menu
          ref="desdeMenu"
          v-model="menuDesde"
          :close-on-content-click="false"
          :return-value.sync="reservaAulaData.fh_desde"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="reservaAulaData.fh_desde"
              label="Fecha Hora Desde"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              required
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="reservaAulaData.fh_desde"
            @input="menuDesde = false"
            :min="new Date().toISOString().substr(0, 10)"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="hastaMenu"
          v-model="menuHasta"
          :close-on-content-click="false"
          :return-value.sync="reservaAulaData.fh_hasta"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="reservaAulaData.fh_hasta"
              label="Fecha Hora Hasta"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              required
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="reservaAulaData.fh_hasta"
            @input="menuHasta = false"
            :min="reservaAulaData.fh_desde"
          ></v-date-picker>
        </v-menu>
        <v-text-field
          v-model="reservaAulaData.observacion"
          label="Observación"
        ></v-text-field>
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
    reservaAula: {
      type: Object,
      default: () => ({
        id: '',
        id_aula: '',
        fh_desde: '',
        fh_hasta: '',
        observacion: ''
      })
    },
    editar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: false,
      reservaAulaData: {
        id_aula: '',
        fh_desde: '',
        fh_hasta: '',
        observacion: ''
      },
      aulas: [],
      menuDesde: false,
      menuHasta: false
    };
  },
  watch: {
    reservaAula: {
      handler(nuevoValor) {
        this.reservaAulaData = { ...nuevoValor };
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    cargarAulas() {
      axios
        .get('/apiv1/aulas')
        .then(response => {
          if (response.status === 200) {
            this.aulas = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submit() {
      if (this.editar) {
        this.editarReservaAula();
      } else {
        this.guardarReservaAula();
      }
    },
    guardarReservaAula() {
      axios
        .post('/apiv1/reservaaula', this.reservaAulaData)
        .then(response => {
          this.$emit('guardar');
          this.$emit('cerrar');
          this.$router.push('/reservasaula');
        })
        .catch(error => {
          console.log(error);
        });
    },
    editarReservaAula() {
      axios
        .patch(`/apiv1/reservaaula/${this.reservaAulaData.id}`, this.reservaAulaData)
        .then(response => {
          this.$emit('guardar');
          this.$emit('cerrar');
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancelar() {
      this.$emit('cancelar');
    }
  },
  mounted() {
    this.cargarAulas();
  }
};
</script>

<style scoped>
</style>
