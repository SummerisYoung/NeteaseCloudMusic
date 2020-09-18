<template>
  <el-scrollbar id="song-detail">
    <div class="song-box">
      <div class="song-top">
        <div class="bg-img" :style="bgImg"></div>
        <div class="song-left">
          <div class="needle" ref="needle"></div>
          <div class="song-image">
            <img :src="songDetail.al.picUrl + '?param=260y260'" :style="rotateImg" />
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
          <h2>{{songDetail.name}}</h2>
          <ul class="song-subtitle">
            <li>
              专辑：
              <span class="keyword-highlight">{{songDetail.al.name}}</span>
            </li>
            <li>
              歌手：
              <span class="keyword-highlight" v-html="author(songDetail.ar)"></span>
            </li>
            <li>
              来源：
              <span class="keyword-highlight">搜索页</span>
            </li>
          </ul>
          <el-scrollbar class="lyric-box" ref="scroll">
            <ul class="lyric" ref="lyricUl">
              <li
                :class="[i == lyricHighLight ? 'lyric-highlight' : '']"
                v-for="(l,i) in lyricsArr"
                :key="i"
              >{{l}}</li>
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
            <span>(已有{{comments.total}}条评论)</span>
          </div>
          <div class="comment-input">
            <div>
              <i class="iconfont icon-pen"></i>
              <span>发表评论</span>
            </div>
            <div>
              <i class="iconfont icon-smile"></i>
              <i class="iconfont icon-aite"></i>
            </div>
          </div>
          <div class="comment-middle">
            <div class="hot-comment">
              <p class="comment-section">精彩评论</p>
              <ul>
                <li v-for="h in comments.hotComments" :key="h.id">
                  <img class="tiny-img-radius" :src="h.user.avatarUrl  + '?param=50y50'" />
                  <div class="comment-content">
                    <div>
                      <span class="keyword-highlight">{{h.user.nickname}}</span>
                      ：{{h.content}}
                    </div>

                    <div class="be-replied" v-if="h.beReplied.length">
                      <div v-if="h.beReplied[0].content">
                        <span class="keyword-highlight">@{{h.beReplied[0].user.nickname}}</span>
                        {{h.beReplied[0].content}}
                      </div>
                      <p style="text-align:center;" v-else>该评论已删除</p>
                    </div>

                    <div class="comment-other">
                      <p>{{stampToTime(h.time)}}</p>
                      <div class="comment-operate">
                        <p class="report">举报</p>
                        <p>
                          <i class="iconfont icon-like"></i>
                          <span v-if="h.likedCount">({{h.likedCount}})</span>
                        </p>
                        <p>分享</p>
                        <p>回复</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <p class="read-more">查看更多精彩评论></p>
            </div>

            <div class="new-comment">
              <p class="comment-section">最新评论</p>
              <span>({{comments.total}})</span>
              <ul>
                <li v-for="h in comments.comments" :key="h.id">
                  <img class="tiny-img-radius" :src="h.user.avatarUrl  + '?param=50y50'" />
                  <div class="comment-content">
                    <div>
                      <span class="keyword-highlight">{{h.user.nickname}}</span>
                      ：{{h.content}}
                    </div>

                    <div class="be-replied" v-if="h.beReplied.length">
                      <div v-if="h.beReplied[0].content">
                        <span class="keyword-highlight">@{{h.beReplied[0].user.nickname}}</span>
                        {{h.beReplied[0].content}}
                      </div>
                      <p style="text-align:center;" v-else>该评论已删除</p>
                    </div>

                    <div class="comment-other">
                      <p>{{stampToTime(h.time)}}</p>
                      <div class="comment-operate">
                        <p class="report">举报</p>
                        <p>
                          <i class="iconfont icon-like"></i>
                          <span v-if="h.likedCount">({{h.likedCount}})</span>
                        </p>
                        <p>分享</p>
                        <p>回复</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <p class="read-more">查看更多精彩评论></p>
            </div>
          </div>
        </div>
        <div class="comment-right">
          <div class="recommend-section">
            <h2>相似歌曲</h2>
            <ul>
              <li v-for="r in recommends" :key="r.id">
                <img class="tiny-img" :src="r.album.picUrl  + '?param=50y50'" />
                <div class="recommend-content">
                  <p class="text-ellipsis">
                    {{r.name}}
                    <span style="color:#999" v-if="r.alias.length">({{r.alias[0]}})</span>
                  </p>
                  <p class="text-ellipsis" v-html="author(r.artists)"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      lyricsArr: [], // 歌词数组
      lyricTime: [], // 歌词时间数组
      audio: null, // audio标签
      lyricHighLight: 0, // 高亮歌词项
      lyricNum: 0, // 比较歌词项
      lyricTop: 0, //歌词滚动长度
      rotate: 0, //旋转歌曲图片角度
      comments: {}, //歌曲评论
      recommends: {}, //相关推荐
    };
  },
  created() {
    // 从vuex获取audio标签
    this.audio = this.$store.state.audio;
    this.showLoading(() => {
      // 获取歌词
      this.getLyric();
      // 获取评论
      this.getComment();
      // 获取相关推荐
      this.getRecommend();
    });
  },
  mounted() {
    this.audio.ontimeupdate = this.lyricScroll;
  },
  computed: {
    // 背景虚化图
    bgImg() {
      return {
        "background-image": `url(${this.songDetail.al.picUrl})`,
      };
    },
    // 歌曲图片旋转
    rotateImg() {
      return {
        transform: `rotate(${this.rotate}deg)`,
      };
    },
    ...mapState(["songDetail"]),
  },
  methods: {
    // 获取歌词
    async getLyric() {
      let res = await this.get("/lyric?id=" + this.songDetail.id).then(
        (r) => r.lrc.lyric
      );
      this.makeLyrics(res);
    },
    // 获取评论
    async getComment() {
      this.comments = await this.get("/comment/music?id=" + this.songDetail.id);
    },
    // 获取相关推荐
    async getRecommend() {
      this.recommends = await this.get(
        "/simi/song?id=" + this.songDetail.id
      ).then((r) => r.songs);
    },
    // 歌词处理
    makeLyrics(val) {
      val.split("\n").forEach((l, i) => {
        // 时间为空的句子不要
        if (l.length) {
          let time = "";
          let lrc = "";
          // a是匹配到的整个字符串
          // $1是第一个小括号内的字符串,即分钟
          // $2是第二个小括号内的字符串,即秒钟和毫秒
          // 如a:[05:30.123],$1:05,$2:30.123
          // 用*把字符串转为数字
          lrc = l.replace(/\[(\d\d):(\d\d\.\d{2,3})\]/g, function (a, $1, $2) {
            time = $1 * 60 + $2.substring(0, 6) * 1;
            return "";
          });
          this.lyricsArr.push(lrc);
          this.lyricTime.push(time);
        }
      });
      // 处理一下时间数组,主要针对歌词最后存在一些混音编曲之类的作者的,这些的时间相同的情况,手动延迟一点时间
      for (let i = this.lyricTime.length - 15; i < this.lyricTime.length; i++) {
        // 如果前面的加了,那么可能出现前一项的时间大于后一项,所以判断这里是>=
        if (this.lyricTime[i - 1] >= this.lyricTime[i]) {
          this.lyricTime[i] = this.lyricTime[i - 1] + 0.5;
        }
      }
    },
    // 歌词滚动
    lyricScroll() {
      // 获取滚动条标签
      let resize = this.$refs.scroll.$refs.resize;
      let wrap = this.$refs.scroll.$refs.wrap;
      if (this.audio.currentTime > this.lyricTime[this.lyricNum]) {
        // 比较当前歌曲播放进度时间  大于 歌词时间列表的哪一项
        while (this.audio.currentTime > this.lyricTime[this.lyricNum]) {
          // 一直找
          this.lyricNum++;
        }
        // 退出寻找循环，说明有一项比当前歌曲进度快了，那么播放的歌词就是这一项的上一项
        this.lyricHighLight = this.lyricNum - 1;
        // 前四条歌词无需滚动
        if (this.lyricNum > 4) {
          // 歌词滚动
          let scrollTop =
            ((this.lyricNum - 4) / this.lyricTime.length) * resize.offsetHeight;
          wrap.scrollTo({ behavior: "smooth", top: scrollTop });
        }
      }
      // 避免比较歌词项越界导致this.lyricTime[this.lyricNum]为undefined的问题
      this.lyricNum = Math.min(this.lyricTime.length - 1, this.lyricNum);
      // 做完上述操作，要把num变为比歌曲播放的时间小一项，否则用户把歌曲往回拖动时，高亮无法回滚
      while (this.audio.currentTime < this.lyricTime[this.lyricNum]) {
        this.lyricNum--;
        // 避免比较歌词项越界导致this.lyricNum = -1的问题
        this.lyricNum = Math.max(this.lyricNum, 0);
      }

      // 歌曲结束,最后一句歌词取消高亮
      if (this.audio.ended) {
        this.lyricHighLight = 0;
      }

      // 暂停时变换图片上方的组件
      if (this.audio.paused) {
        this.$refs.needle.style.transform = "rotate(-35deg)";
      } else {
        // 播放时歌曲图片旋转
        this.$refs.needle.style.transform = "rotate(0deg)";
        this.rotate++;
      }
    },
    // 关闭歌曲详情页
    closeDetail() {
      // 关闭歌词滚动事件
      this.audio.ontimeupdate = null;
      this.$emit("closeDetail");
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

        .needle {
          position: absolute;
          left: calc(50% - 17.5px);
          top: -20px;
          width: 110px;
          height: 157px;
          z-index: 5;
          transform-origin: 20px 17.5px;
          background: url(/img/needle.png) no-repeat;
          background-size: contain;
          transition: 0.5s;
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

          img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 260px;
            border-radius: 50%;
            transition: 0.5s;
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
        display: flex;
        flex-direction: column;
        z-index: 5;
        margin-left: 150px;
        flex: 1;

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
            width: 33%;
            font-size: 12px;
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
              height: 60px;
              line-height: 60px;
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
                font-size: 12px;
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
