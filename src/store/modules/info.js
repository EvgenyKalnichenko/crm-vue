import firebase from "firebase/app";

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