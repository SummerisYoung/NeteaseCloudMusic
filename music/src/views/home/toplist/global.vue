<template>
  <div class="global playlist">
    <h2>全球榜</h2>
    <play-list-ul :playlists="globalList"/>
  </div>
</template>

<script>
import PlayListUl from "components/common/PlayListUl"
export default {
  components: {
    PlayListUl
  },
  props: {
    globalList: Array,
  }
};
</script>

<style lang="less">
</style>
