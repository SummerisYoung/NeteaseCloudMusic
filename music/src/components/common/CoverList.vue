<template>
  <div class="playlist">
    <ul>
      <li
        v-for="c in covers"
        :key="c.id"
        @click="type == 'playlist' ? goPlayList(c.id) : goAlbum(c.id)"
      >
        <div class="bg-img" v-if="albumImg"></div>
        <div class="playlist-img">
          <div class="copywriter" v-if="copywriter">{{c.copywriter}}</div>
          <img class="mid-img" :src="(c.coverImgUrl ? c.coverImgUrl : c.picUrl) + '?param=180y180'" />
          <p class="right-top" v-if="c.playCount">
            <i class="iconfont icon-headset"></i>
            <span>{{numConvert(c.playCount)}}</span>
          </p>
          <p class="right-bottom">
            <i class="iconfont icon-play"></i>
          </p>
          <p v-if="c.creator && leftBottom" class="left-bottom text-ellipsis">
            <i class="iconfont icon-user"></i>
            {{c.creator.nickname}}
          </p>
        </div>
        <p class="text-ellipsis playlist-name">
          {{c.name}}
          <span class="alias" v-if="c.alias && c.alias.length">({{c.alias[0]}})</span>
        </p>
        <p class="album-name text-ellipsis" v-if="c.artists" v-html="author(c.artists)"></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    covers: Array,
    type: {
      // 父组件类型(歌单&专辑)
      type: String,
      default: "playlist",
    },
    albumImg: {
      // 是否开启专辑背景图片
      type: Boolean,
      default: false,
    },
    copywriter: {
      // 是否开启个性推荐介绍
      type: Boolean,
      default: false,
    },
    leftBottom: {
      // 是否开启左下角创作者
      type: Boolean,
      default: true,
    },
  }
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
      width: 850px;
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
        overflow: hidden;

        &:hover {
          .copywriter {
            top: 0;
          }
          .right-top {
            opacity: 0;
          }
        }

        .copywriter {
          position: absolute;
          top: -60px;
          display: -webkit-box;
          width: 100%;
          padding: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
          transition: 0.3s 0.5s;
        }

        .right-top {
          position: absolute;
          top: 0;
          right: 0;
          width: 70%;
          padding: 5px 10px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(0, 0, 0, 0.3)
          );
          text-align: right;
          transition: 0.1s 0.5s;
          i {
            font-size: 12px;
            margin-right: 5px;
          }
        }

        .right-bottom {
          position: absolute;
          bottom: 0;
          right: 0;
          margin: 5px;
          padding: 3px 5px;
          border: @border;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: 0.3s;
        }

        .left-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 5px 10px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(0, 0, 0, 0.3)
          );
        }

        &:hover .right-bottom {
          opacity: 1;
        }
      }

      .playlist-name {
        margin: 5px 0;
        overflow: hidden;
        font-size: 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        white-space: initial;

        .alias {
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
