<template>
  <div>
    <cat-list :tagName="tagName" @changeCat="changeCat" />
    <tag tagName="热门标签" active="" :tags="tags" @changeTag="changeTag"/>
    <play-list-ul :playlists="playlists"/>
  </div>
</template>

<script>
import PlayListUl from "components/common/PlayListUl"
import Tag from "components/common/Tag"
import CatList from "./catlist";
export default {
  components: {
    PlayListUl,Tag,CatList
  },
  data() {
    return {
      playlists: [],
      tags: [],
      tagName: ''     // 点击的tag名
    };
  },
  created() {
    this.changeCat("全部");
    this.getTags();
  },
  methods: {
    // 获取分类
    changeCat(cat) {
      // 加载loading
      this.$store.commit('changeLoading',true)
      // 请求数据
      this.$axios.get("/top/playlist?limit=100&cat=" + cat).then((r) => {
        this.playlists = r.playlists;
        // 取消loading
        this.$store.commit('changeLoading',false)
      });
    },
    // 获取热门标签
    getTags() {
      this.$axios.get('/playlist/hot').then(r => {
        this.tags = r.tags
      })
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
