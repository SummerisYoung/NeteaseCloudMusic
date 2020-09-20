<template>
  <loading v-if="$store.state.loading" />
  <div class="main" v-else>
    <ul class="search-song-title">
      <li style="width:5.5%"></li>
      <li style="width:5%">操作</li>
      <li style="width:40%">音乐标题</li>
      <li style="width:15%">歌手</li>
      <li style="width:28%">专辑</li>
      <li style="width:5%">时长</li>
    </ul>
    <ul class="song-list-ul">
      <li
        v-for="(s,i) in songs"
        :key="s.id"
        @dblclick="getSong(s.id)"
      >
        <p class="index">{{(i + 1 + '').padStart(2, '0')}}</p>
        <p class="icon">
          <i class="iconfont icon-love"></i>
          <i class="iconfont icon-download"></i>
        </p>
        <p class="name text-ellipsis">
          <span>{{s.name}}</span>
          <span class="alias" v-if="s.alia && s.alia.length">{{s.alia[0]}}</span>
        </p>
        <p class="artist text-ellipsis" v-html="author(s.ar)"></p>
        <p class="album text-ellipsis">
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
.song-list-ul {
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
