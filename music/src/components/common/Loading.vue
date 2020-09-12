<template>
  <div class="loading">
    <img src='/img/loading.gif'>
    载入中...
  </div>
</template>

<style lang="less">
// 载入中
.loading{
  display: flex;
  align-items: center;
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
      width: 20px;
      height: 20px;
  }
}
</style>
