import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,  // 加载loading
    songDetail: '',  // 正在播放的歌曲detail
    songUrl: '',     //正在播放的歌曲url
    audio: null,    // 音频标签
    playlist: [],  // 播放列表
    playing: -1,  // 当前播放的歌曲在播放列表中的位置
  },
  mutations: {
    // 修改loding状态
    changeLoading(state, isLoading) {
      state.loading = isLoading;
    },
    // 修改正在播放的歌曲
    changeSongDetail(state,songDetail) {
      state.songDetail = songDetail
    },
    changeSongUrl(state,songUrl) {
      state.songUrl = songUrl
    },
    // 保存音频标签
    getAudio(state,audio) {
      state.audio = audio
    },
    // 修改歌曲列表
    changePlayList(state,list) {
      state.playlist = list
    },
    // 修改正在播放的歌曲在播放列表中的位置
    changePlaying(state,playing) {
      state.playing = playing
    }
  },
  actions: {
    changeSongDetail(context,songDetail) {
      context.commit('changeSongDetail',songDetail)
    },
    changeSongUrl(context,songUrl) {
      context.commit('changeSongUrl',songUrl)
    }
  },
  modules: {
  }
})
