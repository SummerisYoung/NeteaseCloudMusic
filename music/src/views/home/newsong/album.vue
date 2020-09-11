<template>
  <div class="new-album">
    <h2>本周新碟</h2>
    <play-list-ul :playlists="albums" />
  </div>
</template>

<script>
import PlayListUl from "components/common/PlayListUl";
export default {
  components: {
    PlayListUl,
  },
  props: {
    active: {
      type: String,
      default: "ALL",
    },
  },
  data() {
    return {
      albums: [],
      area: { 全部: "ALL", 华语: "ZH", 欧美: "EA", 日本: "JP", 韩国: "KR" },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(area = "ALL") {
      // 加载loading
      this.$store.commit("changeLoading", true);
      // 请求数据
      this.$axios.get("/top/album?area=" + area).then((r) => {
        this.albums = r.monthData;
        // 取消loading
        this.$store.commit("changeLoading", false);
      });
    },
  },
  watch: {
    active(val) {
      this.getData(this.area[this.active]);
    },
  },
};
</script>

<style lang="less">
.new-album {
  display: flex;
  border-top: @border;
  h2 {
    margin: 15px 20px;
    width: 20px;
    font-size: 24px;
  }
}
</style>
