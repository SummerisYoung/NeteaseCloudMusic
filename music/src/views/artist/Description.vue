<template>
  <div class="desc">
    <div v-for="(intro,index) in description.introduction" :key="intro.ti">
      <h3>{{intro.ti}}</h3>
      <ul v-if="description.introduction[index]">
        <li v-for="(t,j) in description.introduction[index].txt" :key="j">{{t}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: Object,
  },
};
</script>

<style lang="less">
.desc {
  padding: 40px;
  div {
    margin-bottom: 40px;
    h3 {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 900;
    }
    li {
      text-indent: 2em;
      line-height: 30px;
    }
  }
}
</style>
