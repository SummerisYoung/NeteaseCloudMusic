<template>
  <div class="user-dj">
    <p class="user-item">Ta创建的电台({{djRadios.length}})</p>
    <ul>
      <li v-for="d in djRadios" :key="d.id">
        <div>
          <img class="tiny-img" :src="d.picUrl  + '?param=50y50'" />
          <span class="dj-name">{{d.name}}</span>
          <span class="dj-category">{{d.category}}</span>
        </div>

        <div>
          <span>节目{{d.programCount}}</span>
          <span>订阅{{numConvert(d.subCount)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    djRadios: Array,
  },
};
</script>

<style lang="less">
.user-dj {
  ul li {
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    cursor: pointer;

    &:nth-child(even) {
      background: @dark-background;
    }

    &:hover {
      background: @lihover;
    }

    div:first-child {
      display: flex;
      align-items: center;

      * {
        margin-right: 10px;
      }

      .dj-category {
        padding: 2px 5px;
        border: 1px solid @red;
        color: @red;
      }
    }

    div:last-child {
      color: #999;
      * {
        display: inline-block;
        width: 100px;
      }
    }
  }
}
</style>
