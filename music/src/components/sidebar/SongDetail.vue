<template>
  <el-scrollbar id="song-detail">
    <div class="song-box">
      <div class="song-top">
        <div class="bg-img" :style="bgImg"></div>
        <div class="song-left">
          <div class="song-image">
            <img width="400" height="400" src alt />
          </div>
          <ul>
            <li>
              <i class="iconfont icon-love"></i>喜欢
            </li>
            <li>
              <i class="iconfont icon-favority"></i>收藏
            </li>
            <li>
              <i class="iconfont icon-download"></i>VIP下载
            </li>
            <li>
              <i class="iconfont icon-share"></i>分享
            </li>
          </ul>
        </div>

        <div class="song-right">
          <h2></h2>
          <ul class="song-subtitle">
            <li>
              专辑：
              <span class="keyword-highlight"></span>
            </li>
            <li>
              歌手：
              <span class="keyword-highlight"></span>
            </li>
            <li>
              来源：
              <span class="keyword-highlight">搜索页</span>
            </li>
          </ul>
          <el-scrollbar class="lyric-box">
            <ul class="lyric">
              <li v-for="(l,i) in lyricsArr" :key="i">
                {{l}}
              </li>
            </ul>
          </el-scrollbar>
        </div>

        <div class="close-detail" @click="closeDetail">
          <i class="iconfont icon-narrow"></i>
        </div>
      </div>

      <div class="song-bottom">
        <div class="comment-left">
          <div class="comment-head">
            <h2>听友评论</h2>
          </div>
          <div class="comment-input">
            <div>
              <i class="iconfont icon-pen"></i>
              <span>发表评论</span>
            </div>
            <div>
              <i class="iconfont icon-smile"></i>
              <span class="aite">@</span>
            </div>
          </div>
          <div class="comment-middle"></div>
        </div>
        <div class="comment-right"></div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lyrics: "", //歌词
      lyricsArr: [],//歌词数组
      lyricTime: [], //歌词时间数组
    };
  },
  created() {
    // 获取歌词
    this.getLyric();
  },
  computed: {
    bgImg() {
      return {'background-image':`url(${this.$store.state.songDetail.al.picUrl})`}
    }
  },
  watch: {
    // 歌词处理
    lyrics(val) {
      val.split("\n").forEach((l, i) => {
        let time = ''
        let lrc = ''
        // a是匹配到的整个字符串
        // $1是第一个小括号内的字符串,即分钟
        // $2是第二个小括号内的字符串,即秒钟和毫秒
        // 如a:[05:30.123],$1:05,$2:30.123
        // 用*把字符串转为数字
        lrc = l.replace(/\[(\d\d):(\d\d\.\d{2,3})\]/g, function (a, $1, $2) {
          time = $1 * 60 + $2.substring(0, 6) * 1;
          return "";
        });
        this.lyricsArr.push(lrc)
        this.lyricTime.push(time)
      });
    },
  },
  methods: {
    // 获取歌词
    getLyric() {
      this.$axios
        .get("/lyric?id=" + this.$store.state.songDetail.id)
        .then((r) => {
          this.lyrics = r.lrc.lyric;
        });
    },
    // 关闭歌曲详情页
    closeDetail() {
      this.$emit('closeDetail')
    },
  },
};
</script>

<style lang="less">
#song-detail {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 5;
  width: 100vw;
  height: 100%;
  background: rgb(250, 250, 250);
  transition: 0.5s;

  .song-box {
    position: relative;
    padding: 0 140px;

    .bg-img {
      position: absolute;
      width: 100%;
      height: 500px;
      filter: blur(50px);
      background-size: cover;
      background-position: center;
    }

    .song-top {
      position: relative;
      top: 0;
      z-index: 100;
      display: flex;
      margin-bottom: 80px;
      width: 100%;
      height: 550px;

      .song-left {
        position: relative;
        width: 50%;
        height: 100%;

        &::before {
          content: "";
          position: absolute;
          left: calc(50% - 17.5px);
          top: -20px;
          width: 110px;
          height: 157px;
          z-index: 5;
          transform-origin: 20px 17.5px;
          background: url(/img/needle.png) no-repeat;
          background-size: contain;
        }

        .song-image {
          position: relative;
          margin: 60px auto;
          width: 400px;
          height: 400px;
          background: url(/img/singlecover.png) no-repeat;
          background-position: 50%;
          background-size: 105%;
          border: 10px solid rgba(218, 214, 215, 0.5);
          border-radius: 50%;
          transition: 0.5s;
          img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 260px;
            border-radius: 50%;
          }
        }
        ul {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: space-between;
          width: 400px;

          li {
            padding: 10px 15px;
            border: 1px solid rgb(193, 191, 193);
            border-radius: 5px;
            background: @dark-background;

            i {
              margin-right: 5px;
            }
          }
        }
      }

      .song-right {
        margin-left: 150px;
        flex: 1;
        display: flex;
        flex-direction: column;

        h2 {
          width: 500px;
          margin-top: 30px;
          margin-bottom: 10px;
          font-size: 28px;
        }

        .song-subtitle {
          margin-bottom: 30px;

          li {
            display: inline-block;
          }
        }
        .lyric-box {
          position: relative;
          width: 100%;
          overflow: hidden;
          flex: 1;
          border-right: @border;
          .lyric {
            position: relative;

            li {
              color: #000;
              font-size: 14px;
              padding: 10px 0;
              transition: 0.5s;
            }

            .lyric-highlight {
              color: #fff;
            }
          }
        }
      }

      .close-detail {
        position: absolute;
        top: 30px;
        right: -70px;
        padding: 5px;
        width: 40px;
        border-radius: 5px;
        text-align: center;
        background: @dark-background;
        border: @border;

        i {
          font-size: 20px;
        }
      }

      ul li {
        font-size: 14px;
        color: #333;
      }
    }

    .song-bottom {
      display: flex;

      .comment-left {
        margin-right: 100px;
        width: 700px;

        .comment-head {
          display: flex;
          align-items: flex-end;
          padding-bottom: 10px;
          border-bottom: @border;
          font-size: 24px;
          span {
            margin-left: 20px;
            color: #999;
            font-size: 12px;
          }
        }

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

      .comment-right {
        flex: 1;

        .recommend-section {
          h2 {
            padding-bottom: 10px;
            border-bottom: @border;
            font-size: 24px;
          }

          ul {
            li {
              display: flex;
              padding: 10px 0;
              cursor: pointer;

              &:hover {
                background: @lihover;
              }

              .tiny-img {
                border: @border;
              }

              .recommend-content {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;

                p:last-child {
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
