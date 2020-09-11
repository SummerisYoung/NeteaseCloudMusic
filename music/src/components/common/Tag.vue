<template>
  <div class="tag">
    <span :class="[tagName == '筛选' ? 'tagname' : '']">{{tagName}}：</span>
    <ul :class="[tagName == '筛选' ? 'filter' : '']">
      <li v-for="t in tags" :key="t.name">
        <span :class="[active == t.value ? 'default' : '']" @click="changeTag(t)">{{t.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tagName: String,
    tags: Array,
    active: String
  },
  methods: {
    changeTag(o) {
      o.tagName = this.tagName
      this.$emit('changeTag',o)
    }
  }
};
</script>

<style lang="less">
.tag {
  margin: 10px 20px;
  display: flex;
  align-items: top;
  .tagname {
    width: 44px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
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
.filter li {
  margin-bottom: 20px;
}
</style>
