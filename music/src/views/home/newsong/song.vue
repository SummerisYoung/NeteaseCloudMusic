<template>
  <loading v-if="$store.state.loading" />
  <song-list-one
    style="flex:1"
    :songs="songs"
    :icon="false"
    oneUlStyle="margin: 0 20px;border: 1px solid rgb(225,225,226)"
    indexStyle="text-align: center;margin: none"
    v-else
  >
    <li class="newsong-operate">
      <p>
        <i class="iconfont icon-play"></i>播放全部
      </p>
      <p>
        <i class="iconfont icon-favority"></i>收藏全部
      </p>
    </li>
  </song-list-one>
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
    active: {
      type: String,
      default: "全部",
    },
  },
  data() {
    return {
      songs: [],
      type: { 全部: 0, 华语: 7, 欧美: 96, 日本: 8, 韩国: 16 }
    };
  },
  created() {
    this.getData(this.type[this.active]);
  },
  methods: {
    getData(type = 0) {
      // 请求数据
      this.showLoading(async () => {
        this.songs = await this.get("/top/song?type=" + type).then(
          (r) => r.data
        );
      });
    },
  },
  watch: {
    active(val) {
      this.getData(this.type[this.active]);
    },
  },
};
</script>

<style lang="less">
.newsong-operate {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 15px 20px !important;
  font-size: 12px;
  &:hover {
    background: none !important;
  }
  p:first-child {
    display: flex;
    align-items: center;
    i {
      margin-right: 10px;
      line-height: 20px;
      font-size: 20px;
      text-align: center;
      border: 1px solid @red;
      border-radius: 50%;
      color: @red;
    }
  }
  p:last-child {
    display: flex;
    align-items: center;
    padding: 0px 15px;
    border: @border;
    border-radius: 5px;
    background: @light-background;
    i {
      margin-right: 5px;
    }
  }
}
</style>
