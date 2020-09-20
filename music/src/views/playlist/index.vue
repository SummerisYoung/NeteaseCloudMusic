<template>
  <div>
    <playlist-top :playlist="playlist"  v-if="this.playlist" />
    <tab :items="items" :tabLiStyle="tabLiStyle" :tabUlStyle="tabUlStyle" :currentIndex="currentIndex" @changeTab="changeTab" />
    <loading v-if="$store.state.loading"/>
    <div v-else>
      <playlist :songs="songs" v-if="this.currentIndex == 0" />
      <comment :head="false" :comments="comments" v-else-if="this.currentIndex == 1" />
      <subscriber :subscribers="subscribers" v-else-if="this.currentIndex == 2" />
    </div>
  </div>
</template>

<script>
import Tab from "components/common/Tab";
import Loading from "components/common/Loading"
import Comment from "components/common/Comment";
import PlaylistTop from "./PlaylistTop";
import Playlist from "./Playlist";
import Subscriber from './Subscriber'
export default {
  components: {
    Tab,
    Loading,
    Comment,
    PlaylistTop,
    Playlist,
    Subscriber
  },
  data() {
    return {
      playlist: {},
      songs: [],
      comments: [],
      subscribers: [],
      items: [],
      currentIndex: -1,
      tabLiStyle: "margin-right:50px;border-bottom-width:4px; line-height: 30px",
      tabUlStyle: "justify-content: flex-start;padding: 0 80px",
    };
  },
  created() {
    this.getData();
  },
  watch: {
    currentIndex(val) {
      switch (val) {
        case 0: {
          this.showLoading(this.getSongs);
          break;
        }
        case 1: {
          this.showLoading(this.getComments);
          break;
        }
        case 2: {
          this.showLoading(this.getsubscribers);
        }
      }
    },
  },
  methods: {
    async getData() {
      // 请求歌单信息
      this.playlist = await this.get(
        "/playlist/detail?id=" + this.$route.query.id
      ).then((r) => r.playlist);
      this.items = [
        "歌曲列表",
        `评论(${this.playlist.commentCount})`,
        "收藏者",
      ];
      this.currentIndex = 0;
    },
    async getSongs() {
      // 请求歌曲列表
      let songsArr = [];
      this.playlist.trackIds.forEach((p) => {
        songsArr.push(p.id);
      });
      this.songs = await this.get(
        "/song/detail?ids=" + songsArr.join(",")
      ).then((r) => r.songs);
    },
    async getComments() {
      // 请求评论信息
      this.comments = await this.get(
        "/comment/playlist?id=" + this.playlist.id
      );
    },
    async getsubscribers() {
      // 请求收藏者信息
      this.subscribers = await this.get(
        "/playlist/subscribers?id=" + this.playlist.id + "&limit=100"
      ).then(r => r.subscribers);
    },
    changeTab(index) {
      // 接受子组件传递过来的index值,修改当前下标
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less">
.playlist-bottom {
  .section {
    display: flex;
    height: 30px;
    border-bottom: @border;

    li {
      margin-left: 100px;
      line-height: 100%;
      box-sizing: content-box;
      cursor: pointer;
    }

    .active {
      color: @red;
      border-bottom: 5px solid @red;
      box-sizing: border-box;
    }
  }
}
</style>
