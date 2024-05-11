// Importa las dependencias necesarias
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'


// Crea tu aplicación Vue
const app = createApp(App)


// Configura tus plugins y componentes globales
app.use(vuetify)
app.use(router)


// Monta tu aplicación
app.mount('#app')