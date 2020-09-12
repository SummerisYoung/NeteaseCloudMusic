import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './network/backend.js'
import utils from './utils/util'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(utils)
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
