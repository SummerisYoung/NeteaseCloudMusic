<template>
  <loading v-if="$store.state.loading" />
  <div class="search-artist" v-else>
    <ul class="li-hover">
      <li v-for="a in artists" :key="a.id" @click="goArtist(a.id)">
        <img class="tiny-img" :src="a.picUrl + '?param=50y50'" />
        <span v-html="highlight(a.name, keyword)"></span>
        <span>
          <i class="iconfont icon-user"></i>
        </span>
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
      artists: [],
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=100"
      ).then((r) => r.result);
      this.artists = res.artists;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight("", this.keyword)}"，找到${
          res.artistCount
        }位歌手`
      );
    },
  },
};
</script>

<style lang="less">
.search-artist {
  span {
    margin-right: 20px;
  }

  i {
    line-height: 20px;
    font-size: 12px;
    font-weight: 900;
    text-align: center;
    border: 1px solid rgba(198, 47, 47, 0.3);
    border-radius: 50%;
    color: @red;
  }
}
</style>
