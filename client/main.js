import { Meteor } from 'meteor/meteor';
import { store } from './store'
// import { sync } from 'vuex-router-sync';
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

//vuex
// const store = createStore()
// sync(store, router)

//app
Meteor.startup(() => {
  new Vue({
    el: '#app',
    router,
    store,
    ...App,
  });
});
