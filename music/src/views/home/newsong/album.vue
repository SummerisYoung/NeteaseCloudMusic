<template>
  <div class="new-album">
    <h2>本周新碟</h2>
    <loading v-if="$store.state.loading" />
    <play-list-ul :playlists="albums" :albumImg="true" v-else/>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
import PlayListUl from "components/common/PlayListUl";
export default {
  components: {
    Loading,PlayListUl
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
      // 请求数据
      this.showLoading(async () => {
        this.albums = await this.get("/top/album?area=" + area).then((r) => r.monthData);
      })
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
