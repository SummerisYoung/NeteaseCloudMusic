<template>
  <div class="playlist-top">
    <img class="big-img" :src="playlist.coverImgUrl + '?param=220y220'" alt />
    <div class="playlist-content">
      <div class="content-top">
        <div>
          <span>歌单</span>
          <h2>{{playlist.name}}</h2>
        </div>
        <div>
          <p>
            <span>歌曲数</span>
            <span>{{playlist.trackCount}}</span>
          </p>
          <p>
            <span>播放数</span>
            <span>{{numConvert(playlist.playCount)}}</span>
          </p>
        </div>
      </div>
      <div class="content-middle" v-if="playlist.creator">
        <div>
          <img
            style="width:30px;height:30px"
            class="tiny-img-radius"
            :src="playlist.creator.avatarUrl"
            @click="goUser(playlist.creator.userId)"
          />
          <span class="creator" @click="goUser(playlist.creator.userId)">{{playlist.creator.nickname}}</span>
          <span class="create-time">{{stampToTime(playlist.createTime).slice(0,10)}}创建</span>
        </div>
        <ul>
          <li>
            <span>
              <i class="iconfont icon-play"></i>播放全部
            </span>
            <span>
              <i class="iconfont icon-plus"></i>
            </span>
          </li>
          <li>
            <span>
              <i class="iconfont icon-favority"></i>
              收藏({{playlist.subscribedCount}})
            </span>
          </li>
          <li>
            <span>
              <i class="iconfont icon-share"></i>
              分享({{playlist.shareCount}})
            </span>
          </li>
          <li>
            <span>
              <i class="iconfont icon-download"></i>下载全部
            </span>
          </li>
        </ul>
      </div>
      <div class="content-bottom">
        <p v-if="playlist.tags && playlist.tags.length">
          <span>标签：</span>
          <span class="keyword-highlight">{{playlist.tags.join(' / ')}}</span>
        </p>
        <div v-if="playlist.description">
          <p class="description">简介：{{playlist.description}}</p>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: Object,
  },
  methods: {
    goUser(id) {
      this.$router.push({path: 'user',query: {id}})
    }
  }
};
</script>

<style lang="less">
.playlist-top {
  display: flex;
  .big-img {
    margin: 40px;
  }

  .playlist-content {
    padding: 40px 40px 0 0;
    flex: 1;

    .content-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div:first-child {
        display: flex;
        align-items: center;
        span {
          padding: 2px 5px;
          width: 50px;
          border: 1px solid @red;
          color: @red;
          font-size: 14px;
          text-align: center;
        }

        h2 {
          margin-left: 10px;
          font-size: 28px;
        }
      }

      div:last-child {
        display: flex;
        align-items: center;
        p {
          display: flex;
          flex-direction: column;
          width: 75px;
          padding: 0 10px;
          box-sizing: content-box;
          color: #666;
          text-align: right;
          &:last-child {
            padding-left: 0;
            border-left: @border;
          }
        }
      }
    }

    .content-middle {
      margin-bottom: 20px;
      div {
        margin: 10px 0;
        display: flex;
        align-items: center;

        .creator {
          margin: 0 20px 0 10px;
          color: #666;
          font-size: 16px;
          cursor: pointer;
        }

        .create-time {
          color: #666;
          font-size: 14px;
        }
      }

      ul {
        display: flex;
        font-size: 14px;

        li {
          margin-right: 10px;
          border: 1px solid rgb(193, 191, 193);
          border-radius: 5px;
          background: white;
          user-select: none;
          cursor: pointer;

          &:first-child {
            display: flex;
            background: @red;
            color: white;
            span {
              display: inline-block;
              height: 100%;
              padding: 5px;
              &:hover {
                background: rgb(177, 35, 35);
              }
              &:first-child {
                width: 80%;
                border-right: @border;
              }
            }
          }

          &:nth-child(n + 2) {
            padding: 5px 15px;
            &:hover {
              background: @dark-background;
            }
          }

          i {
            margin-right: 5px;
            vertical-align: -2px;
          }
        }
      }
    }

    .content-bottom {
      font-size: 14px;
      div {
        display: flex;
        justify-content: space-between;

        .description {
          margin: 10px 0;
          font-size: 12px;
        }

        i {
          display: none;
          height: 30px;
          font-size: 30px;
          font-weight: 900;
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
