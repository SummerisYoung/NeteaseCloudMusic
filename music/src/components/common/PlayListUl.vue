<template>
  <div class="playlist">
    <loading v-if="this.$store.state.loading"/>
    <ul v-else>
      <li v-for="p in playlists" :key="p.id">
        <div class="playlist-img">
          <img class="mid-img" :src="(p.coverImgUrl ? p.coverImgUrl : p.picUrl) + '?param=180y180'">
          <p class="right-top">
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
        <p class="playlist-name text-ellipsis">{{p.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from './Loading'
export default {
  components: {
    Loading
  },
  props: {
    playlists: Array
  },
  methods: {
    numConvert(num) {
      return this.$utils.numConvert(num)
    }
  }
}
</script>

<style lang="less">
// 歌单
.playlist {
  height: 100%;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &::after {
      content: '';
      width: 240px;
    }
    li {
      margin: 20px;
      width: 180px;
      font-size: 14px;

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
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(0, 0, 0, 0.3));
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
          background: linear-gradient(to left, rgba(255,255,255,0), rgba(0, 0, 0, 0.3));
        
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
      }

      .trackCount {
        color: #999;
      }
    }
  }
}
</style>
