<template>
  <div class="description">
    <h3>专辑介绍</h3>
    <ul>
      <li v-for="d in description" :key="d">{{d}}</li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    description: Array,
  },
};
</script>

<style lang="less">
.description {
  padding: 40px;
  h3 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 900;
  }
  ul li {
    text-indent: 2em;
    line-height: 30px;
  }
}
</style>
