<template>
  <div id="index">
    <tab
      class="index-tab"
      :items="items"
      :currentIndex="currentIndex"
      tabUlStyle="border-bottom: 1px solid rgb(225,225,226)"
      tabLiStyle="line-height:55px"
      @changeTab="changeTab"
    />
    <component class="main" :is="homeComponent" @changeTab="changeTab"></component>
  </div>
</template>

<script>
import Tab from "components/common/Tab";
import Personalized from "views/home/personalized/personalized";
import PlayList from "./playlist/playlist";
import TopList from "./toplist/toplist";
import Artist from "./artist/artist";
import NewSong from "./newsong/newsong";
export default {
  components: {
    Tab,
    Personalized,
    PlayList,
    TopList,
    Artist,
    NewSong,
  },
  data() {
    return {
      items: ["个性推荐", "歌单", "主播电台", "排行榜", "歌手", "最新音乐"],
      homeTabComponent: [
        "Personalized",
        "PlayList",
        "radio",
        "TopList",
        "Artist",
        "NewSong",
      ],
      currentIndex: 0,
    };
  },
  computed: {
    homeComponent() {
      return this.homeTabComponent[this.currentIndex];
    },
  },
  methods: {
    // 接受子组件传递过来的index值,修改当前下标
    changeTab(index) {
      this.currentIndex = index;
    },
  },
};
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
