import firebase from "firebase/app";
import store from "../index";

export default  {
    actions:{
        async fetchCategory(){
            try {
                const uid = await store.dispatch('auth/getUid');
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}

                //const cats = [];
                // Object.keys(categories).forEach(key => {
                //     cats.push({
                //         title: categories[key].title,
                //         limit: categories[key].limit,
                //         id: key
                //     })
                // })

                const cats = Object.keys(categories).map(key => ({...categories[key], id: key}))
                return cats
            }catch (e) {
                console.log(e);
                store.commit('setError', e)
                throw e
            }
        },
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
        },
        async updateCategory(context, {title, limit, id}){
            try {
                const uid = await store.dispatch('auth/getUid');
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
            }catch (e) {
                console.log(e);
                store.commit('setError', e)
                throw e
            }
        }
    }
}