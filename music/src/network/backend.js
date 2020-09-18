import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export default {
  install: function(Vue) {
    Vue.prototype.get = function(url) {
      return axios.get(url).then(r => r.data)
    }

    Vue.prototype.post = function(url,data) {
      return axios.post(url + '?_=' + Date.now(), data)
    }

    Vue.prototype.all = function(arr) {
      return axios.all(arr)
    }
  }
}
