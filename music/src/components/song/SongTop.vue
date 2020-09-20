<template>
  <div class="song-top">
    <div class="bg-img" :style="bgImg"></div>
    <div class="song-left">
      <div class="needle" ref="needle"></div>
      <div class="song-image">
        <img :src="songDetail.al.picUrl + '?param=260y260'" :style="rotateImg" />
      </div>
      <ul>
        <li>
          <i class="iconfont icon-love"></i>喜欢
        </li>
        <li>
          <i class="iconfont icon-favority"></i>收藏
        </li>
        <li>
          <i class="iconfont icon-download"></i>VIP下载
        </li>
        <li>
          <i class="iconfont icon-share"></i>分享
        </li>
      </ul>
    </div>

    <div class="song-right">
      <h2>{{songDetail.name}}</h2>
      <ul class="song-subtitle">
        <li class="text-ellipsis">
          专辑：
          <span class="keyword-highlight">{{songDetail.al.name}}</span>
        </li>
        <li class="text-ellipsis">
          歌手：
          <span class="keyword-highlight" v-html="author(songDetail.ar)"></span>
        </li>
        <li>
          来源：
          <span class="keyword-highlight">搜索页</span>
        </li>
      </ul>
      <p class="nolyric" v-if="lyricRes && lyricRes.nolyric">纯音乐，请您欣赏</p>
      <p class="nolyric" v-else-if="lyricRes && lyricRes.nocollect"></p>
      <el-scrollbar class="lyric-box" ref="scroll" v-else>
        <p v-if="noScroll">*该歌词不支持自动滚动*</p>
        <ul class="lyric" ref="lyricUl">
          <li
            :class="[i == lyricHighLight ? 'lyric-highlight' : '']"
            v-for="(l,i) in lyricsArr"
            :key="i"
          >{{l}}</li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songDetail: Object,
  },
  data() {
    return {
      lyricRes: null, // 歌词搜索结果
      noScroll: false, // 是否可滚动
      lyricsArr: [], // 歌词数组
      lyricTime: [], // 歌词时间数组
      audio: null, // audio标签
      lyricHighLight: -1, // 高亮歌词项
      lyricNum: 0, // 比较歌词项
      lyricTop: 0, //歌词滚动长度
      rotate: 0, //旋转歌曲图片角度
    };
  },
  computed: {
    // 背景虚化图
    bgImg() {
      return {
        "background-image": `url(${this.songDetail.al.picUrl})`,
      };
    },
    // 歌曲图片旋转
    rotateImg() {
      return {
        transform: `rotate(${this.rotate}deg)`,
      };
    },
  },
  created() {
    // 从vuex获取audio标签
    this.audio = this.$store.state.audio;
    // 获取歌词
    this.getLyric();
  },
  mounted() {
    if (!this.noScroll) {
      this.audio.ontimeupdate = this.lyricScroll;
    }
  },
  methods: {
    // 获取歌词
    async getLyric() {
      this.lyricRes = await this.get("/lyric?id=" + this.songDetail.id);
      if (this.lyricRes.lrc) {
        // 有歌词
        // 先看看可否支持滚动
        if (this.lyricRes.lrc.lyric.match(/该歌词不支持/) != null) {
          this.noScroll = true;
        }
        this.makeLyrics(this.lyricRes);
      }
    },
    // 歌词处理
    makeLyrics(r) {
      r.lrc.lyric.split("\n").forEach((l, i) => {
        let time = "";
        let lrc = "";
        let reg = /\[(\d\d):(\d\d\.\d{2,3})\]/g;
        // a是匹配到的整个字符串
        // $1是第一个小括号内的字符串,即分钟
        // $2是第二个小括号内的字符串,即秒钟和毫秒
        // 如a:[05:30.123],$1:05,$2:30.123
        // 用*把字符串转为数字
        lrc = l.replace(reg, function (a, $1, $2) {
          time = $1 * 60 + $2.substring(0, 6) * 1;
          return "";
        });
        this.lyricsArr.push(lrc);
        this.lyricTime.push(time);
      });
    },
    // 歌词滚动
    lyricScroll() {
      // 避免比较歌词项越界导致this.lyricNum = -1的问题
      this.lyricNum = Math.max(this.lyricNum, 0);
      // 获取滚动条标签
      let lyricResize = this.$refs.scroll.$refs.resize;
      let wrap = this.$refs.scroll.$refs.wrap;
      if (this.audio.currentTime > this.lyricTime[this.lyricNum]) {
        // 比较当前歌曲播放进度时间  大于 歌词时间列表的哪一项
        while (this.audio.currentTime > this.lyricTime[this.lyricNum]) {
          // 一直找
          this.lyricNum++;
        }
        // 退出寻找循环，说明有一项比当前歌曲进度快了，那么播放的歌词就是这一项的上一项
        this.lyricHighLight = this.lyricNum - 1;
        // 前四条歌词无需滚动
        if (this.lyricNum > 4) {
          // 歌词滚动
          let scrollTop =
            ((this.lyricNum - 4) / this.lyricTime.length) *
            lyricResize.offsetHeight;
          wrap.scrollTo({ behavior: "smooth", top: scrollTop });
        }
      }
      // 避免比较歌词项越界导致this.lyricTime[this.lyricNum]为undefined的问题
      this.lyricNum = Math.min(this.lyricTime.length - 1, this.lyricNum);
      // 做完上述操作，要把num变为比歌曲播放的时间小一项，否则用户把歌曲往回拖动时，高亮无法回滚
      while (this.audio.currentTime < this.lyricTime[this.lyricNum]) {
        this.lyricNum--;
      }

      // 歌曲结束,最后一句歌词取消高亮
      if (this.audio.ended) {
        this.lyricHighLight = 0;
        this.lyricNum = 0
      }

      // 暂停时变换图片上方的组件
      if (this.audio.paused) {
        this.$refs.needle.style.transform = "rotate(-35deg)";
      } else {
        // 播放时歌曲图片旋转
        this.$refs.needle.style.transform = "rotate(0deg)";
        this.rotate++;
      }
    },
  },
};
</script>

<style lang="less">
.song-top {
  position: relative;
  top: 0;
  z-index: 100;
  display: flex;
  margin-bottom: 80px;
  width: 100%;
  height: 550px;

  .bg-img {
    position: absolute;
    top: 30%;
    width: 100%;
    height: 50%;
    filter: blur(100px);
    background-size: cover;
    background-position: center;
  }

  .song-left {
    position: relative;
    width: 50%;
    height: 100%;
    padding-left: 40px;

    .needle {
      position: absolute;
      left: calc(50% - 37.5px);
      top: -20px;
      width: 110px;
      height: 157px;
      z-index: 5;
      transform-origin: 20px 17.5px;
      background: url(/img/needle.png) no-repeat;
      background-size: contain;
      transition: 0.5s;
    }

    .song-image {
      position: relative;
      margin: 60px 0;
      width: 400px;
      height: 400px;
      background: url(/img/singlecover.png) no-repeat;
      background-position: 50%;
      background-size: 105%;
      border: 10px solid rgba(218, 214, 215, 0.5);
      border-radius: 50%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 260px;
        border-radius: 50%;
        transition: 0.5s;
      }
    }
    ul {
      position: absolute;
      left: 40px;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      width: 400px;

      li {
        padding: 10px 15px;
        border: 1px solid rgb(193, 191, 193);
        border-radius: 5px;
        background: @dark-background;

        i {
          margin-right: 5px;
        }
      }
    }
  }

  .song-right {
    display: flex;
    flex-direction: column;
    z-index: 5;
    margin-left: 150px;
    flex: 1;

    h2 {
      width: 500px;
      margin-top: 30px;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .song-subtitle {
      margin-bottom: 30px;

      li {
        display: inline-block;
        width: 30%;
        margin-right: 10px;
        font-size: 12px;
      }
    }
    .lyric-box {
      position: relative;
      width: 100%;
      overflow: hidden;
      flex: 1;
      border-right: @border;
      .lyric {
        position: relative;

        li {
          color: #000;
          font-size: 14px;
          height: 60px;
          transition: 0.5s;
        }

        .lyric-highlight {
          color: #fff;
        }
      }
    }
  }

  ul li {
    font-size: 14px;
    color: #333;
  }
}
</style>
