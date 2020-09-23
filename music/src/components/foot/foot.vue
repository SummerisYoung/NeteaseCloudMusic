<template>
  <div id="foot" ref="foot">
    <div class="foot-left">
      <i class="iconfont icon-previous" @click="clickPrev()"></i>
      <i class="iconfont" :class="[isPlay ? 'icon-pause' : 'icon-play']" @click="p2p()"></i>
      <i class="iconfont icon-next" @click="clickNext()"></i>
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
      <i class="iconfont icon-playlist" @click="openPlayList()"></i>
    </div>

    <list v-show="isPlayList" :isPlay="isPlay" :isPlayList="isPlayList"/>

    <audio ref="audio" :src="$store.state.songUrl.url" @timeupdate="timeupdate" @ended="ended()"></audio>
  </div>
</template>

<script>
import List from './List'
export default {
  components: {
    List
  },
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
      isPlayList: false, // 是否打开播放列表
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    "$store.state.songUrl"() {
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.isPlay = true;
      });
    },
  },
  methods: {
    // 初始化页面
    init() {
      // 初始化进度条位置
      this.songProgress = -this.$refs.songProgress.offsetWidth / 2;
      // 初始化音量条位置
      this.volumeProgress =
        this.$refs.volume.offsetWidth / 2 -
        this.$refs.volumeProgress.offsetWidth / 2;
      // 初始化音量背景条位置
      this.volumePassed = this.$refs.volume.offsetWidth / 2;
      // vuex保存audio标签
      this.$store.commit("getAudio", this.$refs.audio);
      // 添加点击页面播放列表关闭事件
      document.addEventListener("click", (e) => {
        if (this.isPlayList && !this.$refs.foot.contains(e.target))
          this.isPlayList = false;
      });
    },
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
      this.isPlay = false;
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
    // 点击了上一个
    clickPrev() {
      let playing = this.$store.state.playing
      if(--playing < 0) {
        playing = this.$store.state.playlist.length - 1
      }
      this.$store.commit('changePlaying',playing)
      this.getSong(this.$store.state.playlist[playing].id)
    },
    // 点击了下一个
    clickNext() {
      let playing = this.$store.state.playing
      if(++playing > this.$store.state.playlist.length - 1) {
        playing = 0
      }
      this.$store.commit('changePlaying',playing)
      this.getSong(this.$store.state.playlist[playing].id)
    },
    // 点击进度条
    clickBar(e) {
      // 关闭进度条事件
      this.isTimeUpDate = false;
      // 变化长度
      let x = e.pageX - this.$refs.musicBar.offsetLeft;
      // 改变播放时间
      this.$refs.audio.currentTime =
        (x / this.$refs.musicBar.offsetWidth) * this.$refs.audio.duration;
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
      let x = e.pageX - this.$refs.volume.offsetLeft;
      // 改变音量
      this.$refs.audio.volume = x / this.$refs.volume.offsetWidth;
      // 改变音量进度条位置
      this.volumeProgress = x - this.$refs.volumeProgress.offsetWidth / 2;
      // 改变音量背景条位置
      this.volumePassed = x;
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
        x2 = Math.max(x2, 0);
        x2 = Math.min(
          x2,
          this.$refs.volume.offsetWidth -
            this.$refs.volumeProgress.offsetWidth / 2
        );

        // 更改音量条位置
        this.volumePassed = x2;
        this.volumeProgress = x2;

        // 计算音量
        audio.volume = x2 / this.$refs.volume.offsetWidth;
      };

      // 鼠标抬起
      document.onmouseup = () => {
        // 事件解绑
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 打开播放列表
    openPlayList() {
      this.isPlayList = !this.isPlayList;
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
}
</style>
