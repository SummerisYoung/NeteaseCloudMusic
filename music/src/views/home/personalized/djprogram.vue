<template>
  <div>
    <div class="block-header">
      <h2>主播电台</h2>
      <span>更多></span>
    </div>

    <div class="block-list block-mv">
      <div v-for="d in djprograms" :key="d.id">
        <img class="mid-img" :src="d.picUrl + '?param=180y180'" />
        <p class="text-ellipsis">{{d.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    djprograms: Array,
  },
};
</script>

<style lang="less">
.block-list {
  img {
    margin: 10px 0;
    cursor: pointer;
  }

  p {
    width: 180px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
