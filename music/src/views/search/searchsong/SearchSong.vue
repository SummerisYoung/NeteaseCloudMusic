<template>
  <div>
    <loading v-if="$store.state.loading" />
    <div v-else>
      <ul class="search-song-title">
        <li style="width:5.5%"></li>
        <li style="width:5%">操作</li>
        <li style="width:40%">音乐标题</li>
        <li style="width:15%">歌手</li>
        <li style="width:28%">专辑</li>
        <li style="width:5%">时长</li>
      </ul>
      <song-list-ul :songs="songs" :highlightKeyword="keyword"></song-list-ul>
    </div>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
import SongListUl from "components/common/SongListUl";
export default {
  components: {
    Loading,
    SongListUl,
  },
  data() {
    return {
      songs: [],
      keyword: this.$route.query.keyword,
    };
  },
  created() {
    this.getData();
  },
  watch: {
    $route(val) {
      this.keyword = val.query.keyword;
      this.getData();
    },
  },
  methods: {
    // 获取数据
    getData() {
      // 加载loading
      this.$store.commit("changeLoading", true);
      // 请求数据
      this.$axios
        .get("/search?keywords=" + this.keyword + "&type=1&limit=100")
        .then((r) => {
          this.songs = r.result.songs;
          // 把搜索统计返给父级
          this.$emit(
            "searchPrompt",
            `搜索"${this.highlight("", this.keyword)}"，${
              r.result.songCount
            }首单曲`
          );
          // 取消loading
          this.$store.commit("changeLoading", false);
        });
    },
  },
};
</script>

<style lang="less">
.search-song-title {
  display: flex;
  border-top: @border;
  border-bottom: @border;
  font-size: 12px;

  li {
    line-height: 30px;
    text-indent: 1em;
    border-right: @border;

    &:last-child {
      border: none;
    }
  }
}
</style>
