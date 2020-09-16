<template>
  <div id="foot">
    <div class="foot-left">
      <i class="iconfont icon-previous"></i>
      <i class="iconfont" :class="[isPlay ? 'icon-pause' : 'icon-play']" @click="p2p()"></i>
      <i class="iconfont icon-next"></i>
    </div>

    <div class="foot-middle">
      <span>{{timeConvert(current)}}</span>
      <div class="music-bar" ref="musicBar" @click="clickBar($event)">
        <div class="passed" :style="{width: songPassed + 'px'}" ref="songPassed"></div>
        <div
          class="progress"
          :style="{left: songProgress + 'px'}"
          ref="songProgress"
          @mousedown="dragBar($event)"
        >
          <div class="dot"></div>
        </div>
      </div>
      <span>{{timeConvert(duration)}}</span>
      <i class="iconfont icon-laba"></i>
      <div class="volume" ref="volume" @click="clickVolmue($event)">
        <div class="passed" :style="{width: volumePassed + 'px'}" ref="volumePassed"></div>
        <div
          class="progress"
          :style="{left: volumeProgress + 'px'}"
          ref="volumeProgress"
          @mousedown="dragVolumn($event)"
        ></div>
      </div>
    </div>

    <div class="foot-right">
      <i class="iconfont icon-playcycle"></i>
      <span>较高</span>
      <i class="iconfont icon-whale"></i>
      <i class="iconfont icon-ci"></i>
      <i class="iconfont icon-playlist"></i>
    </div>

    <div class="list">
      <div class="list-nav">
        <p class="default">播放列表</p>
        <p>历史记录</p>
      </div>
      <div class="list-operate">
        <p>
          总
          <span id="list-count">0</span>首
        </p>
        <p>
          <span>
            <i class="iconfont icon-favority"></i>收藏全部
          </span>
          <span>
            <i class="iconfont icon-trash"></i>清空
          </span>
        </p>
      </div>
      <div class="list-content">
        <div class="none">
          <p>你还没有添加任何歌曲！</p>
          <p>
            去首页
            <a href="#">发现音乐</a>
          </p>
        </div>
      </div>
    </div>

    <audio ref="audio" :src="$store.state.songUrl.url" @timeupdate="timeupdate" @ended="ended()"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0, // 音乐播放时间
      duration: 0, // 音乐总时间
      songProgress: 0, // 音乐进度条
      songPassed: 0, // 音乐背景条
      volumeProgress: 0, //音乐音量条
      volumePassed: 0, //音乐背景条
      isPlay: false, // 播放暂停
      isTimeUpDate: true, // 进度条事件是否开启
    };
  },
  mounted() {
    // 初始化进度条位置
    this.songProgress = -this.$refs.songProgress.offsetWidth / 2
    // 初始化音量条位置
    this.volumeProgress =
      this.$refs.volume.offsetWidth / 2 -
      this.$refs.volumeProgress.offsetWidth / 2;
    // 初始化音量背景条位置
    this.volumePassed = this.$refs.volume.offsetWidth / 2;
    // vuex保存audio标签
    this.$store.commit('getAudio',this.$refs.audio)
  },
  watch: {
    "$store.state.songUrl"() {
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.isPlay = true
      });
    }
  },
  methods: {
    // 播放音乐,调整进度条
    timeupdate() {
      if (this.isTimeUpDate) {
        // 获取当前的播放时间
        this.current = Math.floor(this.$refs.audio.currentTime);
        // 获取总时间
        this.duration = Math.floor(this.$refs.audio.duration);
        // 计算并设置当前进度
        let x =
          (this.current / this.duration) * this.$refs.musicBar.offsetWidth;
        this.songPassed = x;
        this.songProgress = x - this.$refs.songProgress.offsetWidth / 2;
      }
    },
    // 音乐播放完毕事件
    ended() {
      this.isPlay = false
    },
    // play to pause,控制播放和暂停的icon
    p2p() {
      if (this.isPlay) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
      this.isPlay = !this.isPlay;
    },
    // 点击进度条
    clickBar(e) {
      // 关闭进度条事件
      this.isTimeUpDate = false;
      // 变化长度
      let x = e.pageX - this.$refs.musicBar.offsetLeft
      // 改变播放时间
      this.$refs.audio.currentTime = x / this.$refs.musicBar.offsetWidth * this.$refs.audio.duration
      // 开启进度条
      this.isTimeUpDate = true;
    },
    // 拖动进度条
    dragBar(e) {
      // 关闭进度条事件
      this.isTimeUpDate = false;
      // 获取鼠标摁下时的坐标
      let x1 = e.pageX;
      // 获取音频标签
      let audio = this.$refs.audio;
      // 获取鼠标摁下时进度条的位置
      let left = this.songProgress;
      // 设置初始进度所占比例
      let proportion = 0;
      // 拖动
      document.onmousemove = (e) => {
        let x2 = e.pageX - x1 + left;
        // 限定边界
        x2 = Math.max(x2, -this.$refs.songProgress.offsetWidth / 2);
        x2 = Math.min(
          x2,
          this.$refs.musicBar.offsetWidth -
            this.$refs.songProgress.offsetWidth / 2
        );

        this.songProgress = x2;
        this.songPassed = x2;
        // 保存当前拖动的进度在总进度里的比例
        proportion = x2 / this.$refs.musicBar.offsetWidth;
      };
      // 鼠标抬起
      document.onmouseup = () => {
        // 开启进度条
        this.isTimeUpDate = true;
        // 进度条进度变化
        audio.currentTime = proportion * audio.duration;
        // 事件解绑
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 点击音量条
    clickVolmue(e) {
      // 变化长度
      let x = e.pageX - this.$refs.volume.offsetLeft
      // 改变音量
      this.$refs.audio.volume = x / this.$refs.volume.offsetWidth
      // 改变音量进度条位置
      this.volumeProgress = x - this.$refs.volumeProgress.offsetWidth / 2;
      // 改变音量背景条位置
      this.volumePassed = x
    },
    // 拖动音量条
    dragVolumn(e) {
      // 获取鼠标摁下时的坐标
      let x1 = e.pageX;
      // 获取鼠标摁下时进度条的位置
      let left = this.volumeProgress;
      // 获取音频标签
      let audio = this.$refs.audio;

      // 鼠标拖动
      document.onmousemove = (e) => {
        let x2 = e.pageX - x1 + left;
        // 限定边界
        x2 = Math.max(x2,0);
        x2 = Math.min(
          x2,
          this.$refs.volume.offsetWidth -
            this.$refs.volumeProgress.offsetWidth / 2
        );

        // 更改音量条位置
        this.volumePassed = x2;
        this.volumeProgress = x2;

        // 计算音量
        audio.volume = x2 / this.$refs.volume.offsetWidth
      };

      // 鼠标抬起
      document.onmouseup = () => {
        // 事件解绑
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>

<style lang="less">
#foot {
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  width: 100%;
  height: 65px;
  background: @dark-background;
  border-top: @border;
  user-select: none;
  z-index: 10;

  .foot-left {
    width: 240px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;

    i {
      display: inline-block;
      width: 35px;
      height: 35px;
      line-height: 35px;
      border-radius: 50%;
      font-size: 20px;
      text-align: center;
      background: @red;
    }

    i:nth-child(2) {
      width: 45px;
      height: 45px;
      line-height: 48px;
      font-size: 30px;
    }
  }

  .foot-middle {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 12px;
    span {
      margin: 0 10px;
    }

    .music-bar {
      position: relative;
      flex: 1;
      height: 5px;
      background: rgb(225, 225, 225);

      .passed {
        width: 0;
        height: 100%;
        background: @red;
      }
    }

    .icon-laba {
      margin-right: 15px;
      color: #666;
    }

    .progress {
      position: absolute;
      left: -7px;
      top: -4px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: @border;
      background: #fff;

      .dot {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: @red;
      }

      .dot-loading {
        width: 10px;
        height: 10px;
        background-image: url(/public/img/loading.gif);
        background-size: cover;
        background-position: center;
        background-color: transparent;
      }
    }

    .volume {
      position: relative;
      width: 120px;
      height: 5px;
      background: rgb(225, 225, 225);

      i {
        color: #666;
        margin-right: 10px;
      }

      .passed {
        width: 50%;
        height: 100%;
        background: @red;
      }

      .progress {
        left: calc(50% - 7px);
      }
    }
  }

  .foot-right {
    display: flex;
    float: right;
    margin-left: auto;
    color: grey;
    font-size: 22px;

    * {
      margin: 0 8px;
    }

    span {
      padding: 0 2px;
      width: 30px;
      border: 1px solid grey;
      font-size: 12px;
    }
  }

  .list {
    display: none;
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
}
</style>
