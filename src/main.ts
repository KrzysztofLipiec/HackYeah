import './registerServiceWorker';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue from 'vue';

import App from './App.vue';
import router from './router';
import { state } from './state';

if (!window.location.href.startsWith('http://localhost:8080/')) {
  state.apiUrl = "https://hyback.dev.zbic.in/"
}

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
