<template>
  <ul class="sub-nav-ul" :style="tabUlStyle">
    <li
      :class="[index == currentIndex ? 'active' : '']"
      :style="tabLiStyle"
      v-for="(item,index) in items"
      :key="item"
      @click="changeActive(index)"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array,
    currentIndex: {
      type: Number,
      default: 0,
    },
    tabLiStyle: String,
    tabUlStyle: String
  },
  methods: {
    // 更改tab下标,并将点击的下标值传递给父级
    changeActive(index) {
      this.$emit("changeTab", index);
    },
  },
};
</script>

<style lang="less">
.sub-nav-ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: @border;

  li {
    width: 90px;
    height: 100%;
    line-height: 55px;
    box-sizing: content-box;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  .active {
    color: @red;
    border-bottom: 2px solid @red;
  }
}
</style>
