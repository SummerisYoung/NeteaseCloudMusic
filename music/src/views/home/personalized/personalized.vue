<template>
<div>
  <loading v-if="$store.state.loading"/>
  <div v-else>
    <swiper v-if="swipers.length" :swipers="swipers"/>
    <play-list :playlists="playlists" @changeTab="changeTab"/>
    <private-content :privatecontents="privatecontents" />
    <new-song :newsongs="newsongs" @changeTab="changeTab"/>
    <mv :mvs="mvs" @changeTab="changeTab"/>
    <dj-program :djprograms="djprograms" @changeTab="changeTab"/>
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
      swipers: [],          // swipers
      playlists: [],        // 推荐歌单
      privatecontents: [],  // 独家放送
      newsongs: [],         // 最新音乐
      mvs: [],              // 推荐MV
      djprograms: []       // 主播电台
    }
  },
  created() {
    this.showLoading(this.getData)
  },
  methods: {
    async getData() {
      // 并发获取数据
      [
      this.swipers,
      this.playlists,
      this.privatecontents,
      this.newsongs,
      this.mvs,
      this.djprograms
      ] = await this.all([
        this.getSwipers(),
        this.getPlayLists(),
        this.getPrivateContents(),
        this.getNewSongs(),
        this.getMVs(),
        this.getDjPrograms()
      ])
      
    },
    // 获取swipers
    getSwipers() {
      return this.get('/banner?type=0').then(r => r.banners)
    },
    // 获取推荐歌单
    getPlayLists() {
      return this.get('/personalized?limit=10').then(r => r.result)
    },
    // 获取独家放送
    getPrivateContents() {
      return this.get('/personalized/privatecontent').then(r => r.result)
    },
    // 获取最新音乐
    getNewSongs() {
      return this.get('/personalized/newsong').then(r => r.result.map(n => n.song))
    },
    // 获取推荐MV
    getMVs() {
      return this.get('/personalized/mv').then(r => r.result)
    },
    // 获取主播电台
    getDjPrograms() {
      return this.get('/personalized/djprogram').then(r => r.result)
    },
    changeTab(index) {  // 点击了更多
      console.log(index);
      this.$emit('changeTab',index)
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

  &>span {
    cursor: pointer;
  }
}
.block-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
}
</style>
