import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from './store';
import messagePligin from './utils/message.plugin';

import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCYJXFyFRBCwaYh52b14QDw5iHXb4P7a5c",
    authDomain: "tasks-vue-projects.firebaseapp.com",
    databaseURL: "https://tasks-vue-projects-default-rtdb.firebaseio.com",
    projectId: "tasks-vue-projects",
    storageBucket: "tasks-vue-projects.appspot.com",
    messagingSenderId: "723048950159",
    appId: "1:723048950159:web:3797cb95eb4b2d77efc3fa"
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

