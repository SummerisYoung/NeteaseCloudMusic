<template>
  <loading v-if="$store.state.loading" />
  <div class="main" v-else>
    <ul class="search-song-title" v-if="listTitle">
      <li style="width:5.5%"></li>
      <li style="width:5%">操作</li>
      <li style="width:40%">音乐标题</li>
      <li style="width:15%">歌手</li>
      <li style="width:28%">专辑</li>
      <li style="width:5%">时长</li>
    </ul>
    <ul class="song-list-ul-two" :style="ulStyle">
      <li
        :class="[i == clickIndex ? 'deep-color' : '']"
        :style="{liStyle}"
        v-for="(s,i) in songs"
        :key="s.id"
        @dblclick="getSong(s.id,songs)"
        @click="changeColor(i)"
      >
        <p class="index" :style="indexStyle">{{(i + 1 + '').padStart(2, '0')}}</p>
        <p class="icon">
          <i class="iconfont icon-love"></i>
          <i class="iconfont icon-download"></i>
        </p>
        <p class="name text-ellipsis">
          <span>{{s.name}}</span>
          <span class="alias" v-if="s.alia && s.alia.length">({{s.alia[0]}})</span>
        </p>
        <p class="artist text-ellipsis" v-html="author(s.ar)" v-if="artist"></p>
        <p class="album text-ellipsis" v-if="album">
          <span>{{s.al.name}}</span>
        </p>
        <p class="time">
          <span>{{timeConvert(s.dt / 1000)}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
export default {
  components: {
    Loading
  },
  props: {
    songs: Array,
    listTitle: {  // 是否需要列表标题
      type: Boolean,
      default: true
    },
    ulStyle: {  // 自定义ul样式
      type: String,
      default: ''
    },
    liStyle: {  // 自定义li样式
      type: String,
      default: ''
    },
    indexStyle: { // 自定义序号样式
      type: String,
      default: ''
    },
    artist: { // 是否需要作者
      type: Boolean,
      default: true,
    },
    album: {  // 是否需要专辑
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      clickIndex: -1
    }
  },
  methods: {
    changeColor(i) {
      this.clickIndex = i
    }
  }
};
</script>

<style lang="less">
.search-song-title {
  display: flex;
  border-top: @border;
  border-bottom: @border;
  font-size: 12px;

  li {
    line-height: 30px;
    text-indent: 1em;
    border-right: @border;

    &:last-child {
      border: none;
    }
  }
}
.song-list-ul-two {
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
      background: @lihover;

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
      display: flex;
      width: 5%;
      margin-right: 10px;
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
      flex: 1;
      .alias {
        margin-left: 5px;
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
