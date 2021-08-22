import {createStore} from 'vuex';
import auth from './modules/auth';
import info from './modules/info';
import category from "./modules/category";
import record from "./modules/record";
import firebase from "firebase";


export default createStore({
    state() {
        return {
            error: null,
            loading: false,
            currency: null,
        }
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async fetchCurrency() {
            const key = '4598aa0aab6bd0ebe9c2036501c9ba68';
            const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
            return await res.json();
        },
        async createRecord(context, record) {
            console.log('createRecord')
            try {
                const user = await firebase.auth().currentUser;
                const uid = user ? user.uid : null;

                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch (e) {
                context.commit('setError', e);
                console.log(e)
                throw e
            }
        }
    },
    getters: {
        error: s => s.error
    },
    modules: {
        auth,
        info,
        category,
        record
    },
})