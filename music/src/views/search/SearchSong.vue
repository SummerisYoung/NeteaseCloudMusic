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
      <song-list-one :songs="songs" :highlightKeyword="keyword" />
    </div>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
import SongListOne from "components/common/SongListOne";
export default {
  components: {
    Loading,
    SongListOne,
  },
  props: {
    keyword: String,
  },
  data() {
    return {
      songs: [],
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      // 请求数据
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=1&limit=100"
      ).then((r) => r.result);
      this.songs = res.songs;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight("", this.keyword)}"，找到${res.songCount}首单曲`
      );
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
