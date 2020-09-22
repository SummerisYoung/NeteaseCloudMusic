<template>
  <div class="user-top" >
    <img class="big-img" :src="userInfo.profile.avatarUrl + '?param=220y220'" />
    <div class="user-content">
      <div class="content-top">
        <div class="top-head">
          <div class="user-basic">
            <h2 class="nickname">{{userInfo.profile.nickname}}</h2>
            <!-- <img src="/img/vip.png" /> -->
            <i class="iconfont" :class="[userInfo.profile.gender == 1 ? 'icon-man' : 'icon-woman']"></i>
            <em>Lv.{{userInfo.level}}</em>
          </div>

          <div class="user-operate">
            <p>
              <i class="iconfont icon-email"></i>发私信
            </p>
            <p>
              <i class="iconfont icon-plus"></i>关注
            </p>
            <p>···</p>
          </div>
        </div>

        <div class="label" v-if="computedLabel">
          <i class="iconfont icon-star"></i>
          <span>{{computedLabel}}</span>
        </div>
      </div>

      <div class="content-middle">
        <div class="user-data">
          <h2 class="event-count">{{userInfo.profile.eventCount}}</h2>
          <span>动态</span>
        </div>

        <div class="user-data">
          <h2 class="user-follows">{{userInfo.profile.follows}}</h2>
          <span>关注</span>
        </div>

        <div class="user-data">
          <h2 class="user-followeds">{{numConvert(userInfo.profile.followeds)}}</h2>
          <span>粉丝</span>
        </div>
      </div>

      <div class="content-bottom">
        <p class="binding">
          <span>社交网络：</span>
          <i
            class="iconfont"
            :class="[userInfo.bindings[1] && userInfo.bindings[1].url ? 'icon-weibo' : '']"
          ></i>
          {{userInfo.bindings[1] && userInfo.bindings[1].url ? '' : '未绑定'}}
        </p>
        <p
          class="description"
        >个人介绍：{{userInfo.profile.signature ? userInfo.profile.signature : '暂无介绍'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: Object,
  },
  computed: {
    computedLabel() {
      let tags = []
      if(this.userInfo.profile.expertTags) {
        tags.push(`音乐(${this.userInfo.profile.expertTags.join('、')})`)
      }
      if(Object.keys(this.userInfo.profile.experts).length) {
        tags.push(...Object.values(this.userInfo.profile.experts))
      }
      return tags.join('、')
    }
  }
};
</script>

<style lang="less">
.user-top {
  display: flex;
  padding: 40px;
  user-select: none;
  .big-img {
    margin-right: 40px;
  }

  .user-content {
    flex: 1;
    .content-top {
      padding-bottom: 10px;
      border-bottom: @border;
      .top-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .user-basic {
          display: flex;
          align-items: center;

          * {
            margin-right: 15px;
          }
          .nickname {
            font-size: 28px;
          }
          img {
            height: 20px;
          }
          i {
            font-size: 24px;
          }
          em {
            padding: 2px 10px;
            border: 1px solid @red;
            color: @red;
            border-radius: 20px;
            font-weight: 600;
          }
          .icon-man {
            color: #1296db;
          }
          .icon-woman {
            color: rgb(255, 135, 195);
          }
        }

        .user-operate {
          display: flex;
          p {
            padding: 5px 10px;
            margin-right: 10px;
            border: @border;
            border-radius: 5px;
            font-size: 14px;
            i {
              margin-right: 5px;
            }

            &:nth-child(2) {
              i {
                color: @red;
              }
            }
          }
        }
      }

      .label {
        font-size: 14px;
        i {
          margin-right: 5px;
          background: rgb(255, 189, 32);
          border-radius: 50%;
          color: white;
          vertical-align: middle;
        }
      }
    }

    .content-middle {
      display: flex;
      margin: 10px 0;
      .user-data {
        width: 80px;
        margin-right: 25px;
        border-right: @border;
        box-sizing: content-box;

        &:last-child {
          border: none;
        }

        h2 {
          font-size: 24px;
        }

        span {
          font-size: 14px;
        }
      }
    }

    .content-bottom {
      overflow: hidden;
      p {
        margin: 10px 0;
        font-size: 12px;
      }
      .icon-weibo {
        color: @red;
      }
    }
  }
}
</style>
