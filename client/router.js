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
        { path: '/registro', component: () => import('../imports/views/Registro') },
        { path: '/tareas', component: () => import('../imports/views/EditorTareas') },
        { path: '/login', component: () => import('../imports/views/Login') },
        { path: '/registro', component: () => import('../imports/views/Registro') },
    ]
});

router.beforeEach(async (to, from, next) => {
    // const crear = await Accounts.createUser({username:'a@b.cl', email:'a@b.cl', password: 'popo', profile:{nombre:'euterpe'}});
    // const login = await Meteor.loginWithPassword('a@b.cl', 'popo')
    const user = await Meteor.userId()

    //proceder a cerrar sesión si lo pide
    if (to.path === '/logout') {
        await Meteor.logout();
        return next('/login');
    }

    Tracker.autorun(function() {
        let user = Meteor.user();
        //hay usuario
        if (user !== undefined && user !== null) {
            //almacenar cuenta en el programa y llevar al home
            store.commit('setUser', user);
            if (to.path === '/' || to.path === '/login') return next('/tareas');
            return next();
        } else if (to.path !== '/login' && to.path !== '/registro') {
            //redirigir al login si no esta logeado
            return next('/login');
        } else {
            //no hay excepciones, dejarlo pasar
            return next();
        }
    });


});

export default router;