import {createStore} from 'vuex';
import auth from './modules/auth';
import info from './modules/info';

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
      async fetchCurrency(){
          const key = '4598aa0aab6bd0ebe9c2036501c9ba68';
          const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
          return await res.json();
      }
    },
    getters: {
        error: s => s.error
    },
    modules: {
        auth,
        info
    },
})