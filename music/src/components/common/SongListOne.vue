<template>
  <ul class="song-list-ul-One" :style="oneUlStyle">
    <slot></slot>
    <li
      :class="[i == clickIndex ? 'deep-color' : '']"
      v-for="(s,i) in songs"
      :key="s.id"
      :style="{alignItems : highlightKeyword ? 'flex-start' : ''}"
      @dblclick="getSong(s.id)"
      @click="changeColor(i)"
    >
      <p class="index" :style="indexStyle" v-if="index">
        <span>{{(i + 1 + '').padStart(2, '0')}}</span>
      </p>
      <p class="icon" v-if="icon">
        <i class="iconfont icon-love"></i>
        <i class="iconfont icon-download"></i>
      </p>
      <p class="img" v-if="s.album.picUrl" @click="getSong(s.id)">
        <img :src="s.album.picUrl + '?param=50y50'" alt />
        <i class="iconfont icon-play"></i>
      </p>
      <p class="name text-ellipsis">
        <span v-html="highlight(s.name,highlightKeyword)">{{s.name}}</span>
        <span class="alias" v-if="s.alias && s.alias.length">{{s.alias[0]}}</span>
      </p>
      <p class="artist text-ellipsis" v-html="author(s.artists)"></p>
      <p class="album text-ellipsis" v-if="album" v-html="highlight(s.album.name,highlightKeyword)">
        <span>{{s.album.name}}</span>
      </p>
      <p class="time" v-if="time">
        <span>{{timeConvert(s.duration / 1000)}}</span>
      </p>
    </li>
  </ul>
</template>

<script>
import songVue from "../../views/home/newsong/song.vue";
export default {
  props: {
    songs: Array,
    highlightKeyword: {
      // 关键词,可根据这个prop判断是否为从搜索使用该组件
      type: String,
      default: "",
    },
    index: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Boolean,
      default: true,
    },
    img: {
      type: Boolean,
      default: true,
    },
    album: {
      type: Boolean,
      default: true,
    },
    time: {
      type: Boolean,
      default: true,
    },
    oneUlStyle: {
      type: String,
      default: "",
    },
    indexStyle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      clickIndex: -1,
    };
  },
  methods: {
    getSong(id) {
      // 请求歌曲详细信息
      this.all([
        this.get("/song/detail?ids=" + id),
        this.get("/song/url?id=" + id),
      ]).then((r) => {
        this.$store.dispatch("changeSongDetail", r[0].songs[0]);
        this.$store.dispatch("changeSongUrl", r[1].data[0]);
      });
    },
    changeColor(i) {
      this.clickIndex = i;
    },
  },
};
</script>

<style lang="less">
.song-list-ul-One {
  li {
    display: flex;
    align-items: center;
    padding: 10px 0;

    &:nth-child(odd) {
      background: @light-background;
    }

    &:nth-child(even) {
      background: @dark-background;
    }

    &:hover {
      background: rgb(235, 236, 237);

      .artist,
      .album {
        color: #333;
      }
    }

    .index {
      width: 5%;
      margin-right: 15px;
      text-align: right;
      color: #999;
    }

    .icon {
      width: 5%;
      i {
        margin-right: 10px;
        color: #999;

        &:hover {
          color: #333;
        }
      }
    }

    .img {
      position: relative;
      margin-right: 10px;
      cursor: pointer;
      i {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 17px;
        color: #fff;
        border: @border;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4);

        &:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      }
    }

    .name {
      width: 40%;
      .alias {
        display: block;
        margin-top: 10px;
        color: #999;
      }
    }

    .artist {
      width: 15%;
      color: #666;
    }

    .album {
      width: 28%;
      color: #666;
      font-size: 12px;
    }

    .time {
      width: 5%;
      color: #999;
    }
  }
}
</style>
