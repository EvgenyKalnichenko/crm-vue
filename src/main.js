import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from './store';
import messagePligin from './utils/message.plugin';

import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBPyHlC4TaEyqBM4_8hFbp_acDXzrMHRpU",
    authDomain: "crm-vue-2faa8.firebaseapp.com",
    databaseURL: "https://crm-vue-2faa8-default-rtdb.firebaseio.com",
    projectId: "crm-vue-2faa8",
    storageBucket: "crm-vue-2faa8.appspot.com",
    messagingSenderId: "874428377623",
    appId: "1:874428377623:web:ca050cb13488e23caaca52"
};

firebase.initializeApp(firebaseConfig)

let flag = false;

firebase.auth().onAuthStateChanged(() => {
    if(!flag){
        flag = true;
        createApp(App)
            .use(messagePligin)
            .use(store)
            .use(router)
            .mount('#app')
    }
});

