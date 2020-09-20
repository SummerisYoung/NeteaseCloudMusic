<template>
  <ul class="subscribers">
    <li v-for="s in subscribers" :key="s.id">
      <img class="small-img-radius" :src="s.avatarUrl +'?param=100y100'" />
      <p class="text-ellipsis">{{s.nickname}}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    subscribers: Array,
  },
};
</script>

<style lang="less">
.subscribers {
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px;
  li {
    width: 120px;
    margin: 40px 40px;
    text-align: center;
    p {
      color: #333;
      font-size: 14px;
    }
  }
}
</style>
