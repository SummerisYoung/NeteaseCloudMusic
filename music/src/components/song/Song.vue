<template>
  <el-scrollbar id="song-detail">
    <div class="close-detail" @click="closeDetail()">
      <i class="iconfont icon-narrow"></i>
    </div>

    <div class="song-box">
      <song-top :songDetail="songDetail"/>

      <div class="song-bottom">
        <song-comment :songDetail="songDetail"/>
        <song-recommend :songDetail="songDetail"/>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapState } from "vuex";
import SongTop from './SongTop'
import SongComment from './SongComment'
import SongRecommend from './SongRecommend'
export default {
  components: {
    SongTop,SongComment,SongRecommend
  },
  computed: {
    ...mapState(["songDetail"]),
  },
  methods: {
    // 关闭歌曲详情页
    closeDetail() {
      // 关闭歌词滚动事件
      this.$store.state.audio.ontimeupdate = null;
      this.$emit("closeDetail");
    },
  },
};
</script>

<style lang="less">
#song-detail {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 5;
  width: 100vw;
  height: 100%;
  background: rgb(250, 250, 250);
  transition: 0.5s;

  .close-detail {
    position: absolute;
    top: 30px;
    right: 70px;
    z-index: 5;
    padding: 5px;
    width: 40px;
    border-radius: 5px;
    text-align: center;
    background: @dark-background;
    border: @border;

    i {
      font-size: 20px;
    }
  }

  .song-box {
    position: relative;
    padding: 0 140px;

    .song-bottom {
      display: flex;
    }
  }
}
</style>
