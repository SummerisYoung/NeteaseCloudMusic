<template>
  <div>
    <div class="block-header">
      <h2>推荐MV</h2>
      <span>更多></span>
    </div>

    <div class="block-list block-mv">
      <div class="block-item" v-for="m in mvs" :key="m.id">
        <img class="mid-img" :src="m.picUrl + '?param=300y180'" />
        <p>{{m.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvs: Array,
  }
};
</script>

<style lang="less">
.block-mv {
  .block-item {
    width: calc(25% - 10px);
    img,
    p {
      width: 100%;
    }
  }
}
</style>
