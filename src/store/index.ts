import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import vehicles from './modules/vehicles';
import events from './modules/events';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    vehicles,
    events,
    user,
  },
});
