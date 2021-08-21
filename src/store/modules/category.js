import firebase from "firebase";
import store from "../index";

export default  {
    actions:{
        async createCategory(context, {title, limit}){
            try {
                const uid = await store.dispatch('auth/getUid');
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
                return {title, limit, id: category.key}
            }catch (e) {
                console.log(e);
                store.commit('setError', e)
                throw e
            }
        }
    }
}