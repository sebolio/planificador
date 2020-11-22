/**
 * Seb-AS
 * 
 * Este es el componente principal utilizado por Vue para cargar el programa,
 * desde aquí definimos los distintos componentes y plugins que se usarán globalmente.
 * 
 * @author sebolio
 * @package seb-as
 * 
 */
import { Meteor } from 'meteor/meteor';
import store from './store'
import Vue from 'vue';
 
//componentes
import App from '../imports/App.vue';
import '../imports/api/tareas.js';

//meteor
import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);

//router
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter)

//app
Meteor.startup(() => {
  new Vue({
    el: '#app',
    router,
    store,
    ...App,
  });
});
