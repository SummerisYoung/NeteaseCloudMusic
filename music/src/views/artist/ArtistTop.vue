<template>
  <div class="artist-top">
    <div class="artist-img">
      <p class="personal" @click="goUser(artist.accountId)">
        <i class="iconfont icon-user"></i>
        <span>个人主页 ></span>
      </p>
      <img class="big-img" :src="artist.picUrl + '?param=220y220'" />
    </div>
    <div class="artist-content">
      <div class="content-top">
        <div>
          <span>歌手</span>
          <h2>{{artist.name}}</h2>
        </div>
        <p>
          <i class="iconfont icon-favority"></i>收藏
        </p>
      </div>
      <p class="alias" v-if="artist.alias && artist.alias.length">{{artist.alias[0]}}</p>
      <div class="content-bottom">
        <p v-if="artist.musicSize">
          <i class="iconfont icon-music"></i>
          单曲数：{{artist.musicSize}}
        </p>
        <p v-if="artist.albumSize">
          <i class="iconfont icon-album"></i>
          专辑数：{{artist.albumSize}}
        </p>
        <p v-if="artist.mvSize">
          <i class="iconfont icon-mv"></i>
          MV数：{{artist.mvSize}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artist: Object,
  },
};
</script>

<style lang="less">
.artist-top {
  display: flex;
  .artist-img {
    position: relative;
    margin: 40px;

    .personal {
      position: absolute;
      top: 170px;
      left: 50%;
      display: flex;
      align-items: center;
      transform: translateX(-50%);
      padding: 3px 15px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      border: @border;
      border-radius: 20px;
      background: rgba(40,40,40,.7);
      cursor: pointer;

      &:hover{
        background: rgba(40,40,40,.8);
      }
    }
  }

  .artist-content {
    padding: 40px 40px 0 0;
    flex: 1;

    .content-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        align-items: center;
        span {
          padding: 4px 8px;
          border-radius: 2px;
          color: #fff;
          text-align: center;
          background: @red;
        }

        h2 {
          margin-left: 10px;
          font-size: 28px;
          font-weight: 500;
        }
      }

      p {
        padding: 2px 9px;
        border: 1px solid rgb(193, 191, 193);
        border-radius: 5px;
        background: #fff;
        user-select: none;
        cursor: pointer;
        i {
          margin: 0 5px;
        }
      }
    }

    .alias {
      margin: 10px 0 0 50px;
    }

    .content-bottom {
      margin: 20px 0;
      p {
        margin: 5px 0;
      }
      i {
        margin-right: 5px;
        vertical-align: -3px;
        font-size: 20px;
      }
    }
  }
}
</style>
