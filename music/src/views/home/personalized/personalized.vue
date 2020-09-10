<template>
  <div>
    <swiper :swipers="banners"/>
    <play-list :playlists="playlists"/>
  </div>
</template>

<script>
import Swiper from '../../../components/common/Swiper'
import PlayList from './playlist'
export default {
  components: {
    Swiper,PlayList
  },
  data() {
    return {
      banners: [],          // banners
      playlists: [],        // 推荐歌单
      privatecontents: [],  // 独家放送
      newsongs: [],         // 最新音乐
      mvs: [],              // 推荐MV
      djprograms: []        // 主播电台
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 并发获取数据
    async getData() {
      [this.banners,this.playlists] = await Promise.all([this.getBanners(),this.getPlayList()])
    },
    // 获取banners
    getBanners() {
      return this.$axios.get('/banner?type=0').then(r => r.banners)
    },
    // 获取推荐歌单
    getPlayList() {
      return this.$axios.get('/personalized?limit=10').then(r => r.result)
    },
    // 获取独家放送
    getPrivateContent() {
      return this.$axios.get('/personalized/privatecontent')
    },
    // 获取最新音乐
    getNewSong() {
      return this.$axios.get('/personalized/newsong')
    },
    // 获取推荐MV
    getMV() {
      return this.$axios.get('/personalized/mv')
    },
    // 获取主播电台
    getDjProgram() {
      return this.$axios.get('/personalized/djprogram')
    }
  }
}
</script>

<style lang="less">

</style>