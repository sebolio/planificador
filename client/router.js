const { default: VueRouter } = require("vue-router");

import Router from 'vue-router';
import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
// import { createStore } from './store';
import store from './store';

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        { path: '/login', component: () => import('../imports/views/Login.vue') },
        { path: '/registro', component: () => import('../imports/views/Registro.vue') },
        { path: '/tareas', component: () => import('../imports/views/EditorTareas.vue') },
    ]
});

router.beforeEach(async (to, from, next) => {
    // const crear = await Accounts.createUser({username:'a@b.cl', email:'a@b.cl', password: 'popo', profile:{nombre:'euterpe'}});
    // const login = await Meteor.loginWithPassword('a@b.cl', 'popo')
    const user = await Meteor.userId()

    //si el usuario no está logeado y no está en la pantalla de login, llevarlo allá
    if (to.path !== '/login') {
        Tracker.autorun(function() {
            let user = Meteor.user();
            if (user !== undefined) {
                //almacenar cuenta en el programa
                store.commit('setUser', user);
                console.log('quedo', store.state.user.username);
                return next();
                
                //redirigir a tareas si estamos en /
                if (to.path === '/') return next('/tareas');
                if (to.path!=='/tareas') next('/tareas');

            } else {
                return next('/login');
            }
        });
    }

});

export default router;