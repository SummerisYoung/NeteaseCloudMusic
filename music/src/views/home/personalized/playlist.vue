<template>
  <div>
    <div class="block-header">
      <h2>推荐歌单</h2>
      <span @click="changeTab()">更多></span>
    </div>

    <cover-list :covers="playlists" :copywriter="true"/>
  </div>
</template>

<script>
import CoverList from "components/common/CoverList";
export default {
  components: {
    CoverList,
  },
  props: {
    playlists: Array,
  },
  methods: {
    changeTab() {
      this.$emit('changeTab',1)
    }
  }
};
</script>

<style lang="less">
.block-list {
  .block-item {
    margin-bottom: 30px;
    img {
      margin: 10px 0;
      border: @border;
      cursor: pointer;
    }

    p {
      width: 180px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
