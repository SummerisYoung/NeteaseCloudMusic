<template>
  <div class="search-radio">
    <p class="title">主播电台</p>
    <ul>
      <li v-for="d in djRadios" :key="d.id">
        <img class="mid-img" :src="d.picUrl + '?param=180y180'" />
        <p class="playlist-name text-ellipsis" v-html="highlight(d.name, keyword)"></p>
        <p class="dj-creator">by {{d.dj.nickname}}</p>
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
      djRadios: null,
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=1009"
      ).then((r) => r.result);
      this.djRadios = res.djRadios;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight("", this.keyword)}"，找到${
          res.djRadiosCount
        }个电台`
      );
    },
  },
};
</script>

<style lang="less">
.search-radio {
  .title {
    padding: 10px 40px;
    border-bottom: @border;
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 20px;
    li {
      margin: 20px;
      width: 180px;
      p {
        width: 100%;
        font-size: 12px;
      }
      .dj-creator {
        color: #999;
      }
    }
  }
}
</style>
