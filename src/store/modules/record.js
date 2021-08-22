import firebase from "firebase/app";
import store from "../index";

export default {
    namespaced: true,
    action:{
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
        }
    }
}