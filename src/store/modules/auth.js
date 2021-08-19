import firebase from "firebase";

export default {
    namespaced: true,
    state() {
        return {
            loading: false,
        }
    },
    actions:{
        async login(context, {email, password}){
            try{
                console.log('loginbbb', email)
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }catch (e) {
                console.log(e)
                throw e
            }
        }
    }
}