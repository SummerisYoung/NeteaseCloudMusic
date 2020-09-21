<template>
  <div id="album">
    <div class="album-item">
      <img class="mid-img" :src="hotSongs[0].al.picUrl + '?param=180y180'" v-if="hotSongs[0].al" />
      <div class="album-right">
        <div class="album-title">
          <p>热门50首</p>
          <p>
            <i class="iconfont icon-favority"></i>
            <i class="iconfont icon-play"></i>
          </p>
        </div>
        <song-list-two
          :class="[!all50 && hotSongs.length > 10 ? 'beyond' : '']"
          :songs="hotSongs"
          liStyle="padding: none"
          :listTitle="false"
          indexStyle="text-align:center;margin-right: 0"
          :artist="false"
          :album="false"
        />

        <p v-if="!all50 && hotSongs.length > 10" @click="lookAll50()">查看全部50首></p>
      </div>
    </div>

    <div class="album-item" v-for="(a,i) in hotAlbums" :key="a.id">
      <div class="album-left">
        <div class="bg"></div>
        <img class="mid-img" :src="a.picUrl  + '?param=180y180'" />
        <p>{{stampToTime(a.publishTime).split(' ')[0]}}</p>
      </div>
      <div class="album-right" v-if="hotAlbumSongs[i]">
        <div class="album-title">
          <p>{{a.name}}</p>
          <p>
            <i class="iconfont icon-favority"></i>
            <i class="iconfont icon-play"></i>
          </p>
        </div>
        <song-list-two
          :class="[hotAlbumSongs[i].length >10  ? 'beyond' : '']"
          :songs="hotAlbumSongs[i]"
          liStyle="padding: none"
          :listTitle="false"
          indexStyle="text-align:center;margin-right: 0"
          :artist="false"
          :album="false"
        />
        <p
          @click="goAlbum(hotAlbums[i].id)"
          v-if="hotAlbumSongs[i].length > 10"
        >查看全部{{hotAlbumSongs[i].length}}首></p>
      </div>
    </div>
  </div>
</template>

<script>
import SongListTwo from "components/common/SongListTwo";
export default {
  components: {
    SongListTwo,
  },
  props: {
    hotSongs: Array,
  },
  data() {
    return {
      hotAlbums: [], // 热门专辑
      hotAlbumSongs: [], // 热门专辑里的歌曲
      all50: false,// 是否查看全部50首
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // 获取热门专辑的id
      let arr = await this.get(
        "/artist/album?id=" + this.$route.query.id + "&limit=10"
      ).then((r) => {
        this.hotAlbums = r.hotAlbums;
        return r.hotAlbums.map((a) => {
          return a.id;
        });
      });
      // 并发请求热门专辑歌曲
      this.hotAlbumSongs = await this.all(
        arr.map((a) => {
          return this.get("/album?id=" + a).then((r) => r.songs);
        })
      );
    },
    lookAll50() {
      this.all50 = true
    }
  },
};
</script>

<style lang="less">
#album {
  padding: 40px;
  .album-item {
    display: flex;
    margin-bottom: 40px;
    .album-left {
      position: relative;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 220px;
        height: 180px;
        background: url(/img/coverall.png);
        background-position: 0 -986px;
      }
    }
    .album-right {
      margin-left: 100px;
      flex: 1;

      .album-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        p:last-child {
          color: #999;
          i {
            margin: 0 10px;
            cursor: pointer;

            &:last-child {
              border: 1px solid grey;
              border-radius: 50%;
              font-size: 14px;
            }

            &:hover {
              color: #666;
            }
          }
        }
      }

      .main {
        border: @border;
      }

      .beyond {
        height: 384px;
        overflow: hidden;
      }

      & > p {
        margin: 10px;
        color: #999;
        cursor: pointer;
      }
    }
  }
}
</style>
