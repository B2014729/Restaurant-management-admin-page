import { createApp } from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router/index.js';

const app = createApp(App);
app.use(router);
app.use(VueCookies);
app.mount('#app');
