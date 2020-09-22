<template>
  <loading v-if="$store.state.loading" />
  <ul class="search-video" v-else>
    <li v-for="v in videos" :key="v.id">
      <div class="video-img">
        <img class="mid-img" :src="v.coverUrl + '?param=200y180'" />
        <p class="right-top">
          <i class="iconfont icon-video"></i>
          <span>{{numConvert(v.playTime)}}</span>
        </p>
        <p class="left-bottom">{{timeConvert(v.durationms / 1000)}}</p>
      </div>
      <p class="video-name text-ellipsis" v-html="highlight(v.title,keyword)"></p>
      <p class="video-creator">by {{v.creator[0].userName}}</p>
    </li>
  </ul>
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
      videos: [],
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=1014"
      ).then((r) => r.result);
      this.videos = res.videos;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight("", this.keyword)}"，找到${res.videoCount}个视频`
      );
    },
  },
};
</script>

<style lang="less">
.search-video {
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  li {
    width: 200px;
    margin: 20px;

    & > p {
      font-size: 12px;
      margin: 5px 0;
    }
    .video-img {
      position: relative;
      height: 180px;

      .right-top {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 50%;
        color: #fff;
        padding: 5px 10px;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0),
          rgba(0, 0, 0, 0.3)
        );
        text-align: right;
        transition: 0.1s 0.5s;
        i {
          margin-right: 5px;
        }
      }

      .left-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 5px 10px;
        color: #fff;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(0, 0, 0, 0.3)
        );
      }
    }
    img {
      width: 100%;
    }
    .video-name {
      width: 100%;
    }
    .video-creator {
      color: #999;
    }
  }
}
</style>
