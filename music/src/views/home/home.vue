<template>
<div id="index">
  <tab class="index-tab" :items="items" :currentIndex="currentIndex" @changeTab="changeTab"/>
  <component class="main" :is="homeComponent"></component>
</div>
</template>

<script>
import Tab from 'components/common/Tab'
import Personalized from 'views/home/personalized/personalized'
import Playlist from './playlist/playlist'
import Toplist from './toplist/toplist'
import Artist from './artist/artist'
import Newsong from './newsong/newsong'
export default {
  components: {
    Tab,Personalized,Playlist,Toplist,Artist,Newsong
  },
  data() {
    return {
      items: ['个性推荐','歌单','主播电台','排行榜','歌手','最新音乐'],
      homeTabComponent: ['Personalized','Playlist','radio','Toplist','Artist','newsong'],
      currentIndex: 0
    }
  },
  
  computed: {
    homeComponent() {
      return this.homeTabComponent[this.currentIndex]
    }
  },
  methods: {
    // 接受子组件传递过来的index值,修改当前下标
    changeTab(index){
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less">
#index {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    padding: 0 30px;

    .index-tab {
      margin: 0 20px;
      padding: 0 150px;
      height: 55px;
    }

    .main {
      display: flex;
      flex-direction: column;
      flex: 1;
      .content {
          height: 60%;
      }
    }
}
</style>
