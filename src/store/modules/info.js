import firebase from "firebase/app";
import store from "../index";

export default {
    namespaced: true,
    state() {
        return {
            info: {},
            error: null,
            loading: false,
        }
    },
    mutations:{
        setInfo(state, info){
            state.info = info;
        },
        clearInfo(state){
            state.info = {};
        }
    },
    actions:{
        async updateInfo(context, toUpdate){
            try{
                console.log(toUpdate);
                const uid = await store.dispatch('auth/getUid');
                const updateData = {...context.getters.info};
                updateData.bill = toUpdate;
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                context.commit('setInfo', updateData);
            }catch (e) {
                console.log(e)
                context.commit('setError', e);
                throw e
            }
        },
        async fetchInfo({commit}){
            try{
                const user = await firebase.auth().currentUser;
                const uid = user ? user.uid : null;
                // console.log(uid);
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
                commit('setInfo', info);
            }catch (e) {
                console.log(e)
            }
        }
    },
    getters:{
        info: s => s.info
    }
}