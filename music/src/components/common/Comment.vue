<template>
  <div class="comment" :style="{width: commentWidth}">
    <div class="comment-head" v-if="head">
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
      <div class="hot-comment" v-if="comments.hotComments && comments.hotComments.length">
        <span>精彩评论</span>
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
        <span>最新评论</span>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: Object,
    head: {
      type: Boolean,
      default: true
    },
    commentWidth: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less">
.comment {
  padding: 0 40px;
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
</style>
