<template>
  <ul class="mv-list" v-if="mvs.length">
    <li v-for="m in mvs" :key="m.id">
      <div class="mv-img">
        <img class="mid-img" :src="m.imgurl + '?param=200y180'" />
        <p class="right-top">
          <i class="iconfont icon-video"></i>
          <span>{{numConvert(m.playCount)}}</span>
        </p>
        <p class="left-bottom">{{timeConvert(m.duration / 1000)}}</p>
      </div>
      <p class="mv-name text-ellipsis">{{m.name}}</p>
    </li>
  </ul>
  <div class="no-mvs" v-else>
    没有相关mv
  </div>
</template>

<script>
export default {
  props: {
    mvs: Array,
  },
};
</script>

<style lang="less">
.mv-list {
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 200px;
    margin: 20px;
    .mv-img {
      position: relative;
      height: 180px;

      .right-top {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 50%;
        color: #fff;
        padding: 5px 10px;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0),
          rgba(0, 0, 0, 0.3)
        );
        text-align: right;
        transition: 0.1s 0.5s;
        i {
          margin-right: 5px;
        }
      }

      .left-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 5px 10px;
        color: #fff;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(0, 0, 0, 0.3)
        );
      }
    }
    img {
      width: 100%;
    }
    .mv-name {
      width: 100%;
    }
  }
}
.no-mvs {
  text-align: center;
  margin-top: 80px;
}
</style>
