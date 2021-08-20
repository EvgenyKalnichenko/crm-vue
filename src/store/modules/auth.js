import firebase from "firebase";
import {mapMutations} from "vuex";
import store from "../index";

export default {
    namespaced: true,
    state() {
        return {
            error: null,
            loading: false,
        }
    },
    mutations:{
        ...mapMutations('info', ['clearInfo']),
    },
    actions:{
        async login(context, {email, password}){
            try{
                // console.log(email, password)
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }catch (e) {
                store.commit('setError', e)
                throw e
            }
        },
        async logout(){
            await firebase.auth().signOut();
            store.commit('info/clearInfo');
        },
        async register({dispatch, commit}, {email, password, name}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid');

                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name,
                    password
                });
            }catch (e) {
                // console.log(e)
                commit('setError', e);
                throw e
            }
        },
        async getUid(){
            const user = await firebase.auth().currentUser;
            return user ? user.uid : null;
        },
    }
}