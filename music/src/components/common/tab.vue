<template>
  <ul class="sub-nav-ul" :style="tabUlStyle">
    <li
      :class="[index == currentIndex ? activeClass : '']"
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
    tabUlStyle: String,
    activeClass: {
      type: String,
      default: 'active'
    }
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

  li {
    width: 90px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  .active {
    color: @red;
    border-bottom: 2px solid @red;
  }
  .active-grey {
    color: #000 !important;
    border-bottom: 2px solid rgb(153,153,153);
  }
}
</style>
