// Importa las funciones necesarias de Vue Router
import { createRouter, createWebHistory } from 'vue-router'


// Importa los componentes de tus rutas
import AulasHome from '../components/AulasHome.vue'
import ListadoCarrera from '../components/ListadoCarrera.vue'
import AbmAulas from '@/components/AbmAulas'
import AbmCarrera from '../components/AbmCarrera'
import ListadoProfesor from '../components/ListadoProfesor'
import AbmProfesor from '../components/AbmProfesor'
// Define tus rutas
const routes = [
   { path: '/', name: 'AulasHome', component: AulasHome },
   { path: '/carreras', name: 'ListadoCarrera', component: ListadoCarrera },
   { path: '/aulas', name: 'AbmAulas', component: AbmAulas },
   { path: '/abmcarrera', name: 'AbmCarrera', component: AbmCarrera },
   { path: '/profesores', name: 'ListadoProfesor', component: ListadoProfesor },
   { path: '/abmprofesor', name: 'AbmProfesor', component: AbmProfesor },
];


// Crea tu enrutador
const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
});


// Exporta tu enrutador
export default router