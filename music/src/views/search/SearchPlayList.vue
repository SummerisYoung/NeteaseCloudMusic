<template>
  <loading v-if="$store.state.loading" />
  <div class="search-playlist" v-else>
    <ul class="li-hover">
      <li v-for="p in playlists" :key="p.id" @click="goPlayList(p.id)">
        <img class="tiny-img" :src="p.coverImgUrl + '?param=50y50'" />
        <span class="search-item-name" v-html="highlight(p.name, keyword)"></span>
        <span class="track-count">{{p.trackCount}}首</span>
        <span class="creator">by  {{p.creator.nickname}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
export default {
  components: {
    Loading,
  },
  props: {
    keyword: String,
  },
  data() {
    return {
      playlists: null,
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=1000"
      ).then((r) => r.result);
      this.playlists = res.playlists;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight("", this.keyword)}"，找到${res.playlistCount}张专辑`
      );
    },
  },
};
</script>

<style lang="less">
.search-playlist {
  .track-count,.creator {
    color: #777;
  }
  .track-count {
    width: 20%;
  }
}
</style>
