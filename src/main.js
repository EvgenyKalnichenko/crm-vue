import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from './store';
import messagePligin from './utils/message.plugin'

createApp(App)
    .use(messagePligin)
    .use(store)
    .use(router)
    .mount('#app')