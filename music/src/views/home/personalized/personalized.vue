<template>
<div>
  <loading v-if="personalizedLoading"/>
  <div v-else>
    <swiper :swipers="banners"/>
    <play-list :playlists="playlists"/>
    <private-content :privatecontents="privatecontents" />
    <new-song :newsongs="newsongs" />
    <mv :mvs="mvs" />
    <dj-program :djprograms="djprograms" />
  </div>
</div>
</template>

<script>
import Loading from 'components/common/Loading' 
import Swiper from 'components/common/Swiper'
import PlayList from './playlist'
import PrivateContent from './privatecontent'
import NewSong from './newsong'
import Mv from './mv'
import DjProgram from './djprogram'
export default {
  components: {
    Loading,Swiper,PlayList,PrivateContent,NewSong,Mv,DjProgram
  },
  data() {
    return {
      banners: [],          // banners
      playlists: [],        // 推荐歌单
      privatecontents: [],  // 独家放送
      newsongs: [],         // 最新音乐
      mvs: [],              // 推荐MV
      djprograms: [],       // 主播电台
      personalizedLoading: true // 是否开启loading
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 并发获取数据
    async getData() {[
      this.banners,
      this.playlists,
      this.privatecontents,
      this.newsongs,
      this.mvs,
      this.djprograms
      ] = await Promise.all([
        this.getBanners(),
        this.getPlayLists(),
        this.getPrivateContents(),
        this.getNewSongs(),
        this.getMVs(),
        this.getDjPrograms()
      ])
      this.personalizedLoading = false
    },
    // 获取banners
    getBanners() {
      return this.$axios.get('/banner?type=0').then(r => r.banners)
    },
    // 获取推荐歌单
    getPlayLists() {
      return this.$axios.get('/personalized?limit=10').then(r => r.result)
    },
    // 获取独家放送
    getPrivateContents() {
      return this.$axios.get('/personalized/privatecontent').then(r => r.result)
    },
    // 获取最新音乐
    getNewSongs() {
      return this.$axios.get('/personalized/newsong').then(r => r.result)
    },
    // 获取推荐MV
    getMVs() {
      return this.$axios.get('/personalized/mv').then(r => r.result)
    },
    // 获取主播电台
    getDjPrograms() {
      return this.$axios.get('/personalized/djprogram').then(r => r.result)
    }
  }
}
</script>

<style lang="less">
.block-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10px;
  margin: 0 20px;
  border-bottom: @border;

  h2 {
      font-size: 20px;
      font-weight: 500;
  }

  span {
      font-size: 12px;
      font-weight: 300;
  }
}
</style>
