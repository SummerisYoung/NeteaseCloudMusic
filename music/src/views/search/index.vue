<template>
  <div id="searchList">
    <p class="search-prompt" v-html="prompt"></p>
    <tab
      class="search-tab"
      :items="items"
      :currentIndex="currentIndex"
      @changeTab="changeTab"
      tabLiStyle="border-bottom-width:4px"
      tabUlStyle="border-bottom: 1px solid rgb(225,225,226)"
    />
    <component :is="searchComponent" :keyword="$route.query.keyword" @searchPrompt="searchPrompt"></component>
  </div>
</template>

<script>
import Tab from "components/common/Tab";
import SearchSong from "./SearchSong";
import SearchArtist from "./SearchArtist";
import SearchAlbum from "./SearchAlbum";
import SearchVideo from './SearchVideo';
import SearchPlayList from './SearchPlayList';
import SearchLyric from './SearchLyric';
import SearchRadio from './SearchRadio';
import SearchUser from './SearchUser'
export default {
  components: {
    Tab,
    SearchSong,
    SearchArtist,
    SearchAlbum,
    SearchVideo,
    SearchPlayList,
    SearchLyric,
    SearchRadio,
    SearchUser
  },
  data() {
    return {
      items: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌单",
        "歌词",
        "主播电台",
        "用户",
      ],
      SearchTabComponent: [
        "SearchSong",
        "SearchArtist",
        "SearchAlbum",
        "SearchVideo",
        "SearchPlayList",
        "SearchLyric",
        "SearchRadio",
        "SearchUser",
      ],
      currentIndex: 0,
      prompt: "",
    };
  },
  computed: {
    searchComponent() {
      return this.SearchTabComponent[this.currentIndex];
    },
  },
  methods: {
    // 接受子组件传递过来的index值,修改当前下标
    changeTab(index) {
      this.currentIndex = index;
    },
    // 接受子组件传递过来的搜索信息
    searchPrompt(prompt) {
      this.prompt = prompt;
    },
  },
};
</script>

<style lang="less">
#searchList {
  .search-prompt {
    margin: 40px;
    font-size: 12px;
  }
  .search-tab {
    height: 30px;
    padding-left: 10px;
  }
  .search-content {
    border-top: @border;
  }
}
</style>
