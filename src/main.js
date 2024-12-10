import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import router from "./router/"
import 'vue-toastification/dist/index.css';
import './style.css'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia()

app.use(router);
app.use(pinia);
app.use(Toast);

app.mount('#app');
