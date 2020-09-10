import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,  //加载loading
  },
  mutations: {
    // 修改loding状态
    changeLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {

  },
  modules: {
  }
})
