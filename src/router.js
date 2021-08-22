import { createRouter, createWebHistory } from 'vue-router'
import firebase from "firebase/app";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            meta: {layout: 'empty'},
            component: () => import('./views/Login')
        },
        {
            path: '/register',
            name: 'register',
            meta: {layout: 'empty'},
            component: () => import('./views/Register')
        },
        {
            path: '/categories',
            name: 'categories',
            meta: {layout: 'main', auth: true},
            component: () => import('./views/Categories')
        },
        {
            path: '/detail-record',
            name: 'detail-record',
            meta: {layout: 'main', auth: true},
            component: () => import('./views/Detail-record')
        },
        {
            path: '/history',
            name: 'history',
            meta: {layout: 'main', auth: true},
            component: () => import('./views/History')
        },
        {
            path: '/',
            name: 'home',
            meta: {layout: 'main', auth: true},
            component: () => import('./views/Home')
        },
        {
            path: '/planning',
            name: 'planning',
            meta: {layout: 'main', auth: true},
            component: () => import('./views/Planning')
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {layout: 'main', auth: true},
            component: () => import('./views/Profile')
        },
        {
            path: '/record',
            name: 'record',
            meta: {layout: 'main', auth: true},
            component: () => import('./views/Record')
        }
    ],
})

router.beforeEach((to, from, next)=>{
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.auth);

    if(requireAuth && !currentUser){
        next('/login?message=login');
    }else {
        next();
    }
})

export default router