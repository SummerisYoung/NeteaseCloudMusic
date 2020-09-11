<template>
  <ul class="sub-nav-ul">
    <li
      :class="[index == currentIndex ? activeClass : '']"
      v-for="(item,index) in items"
      :key="item"
      @click="changeActive(index)"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    activeClass: {
      type: String,
      default: 'active-red'
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
  align-items: center;
  border-bottom: @border;

  li {
    width: 80px;
    height: 100%;
    line-height: 55px;
    box-sizing: content-box;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  .active-red {
    color: @red;
    border-bottom: 2px solid @red;
  }

  .active-grey {
    border-bottom: 2px solid grey;
  }
}
</style>
