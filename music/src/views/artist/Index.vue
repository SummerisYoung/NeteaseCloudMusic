<template>
  <div>
    <artistTop :artist="artist.artist" v-if="artist" />
    <tab
      :items="items"
      tabLiStyle="margin-right:50px;border-bottom-width:5px; line-height: 30px"
      tabUlStyle="justify-content: flex-start;padding: 0 80px;border-bottom: 1px solid rgb(225,225,226)"
      :currentIndex="currentIndex"
      @changeTab="changeTab"
    />
    <loading v-if="$store.state.loading" />
    <div v-else>
      <album :hotSongs="hotSongs" v-if="currentIndex == 0" />
      <mv-list :mvs="mvs" v-else-if="currentIndex == 1"/>
      <description :description="description" v-else-if="currentIndex == 2"/>
      <!-- <similar :similar="similar" v-else-if="currentIndex == 3"/> -->
    </div>
  </div>
</template>

<script>
import Tab from "components/common/Tab";
import Loading from "components/common/Loading";
import ArtistTop from "./ArtistTop";
import Album from "./Album";
import MvList from "components/common/MvList";
import Description from './Description';
// import Similar from './Similar';
export default {
  components: {
    Tab,
    Loading,
    ArtistTop,
    Album,
    MvList,
    Description,
    // Similar
  },
  data() {
    return {
      artist: null,
      hotSongs: [],
      mvs: [],
      description: [],
      similar: [],
      items: ["专辑", "MV", "歌手详情", "相似歌手"],
      currentIndex: -1,
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  watch: {
    currentIndex(val) {
      switch (val) {
        case 0: {
          this.showLoading(this.getAlbums);
          break;
        }
        case 1: {
          this.showLoading(this.getMvs);
          break;
        }
        case 2: {
          this.showLoading(this.getDescription);
          break;
        }
        // case 3: {
        //   this.showLoading(this.getSimilar)
        // }
      }
    },
  },
  methods: {
    async getData() {
      this.artist = await this.get("/artists?id=" + this.$route.query.id);
      this.currentIndex = 0;
    },
    getAlbums() {
      this.hotSongs = this.artist.hotSongs;
    },
    async getMvs() {
      this.mvs = await this.get("/artist/mv?id=" + this.$route.query.id).then(r => r.mvs)
    },
    async getDescription() {
      this.description = await this.get("/artist/desc?id=" + this.$route.query.id);
      // 歌手描述数组
      let arr = [];
      // 把自己写的简介填到介绍里
      this.description.introduction.unshift({
        ti: this.artist.artist.name + "简介",
        txt: this.description.briefDesc,
      });
      // 分割介绍数组
      this.description.introduction.forEach(i => {
        i.txt = i.txt.split('\n')
      });
    },
    // async getSimilar() {
    //   this.similar = await this.get('/simi/artist?id=' + this.$route.query.id)
    // },
    changeTab(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style>
</style>
