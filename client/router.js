/**
 * Router
 * 
 * Esta librería implementa la navegación por rutas protegidas por autenticación,
 * utilizando el enrutador de Vue, el manejador de estados Vuex y el gestor de usuarios de Meteor
 * 
 * @author sebolio
 * @package seb-as
 * 
 */
import Router from 'vue-router';
import { Meteor } from 'meteor/meteor';
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
            if (to.path === '/' || to.path === '/login' || to.path === '/registro') return next('/tareas');
            return next();
        } else if (to.path !== '/login' && to.path !== '/registro') {
            //redirigir al login si no esta logeado, pero esperar un poco para evitar parpadeo
            setTimeout(_=> next('/login'), 800);
        } else {
            //no hay excepciones, dejarlo pasar
            return next();
        }
    });


});

export default router;