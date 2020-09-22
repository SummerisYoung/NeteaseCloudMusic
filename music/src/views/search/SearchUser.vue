<template>
  <loading v-if="$store.state.loading" />
  <div class="search-user" v-else>
    <ul class="li-hover">
      <li v-for="p in userprofiles" :key="p.userId" @click="goUser(p.userId)">
        <img class="tiny-img-radius" :src="p.avatarUrl + '?param=50y50'" />
        <span class="nickname" v-html="highlight(p.nickname, keyword)"></span>
        <i class="iconfont" :class="[p.gender == 1 ? 'icon-man' : 'icon-woman']"></i>
        <span class="signature">{{p.anchor ? '网易音乐人' : p.signature}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
export default {
  components: {
    Loading,
  },
  props: {
    keyword: String,
  },
  data() {
    return {
      userprofiles: null,
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=1002"
      ).then((r) => r.result);
      this.userprofiles = res.userprofiles;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight(
          "",
          this.keyword
        )}"，找到${res.userprofileCount}位用户`
      );
    },
  },
};
</script>

<style lang="less">
.search-user {
  ul {
    li {
      display: flex;
      align-items: center;
      .tiny-img-radius, .nickname {
        margin-right: 20px;
      }
      .icon-man {
        color: #1296db;
      }
      .icon-woman {
        color: rgb(255, 135, 195);
      }
      .signature {
        float: right;
        margin-left: auto;
        color: #666;
      }
    }
  }
}
</style>
