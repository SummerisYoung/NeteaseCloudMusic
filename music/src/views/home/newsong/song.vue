<template>
<song-list-ul style="flex:1" :songs="songs" :icon="false">
  <li>
    <div class="newsong-operate">
      <p>
        <i class="iconfont icon-play"></i>播放全部
      </p>
      <p>
        <i class="iconfont icon-favority"></i>收藏全部
      </p>
    </div>
  </li>
</song-list-ul>
</template>

<script>
import SongListUl from "components/common/SongListUl";
export default {
  components: {
    SongListUl,
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
      type: { 全部: 0, 华语: 7, 欧美: 96, 日本: 8, 韩国: 16 },
    };
  },
  created() {
    this.getData(this.type[this.active])
  },
  methods: {
    getData(type = 0) {
      // 加载loading
      this.$store.commit('changeLoading',true)
      // 请求数据
      this.$axios.get("/top/song?type=" + type).then((r) => {
        this.songs = r.data;
        // 取消loading
        this.$store.commit('changeLoading',false)
      });
    }
  },
  watch: {
    active(val) {
      this.getData(this.type[this.active])
    }
  }
};
</script>

<style lang="less">
.newsong-operate {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 5px 20px;
  font-size: 12px;
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
