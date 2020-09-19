<template>
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
</template>

<script>
export default {
  props: {
    songDetail: Object,
  },
  data() {
    return {
      recommends: {}, //相关推荐
    };
  },
  created() {
    this.getRecommend();
  },
  methods: {
    // 获取相关推荐
    async getRecommend() {
      this.recommends = await this.get(
        "/simi/song?id=" + this.songDetail.id
      ).then((r) => r.songs);
    },
  },
};
</script>

<style lang="less">
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
</style>
