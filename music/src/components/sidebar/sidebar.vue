<template>
  <div id="sidebar">
    <div class="sidebar-item">
      <p>推荐</p>
      <ul>
        <li class="active">
          <i class="iconfont icon-findmusic"></i>发现音乐
        </li>
        <li>
          <i class="iconfont icon-hotpot"></i>私人FM
        </li>
        <li>
          <i class="iconfont icon-broadcast"></i>LOOK直播
        </li>
        <li>
          <i class="iconfont icon-video"></i>视频
        </li>
        <li>
          <i class="iconfont icon-friend"></i>朋友
        </li>
      </ul>
    </div>

    <div class="sidebar-item">
      <p>我的音乐</p>
      <ul>
        <li>
          <i class="iconfont icon-localmusic"></i>本地音乐
        </li>
        <li>
          <i class="iconfont icon-download"></i>下载管理
        </li>
      </ul>
    </div>

    <div class="sidebar-item">
      <div class="customize">
        <p>创建的歌单</p>
        <p>
          <i class="iconfont icon-xinjian"></i>
          <i class="iconfont icon-down"></i>
        </p>
      </div>
      <ul>
        <li>
          <i class="iconfont icon-love"></i>我喜欢的音乐
          <i class="iconfont icon-B"></i>
        </li>
      </ul>
    </div>

    <transition name="fade">
      <div class="footer-song" v-if="song">
        <div class="footer-img" @click="openDetail()">
          <img class="tiny-img" :src="song.al.picUrl + '?param=50y50'" />
          <i class="iconfont icon-full"></i>
        </div>
        <div class="song-text">
          <p class="text-ellipsis" v-html="songTitle"></p>
          <p class="text-ellipsis" v-html="author(song.ar)"></p>
        </div>
        <div class="song-text">
          <i class="iconfont icon-love"></i>
          <i class="iconfont icon-share"></i>
        </div>
      </div>
    </transition>
    <transition name="enlarge">
      <song v-if="isDetail" :isDetail="isDetail" @closeDetail="closeDetail"/>
    </transition>
  </div>
</template>

<script>
import Song from "components/song/Song";
import { mapState } from "vuex";
export default {
  components: {
    Song,
  },
  data() {
    return {
      isDetail:false // 是否打开歌曲详情页
    }
  },
  computed: {
    songTitle() {
      let alia =
        this.song.alia && this.song.alia.length
          ? '<span style="color:#999"> (' + this.song.alia + ") <span>"
          : "";
      return this.song.name + alia;
    },
    ...mapState({
      // 映射 this.song 为 store.state.song
      song: "songDetail",
    }),
  },
  methods: {
    // 打开歌曲详情页
    openDetail() {
      this.isDetail = true
    },
    // 关闭歌曲详情页
    closeDetail() {
      this.isDetail = false
    }
  }
};
</script>

<style lang="less">
#sidebar {
  position: relative;
  flex: 0 1 240px;
  background: @dark-background;
  border-right: @border;

  .sidebar-item {
    font-size: 14px;
    color: grey;
    p {
      margin: 10px;
    }

    ul li {
      padding: 8px 20px;
    }

    i {
      margin-right: 10px;
    }

    .active {
      padding: 8px 17px;
      color: #000;
      background: @lihover;
      border-left: 3px solid @red;
    }

    .customize {
      display: flex;
      justify-content: space-between;
      p {
        display: inline-block;

        i {
          margin: 0;
          color: rgb(207, 207, 209);
        }
      }
    }

    .icon-B {
      margin-right: -10px;
      float: right;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }

  .footer-song {
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 240px;
    height: 65px;
    padding: 5px;
    background: @dark-background;
    border: @border;

    .footer-img {
      position: relative;
      border: @border;
      cursor: pointer;

      i {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        visibility: hidden;
        font-size: 50px;
        color: #ccc;
        background: rgba(0, 0, 0, 0.5);
      }
      &:hover {
        i {
          visibility: visible;
        }
      }
    }

    .song-text {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin: 0 8px;
      width: 100px;
      font-size: 12px;

      p:nth-child(2) {
        color: #666;
        cursor: pointer;
      }

      i {
        color: #666;
        margin-top: 5px;
        cursor: pointer;
      }

      &:nth-child(2) {
        flex: 1;
      }

      &:nth-child(3) {
        float: right;
        width: 16px;
        margin-left: auto;
      }
    }
  }

  .enlarge-enter-active, .enlarge-leave-active {
    transition: all 0.5s;
  }
  .enlarge-enter, .enlarge-leave-to{
    width: 0;
    height: 0;
  }
}
</style>
