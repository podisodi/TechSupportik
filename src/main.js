import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  baseURL: "https://localhost:7164/",
  withCredentials: true
});

Vue.use(FloatingVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
