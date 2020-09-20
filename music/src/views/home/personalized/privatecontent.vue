<template>
  <div>
    <div class="block-header">
      <h2>独家放送</h2>
      <span>更多></span>
    </div>

    <div class="block-list block-privatecontent">
      <div class="block-item" v-for="p in privatecontents" :key="p.id">
        <i class="iconfont icon-video"></i>
        <img class="mid-img" :src="p.picUrl + '?param=380y180'" />
        <p>{{p.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    privatecontents: Array,
  },
};
</script>

<style lang="less">
.block-privatecontent {
  .block-item {
    position: relative;
    i {
      position: absolute;
      top: 10px;
      left: 0;
      margin: 5px;
      width: 35px;
      height: 35px;
      line-height: 32px;
      border: @border;
      color: #ddd;
      text-align: center;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
    }
    img,
    p {
      width: 100%;
    }
  }
}
</style>
