<template>
  <ul class="artists-ul">
    <li v-for="a in artists" :key="a.id" @click="goArtist(a.id)">
      <img class="mid-img" :src="a.picUrl  + '?param=180y180'" />
      <div>
        <span>{{a.name}}</span>
        <span>
          <i class="iconfont icon-user"></i>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    artists: Array,
  },
};
</script>

<style lang="less">
.artists-ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &::after {
    content: "";
    width: 210px;
  }
  li {
    margin: 20px;
    div {
      display: flex;
      justify-content: space-between;
      i {
        color: @red;
        font-weight: 900;
        font-size: 14px;
        border: 1px solid rgba(198, 47, 47, 0.5);
        border-radius: 50%;
      }
    }
  }
}
</style>
