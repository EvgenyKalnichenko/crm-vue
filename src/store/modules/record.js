import firebase from "firebase/app";
import store from "../index";

export default {
    namespaced: true,
    actions:{
        async createRecord(context, record){
            console.log('createRecord')
            try {
                const uid = await store.dispatch('auth/getUid');
                return await  firebase.database().ref(`/users/${uid}/records`).push(record)
            }catch (e) {
                context.commit('setError', e);
                console.log(e)
                throw e
            }
        },
        async fetchRecords(context){
            try {
                const uid = await store.dispatch('auth/getUid');
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}

                return Object.keys(records).map(key => ({...records[key], id: key}))
            }catch (e) {
                console.log(e)
                context.commit('setError', e);
                throw e
            }
        }
    }
}