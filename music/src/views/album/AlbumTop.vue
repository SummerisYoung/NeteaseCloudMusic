<template>
  <div class="album-top">
    <div class="album-img">
      <div class="bg-img"></div>
      <img class="big-img" :src="album.picUrl + '?param=220y220'" />
    </div>
    <div class="album-content">
      <div class="content-top">
        <span>专辑</span>
        <h2>{{album.name}}</h2>
      </div>
      <div class="content-middle">
        <ul v-if="album.info">
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
              收藏({{album.info.likedCount}})
            </span>
          </li>
          <li>
            <span>
              <i class="iconfont icon-share"></i>
              分享({{album.info.shareCount}})
            </span>
          </li>
          <li>
            <span>
              <i class="iconfont icon-download"></i>VIP下载
            </span>
          </li>
        </ul>
      </div>
      <div class="content-bottom">
        <p v-html="'歌手：' + author(album.artists)"></p>
        <p>
          时间：
          <span>{{stampToTime(album.publishTime).substring(0,9)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: Object,
  },
};
</script>

<style lang="less">
.album-top {
  display: flex;
  .album-img {
    position: relative;
    margin: 40px;
    width: 260px;
    height: 220px;
    overflow: hidden;
    .bg-img {
      position: absolute;
      width: 300px;
      height: 100%;
      background: url(/img/coverall.png);
      background-position:10px -1166px;
      background-size: 150%;
    }
    .big-img {
      position: relative;
      border: none;
    }
  }

  .album-content {
    padding: 40px 40px 0 0;
    flex: 1;

    .content-top {
      display: flex;
      align-items: center;
      span {
        padding: 2px 5px;
        width: 50px;
        background: @red;
        color: #fff;
        font-size: 14px;
        text-align: center;
      }

      h2 {
        margin-left: 10px;
        font-size: 28px;
      }
    }

    .content-middle {
      margin: 20px 0;
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
      margin-top: 10px;
      overflow: hidden;
      font-size: 12px;
      p {
        margin: 10px 0;
      }
    }
  }
}
</style>
