<template>
  <div class="global playlist">
    <h2>全球榜</h2>
    <cover-list :covers="globalList"/>
  </div>
</template>

<script>
import CoverList from "components/common/CoverList"
export default {
  components: {
    CoverList
  },
  props: {
    globalList: Array,
  }
};
</script>

<style lang="less">
</style>
