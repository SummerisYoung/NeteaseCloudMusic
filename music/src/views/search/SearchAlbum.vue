<template>
  <loading v-if="$store.state.loading" />
  <div class="search-album" v-else>
    <ul class="li-hover">
      <li v-for="a in albums" :key="a.id" @click="goAlbum(a.id)">
        <div class="bg"></div>
        <img class="tiny-img" :src="a.picUrl + '?param=50y50'" />
        <span class="search-item-name" v-html="highlight(a.name, keyword)"></span>
        <span>{{a.artist.name}}</span>
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
      albums: null,
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=10"
      ).then((r) => r.result);
      this.albums = res.albums;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight("", this.keyword)}"，找到${res.albumCount}张专辑`
      );
    },
  },
};
</script>

<style lang="less">
.search-album {
  ul li {
    .bg {
      position: absolute;
      left: 25px;
      width: 80px;
      height: 50px;
      background: url(/img/coverall.png);
      background-position: 135px -252px;
    }
  }
}
</style>
