<template>
  <div class="playlist">
    <ul>
      <li v-for="p in playlists" :key="p.id" @click="goPlayList(p.id)">
        <div class="bg-img"></div>
        <div class="playlist-img">
          <img class="mid-img" :src="(p.coverImgUrl ? p.coverImgUrl : p.picUrl) + '?param=180y180'" />
          <p class="right-top" v-if="p.playCount">
            <i class="iconfont icon-headset"></i>
            <span>{{numConvert(p.playCount)}}</span>
          </p>
          <p class="right-bottom">
            <i class="iconfont icon-play"></i>
          </p>
          <p v-if="p.creator" class="left-bottom text-ellipsis">
            <i class="iconfont icon-user"></i>
            {{p.creator.nickname}}
          </p>
        </div>
        <p class="text-ellipsis playlist-name">
          {{p.name}}
          <span class="alias" v-if="p.alias">({{p.alias[0]}})</span>
        </p>
        <p class="album-name text-ellipsis" v-if="p.artists" v-html="author(p.artists)"></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    playlists: Array,
  },
  methods: {
    // 跳转到歌单页
    goPlayList(id) {
      this.$router.push({ path: "/playlist", query: { id } });
    },
  },
};
</script>

<style lang="less">
// 歌单
.playlist {
  height: 100%;
  width: 100%;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &::after {
      content: "";
      width: 240px;
    }
    li {
      position: relative;
      margin: 20px;
      width: 180px;
      font-size: 14px;

      .bg-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 220px;
        height: 180px;
        background: url(/img/coverall.png);
        background-position: 0 -986px;
      }

      .playlist-img {
        position: relative;
        height: 180px;
        color: #fff;

        .right-top {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          padding: 5px 10px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(0, 0, 0, 0.3)
          );
          text-align: right;
        }

        .right-bottom {
          position: absolute;
          bottom: 0;
          right: 0;
          margin: 5px;
          padding: 3px 5px;
          border: @border;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: 0.3s;
        }

        .left-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 70%;
          padding: 5px 10px;
          background: linear-gradient(
            to left,
            rgba(255, 255, 255, 0),
            rgba(0, 0, 0, 0.3)
          );

          .iconfont {
            font-size: 12px;
            margin-right: 2px;
          }
        }

        &:hover .right-bottom {
          opacity: 1;
        }
      }

      .playlist-name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        white-space: initial;

        .alias {
          font-size: 16px;
          color: #999;
        }
      }

      .album-name {
        color: #999;
      }
    }
  }
}
</style>
