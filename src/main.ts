import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './registerServiceWorker';
import VueGapi from 'vue-gapi';
import { Google } from './config/google';
const { apiKey, clientId, discoveryDocs, scope } = Google;

Vue.use(VueGapi, {
  apiKey,
  clientId,
  discoveryDocs,
  scope,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
