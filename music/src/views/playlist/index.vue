<template>
  <div>
    <playlist-top :playlist="playlist" :currentIndex="currentIndex" v-if="this.playlist" @changeTab="changeTab"/>
    <tab :items="items" :tabLiStyle="tabLiStyle" :tabUlStyle="tabUlStyle"/>
    <component :is="playlistComponents" :playlist="playlist" v-if="this.playlist"></component>
  </div>
</template>

<script>
import Tab from "components/common/Tab";
import PlaylistTop from "./PlaylistTop";
import Playlists from "./Playlists";
export default {
  components: {
    Tab,
    PlaylistTop,
    Playlists,
  },
  data() {
    return {
      playlist: null,
      items: [],
      playlistTabComponent: ['Playlists','PlaylistComments','PlaylistFavorities'],
      currentIndex:0,
      tabLiStyle: 'border-bottom-width:4px; line-height: 30px',
      tabUlStyle: 'width:30%; margin: 0 60px; border-bottom: none'
    };
  },
  computed: {
    playlistComponents() {
      return this.playlistTabComponent[this.currentIndex]
    }
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    // 请求数据
    async getData() {
      this.playlist = await this.get(
        "/playlist/detail?id=" + this.$route.query.id
      ).then((r) => r.playlist);
      this.items = ["歌曲列表", `评论(${this.playlist.commentCount})`, "收藏者"]
    },
    // 接受子组件传递过来的index值,修改当前下标
    changeTab(index){
      this.currentIndex = index
    }
  },
};
</script>

<style lang="less">
.playlist-bottom {
  .section {
    display: flex;
    height: 30px;
    border-bottom: @border;

    li {
      margin-left: 100px;
      line-height: 100%;
      box-sizing: content-box;
      cursor: pointer;
    }

    .active {
      color: @red;
      border-bottom: 5px solid @red;
      box-sizing: border-box;
    }
  }

  .comment {
    padding: 0 40px;
    .comment-input {
      display: flex;
      justify-content: space-between;
      margin: 30px 0;
      width: 100%;
      border: 10px solid rgb(240, 240, 242);
      color: #999;
      i {
        margin: 5px;
        font-size: 30px;
        color: #999;
      }
      .aite {
        font-size: 28px;
        font-weight: 300;
      }

      div:first-child {
        display: flex;
        align-items: center;
      }

      div:last-child {
        display: flex;
      }
    }

    .comment-middle {
      .comment-section {
        font-size: 14px;
      }
      ul {
        margin: 20px 0;
        li {
          display: flex;
          padding: 20px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;

          .report {
            display: none;

            &:hover {
              color: #666;
            }
          }

          &:hover .report {
            display: block;
          }

          .comment-content {
            flex: 1;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 14px;
            div {
              margin-bottom: 20px;

              &:last-child {
                margin-bottom: 0;
              }
            }

            .be-replied {
              padding: 10px;
              background: rgb(241, 241, 244);
              color: #333;
            }

            .comment-other {
              display: flex;
              justify-content: space-between;
              color: #999;

              .comment-operate {
                display: flex;

                p {
                  padding: 0 15px;
                  user-select: none;
                  cursor: pointer;

                  &:nth-child(-n + 2) {
                    border-right: @border;
                  }
                  &:last-child {
                    padding-right: 0;
                  }
                }
              }
            }
          }
        }
      }

      .hot-comment,
      .new-comment {
        margin-bottom: 30px;
        .read-more {
          text-align: center;
          color: #666;
        }
      }
    }
  }

  .subscribers {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 120px;
      margin: 40px 40px;
      text-align: center;
      p {
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
