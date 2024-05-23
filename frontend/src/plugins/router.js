// Importa las funciones necesarias de Vue Router
import { createRouter, createWebHistory } from 'vue-router'


// Importa los componentes de tus rutas
import AulasHome from '../components/AulasHome.vue'
import ListadoCarrera from '../components/ListadoCarrera.vue'
import AbmCarrera from '../components/AbmCarrera'
import ListadoProfesor from '../components/ListadoProfesor'
import AbmProfesor from '../components/AbmProfesor'
import AbmAula from '../components/AbmAula'
import ListadoAula from '../components/ListadoAula'
import AbmReservaAula from '../components/AbmReservaAula'
import ListadoReservaAula from '../components/ListadoReservaAula'
import AbmHorarioMateria from '../components/AbmHorarioMateria'
import ListadoHorarioMateria from '../components/ListadoHorarioMateria'


// Define tus rutas
const routes = [
   { path: '/', name: 'AulasHome', component: AulasHome },
   { path: '/carreras', name: 'ListadoCarrera', component: ListadoCarrera },
   { path: '/abmcarrera', name: 'AbmCarrera', component: AbmCarrera },
   { path: '/profesores', name: 'ListadoProfesor', component: ListadoProfesor },
   { path: '/abmprofesor', name: 'AbmProfesor', component: AbmProfesor },
   { path: '/abmaula', name: 'AbmAula', component: AbmAula },
   { path: '/aulas', name: 'ListadoAula', component: ListadoAula },
   { path: '/abmreservaaula', name: 'AbmReservaAula', component: AbmReservaAula },
   { path: '/reservaaula', name: 'ListadoReservaAula', component: ListadoReservaAula },
   { path: '/abmhorariomateria', name: 'AbmHorarioMateria', component: AbmHorarioMateria },
   { path: '/horariomateria', name: 'ListadoHorariMateria', component: ListadoHorarioMateria },
];


// Crea tu enrutador
const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
});


// Exporta tu enrutador
export default router