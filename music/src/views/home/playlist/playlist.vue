<template>
  <div>
    <cat-list :tagName="tagName" @changeCat="changeCat" />
    <tag tagName="热门标签" active="" :tags="tags" @changeTag="changeTag"/>
    <loading v-if="$store.state.loading"/>
    <play-list-ul :playlists="playlists" v-else/>
  </div>
</template>

<script>
import Loading from 'components/common/Loading'
import PlayListUl from "components/common/PlayListUl"
import Tag from "components/common/Tag"
import CatList from "./catlist";
export default {
  components: {
    Loading,PlayListUl,Tag,CatList
  },
  data() {
    return {
      playlists: [],
      tags: [],
      tagName: ''     // 点击的tag名
    };
  },
  created() {
    this.changeCat();
    this.getTags();
  },
  methods: {
    // 获取分类
    changeCat(cat = "全部") {
      // 请求数据
      this.showLoading(async () => {
        this.playlists = await this.get("/top/playlist?limit=100&cat=" + cat).then(r => r.playlists)
      })
    },
    // 获取热门标签
    async getTags() {
      this.tags = await this.get('/playlist/hot').then(r => r.tags)
    },
    // 点击了热门标签
    changeTag(tag) {
      this.tagName = tag.name
      this.changeCat(tag.name)
    }
  },
};
</script>

<style lang="less">
</style>
