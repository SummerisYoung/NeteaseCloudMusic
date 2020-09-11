<template>
  <div>
    <tag tagName="语种" :tags="area" :active="areaActive" @changeTag="changeTag" />
    <tag tagName="分类" :tags="type" :active="typeActive" @changeTag="changeTag" />
    <tag tagName="筛选" :tags="initial" :active="initialActive" @changeTag="changeTag" />
    <artist-item :artists="artists" />
  </div>
</template>

<script>
import Tag from "components/common/Tag";
import ArtistItem from "./artistItem";
export default {
  components: {
    Tag,
    ArtistItem,
  },
  data() {
    return {
      area: [
        { name: "全部", value: -1 },
        { name: "华语", value: 7 },
        { name: "欧美", value: 96 },
        { name: "日本", value: 8 },
        { name: "韩国", value: 16 },
        { name: "其他", value: 0 },
      ], // 语种
      type: [
        { name: "全部", value: -1 },
        { name: "男歌手", value: 1 },
        { name: "女歌手", value: 2 },
        { name: "乐队组合", value: 3 },
      ], // 分类
      initial: [
        { name: "热门", value: -1 },
        { name: "A", value: "a" },
        { name: "B", value: "b" },
        { name: "C", value: "c" },
        { name: "D", value: "d" },
        { name: "E", value: "e" },
        { name: "F", value: "f" },
        { name: "G", value: "g" },
        { name: "H", value: "h" },
        { name: "I", value: "i" },
        { name: "J", value: "j" },
        { name: "K", value: "k" },
        { name: "L", value: "l" },
        { name: "M", value: "m" },
        { name: "N", value: "n" },
        { name: "O", value: "o" },
        { name: "P", value: "p" },
        { name: "Q", value: "q" },
        { name: "R", value: "r" },
        { name: "S", value: "s" },
        { name: "T", value: "t" },
        { name: "U", value: "u" },
        { name: "V", value: "v" },
        { name: "W", value: "w" },
        { name: "X", value: "x" },
        { name: "Y", value: "y" },
        { name: "Z", value: "z" },
        { name: "#", value: "0" },
      ], //筛选
      areaActive: "-1", //默认语种
      typeActive: "-1", //默认语种
      initialActive: "-1", //默认语种
      artists: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(area = -1, type = -1, initial = -1) {
      this.$axios.get("/artist/list?type=" + type + "&area=" + area + "&initial=" + initial)
        .then((r) => {
          this.artists = r.artists;
        });
    },
    // 更改标签
    changeTag(tag) {
      console.log(tag.name);
      switch(tag.tagName) {
        case '语种': {
          this.areaActive = tag.value + ''
          break
        }
        case '分类': {
          this.typeActive = tag.value + ''
          break
        }
        case '筛选': {
          this.initialActive = tag.value + ''
        }
      }
      this.getData(this.areaActive, this.typeActive, this.initialActive)
    }
  },
};
</script>

<style lang="less">
</style>
