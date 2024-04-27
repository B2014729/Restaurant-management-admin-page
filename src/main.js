import { createApp } from 'vue';
import App from './App.vue';
import VueCookies from 'vue-cookies';
import Vuex from 'vuex';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@/assets/css/style.css';
import router from './router/index.js';

// const store = createStore({
//     state() {
//         return {
//             count: 0,
//             token: 'kskksksks',
//         }
//     },
//     mutations: {
//         increment(state) {
//             state.count++;
//         }
//     }
// })

var appMain = createApp(App);
appMain.use(Vuex);
appMain.use(store);
appMain.use(router);
appMain.use(VueCookies);
appMain.mount('#app');


