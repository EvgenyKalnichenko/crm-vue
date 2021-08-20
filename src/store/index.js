import {createStore} from 'vuex';
import auth from './modules/auth';

export default createStore({
    state() {
        return {
            error: null,
            loading: false,
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
    getters: {
        error: s => s.error
    },
    modules: {
        auth
    },
})