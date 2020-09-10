<template>
  <div class="tag">
    <span>{{tagName}}：</span>
    <ul>
      <li v-for="t in tags" :key="t.id">
        <span @click="changeTag(t.name)">{{t.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tagName: String,
    tags: Array,
  },
  methods: {
    changeTag(name) {
      this.$emit('changeTag',name)
    }
  }
};
</script>

<style lang="less">
.tag {
  margin: 10px 20px;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    li {
      padding: 0 20px;
      text-align: center;
      border-right: 1px solid #ccc;
      color: #999;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: #333;
      }
      &:last-child {
        border: none;
      }
      span {
        vertical-align: top;
      }
    }
  }
}
</style>
