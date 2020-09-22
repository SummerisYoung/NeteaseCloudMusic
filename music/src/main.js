import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './network/backend'
import utils from './utils/util'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(utils)
Vue.use(ElementUI);
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
