import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './network/backend.js'
import utils from './utils/util'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
