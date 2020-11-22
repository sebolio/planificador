import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
 
//componentes
import App from '../imports/ui/App.vue';
import '../imports/api/tareas.js';

//meteor
import VueMeteorTracker from 'vue-meteor-tracker';
Vue.use(VueMeteorTracker);

//app
Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});
