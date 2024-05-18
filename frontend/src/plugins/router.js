// Importa las funciones necesarias de Vue Router
import { createRouter, createWebHistory } from 'vue-router'


// Importa los componentes de tus rutas
import AulasHome from '../components/AulasHome.vue'
import AulasAbout from '../components/AulasAbout.vue'
import AbmAulas from '@/components/AbmAulas'


// Define tus rutas
const routes = [
   { path: '/', name: 'AulasHome', component: AulasHome },
   { path: '/about', name: 'AulasAbout', component: AulasAbout },
   { path: '/aulas', name: 'AbmAulas', component: AbmAulas },
];


// Crea tu enrutador
const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
});


// Exporta tu enrutador
export default router