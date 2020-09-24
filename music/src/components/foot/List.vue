<template>
  <div class="list">
    <div class="list-nav">
      <p class="default">播放列表</p>
      <p>历史记录</p>
    </div>
    <div class="list-operate">
      <p>总{{playlist.length}}首</p>
      <p>
        <span>
          <i class="iconfont icon-favority"></i>收藏全部
        </span>
        <span>
          <i class="iconfont icon-trash"></i>清空
        </span>
      </p>
    </div>

    <el-scrollbar class="list-content" ref="scroll">
      <div v-if="playlist.length">
        <ul class="li-hover">
          <li
            :class="[i == clickIndex ? 'deep-color' : '']"
            v-for="(l,i) in playlist"
            :key="l.id"
            @dblclick="getSong(l.id)"
            @click="changeColor(i)"
            ref="listLi"
          >
            <p :class="i == $store.state.playing ? 'visible' : ''">
              <i class="iconfont" :class="[isPlay ? 'icon-play' : 'icon-pause']"></i>
            </p>
            <p class="text-ellipsis">
              {{l.name}}
              <span v-if="l.alia && l.alia.length" style="color:#999">{{l.alia}}</span>
            </p>
            <p class="text-ellipsis" v-html="author(l.ar)"></p>
            <p>
              <i class="iconfont icon-link"></i>
            </p>
            <p>{{timeConvert(l.dt / 1000)}}</p>
          </li>
        </ul>
      </div>

      <div class="none" v-else>
        <p>你还没有添加任何歌曲！</p>
        <p>
          去首页
          <a href="#">发现音乐</a>
        </p>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    isPlay: Boolean,
    isPlayList: Boolean
  },
  data() {
    return {
      clickIndex: -1,
    };
  },
  computed: {
    ...mapState(["playlist","playing"]),
  },
  watch: {
    //  监听歌曲变化,更新播放下标
    "$store.state.songDetail.id"(id) {
      for (let i = 0, len = this.playlist.length; i < len; i++) {
        if ((this.playlist[i].id == id)) {
          this.$store.commit("changePlaying", i);
          break;
        }
      }
    },
    isPlayList(val) {
      if(this.playlist.length && val) {
        this.$refs.scroll.$refs.wrap.scrollTo({ behavior: "smooth", top: this.$refs.listLi[0].offsetHeight * this.playing });
      }
    }
  },
  methods: {
    changeColor(i) {
      this.clickIndex = i;
    },
  },
};
</script>

<style lang="less">
.list {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: 65px;
  z-index: 5;
  width: 800px;
  height: 70vh;
  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.2);
  background: #fff;

  .list-nav {
    display: flex;
    width: 300px;
    margin: 20px auto;
    p {
      width: 80%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      border: @border;
      &:first-child {
        border-radius: 5px 0 0 5px;
      }
      &:last-child {
        border-radius: 0 5px 5px 0;
      }
    }

    .default {
      padding: 0;
      border-radius: 0;
    }
  }

  .list-operate {
    display: flex;
    justify-content: space-between;
    padding: 10px 40px;
    color: #999;
    border: @border;
    p:last-child {
      span {
        i {
          margin: 0 10px;
        }
        &:first-child {
          border-right: @border;
          padding: 0 10px;
        }
        &:hover {
          color: #333;
        }
      }
    }
  }
  .list-content {
    flex: 1;
    overflow: hidden;
    .none {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;

      p:first-child {
        font-size: 16px;
        margin-bottom: 20px;
      }
      a {
        color: #000;
        text-decoration: underline;
      }
    }
    .li-hover {
      position: relative;
      height: 100%;
      li {
        padding: 10px 0;
        p {
          &:nth-child(1) {
            width: 5%;
            text-align: center;
            color: @red;
            visibility: hidden;
          }
          &:nth-child(2) {
            width: 60%;
          }
          &:nth-child(3) {
            width: 20%;
            color: #999;
            cursor: pointer;
          }
          &:nth-child(4) {
            width: 5%;
            color: #999;
            cursor: pointer;
            text-align: left;
          }
          &:nth-child(5) {
            width: 10%;
            color: #666;
          }
        }

        .visible {
          visibility: visible !important;
        }
      }
    }
  }
}
</style>
