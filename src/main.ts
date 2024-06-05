import { createApp } from 'vue';
import axios from 'axios'; // Importacion dek Axios, solicitudes HTTP
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Axios globalmente --> This
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
