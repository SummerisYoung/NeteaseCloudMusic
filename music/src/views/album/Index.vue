<template>
  <div>
    <album-top :album="album.album"  v-if="this.album"/>
    <tab
      :items="items"
      tabLiStyle="margin-right:50px;border-bottom-width:5px; line-height: 30px"
      tabUlStyle="justify-content: flex-start;padding: 0 80px;border-bottom: 1px solid rgb(225,225,226)"
      :currentIndex="currentIndex"
      @changeTab="changeTab"
    />
    <loading v-if="$store.state.loading" />
    <div v-else>
      <song-list-two :songs="songs" v-if="this.currentIndex == 0" />
      <comment :head="false" :comments="comments" v-else-if="this.currentIndex == 1" />
      <description :description="description" v-else-if="this.currentIndex == 2" />
    </div>
  </div>
</template>

<script>
import Tab from "components/common/Tab";
import Loading from "components/common/Loading";
import SongListTwo from "components/common/SongListTwo";
import Comment from "components/common/Comment";
import AlbumTop from "./AlbumTop";
import Description from './Description'
export default {
  components: {
    Tab,
    Loading,
    SongListTwo,
    AlbumTop,
    Comment,
    Description
  },
  data() {
    return {
      album: null,
      songs: [],
      comments: [],
      description: [],
      items: [],
      currentIndex: -1
    }
  },
  created() {
    this.getData()
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
          this.showLoading(this.getDescription);
        }
      }
    },
  },
  methods: {
    async getData() {
      this.album = await this.get('/album?id=' + this.$route.query.id)
      this.items = [
        "歌曲列表",
        `评论(${this.album.album.info.commentCount})`,
        "专辑详情",
      ];
      this.currentIndex = 0;
    },
    getSongs() {
      this.songs = this.album.songs
    },
    async getComments() {
      // 请求评论信息
      this.comments = await this.get(
        "/comment/album?id=" + this.$route.query.id
      );
    },
    getDescription() {
      this.description = this.album.album.description.split('\n')
    },
    changeTab(index) {
      // 接受子组件传递过来的index值,修改当前下标
      this.currentIndex = index;
    }
  }
}
</script>

<style lang="less">

</style>
