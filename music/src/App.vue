<template>
  <div id="app">
    <!-- 顶部导航 -->
    <top-bar />

    <div class="middle">
      <!-- 侧边栏 -->
      <side-bar />

      <!-- 主体 -->
      <router-view/>
    </div>

    <!-- 底部 -->
    <foot />
  </div>
</template>

<script>
import TopBar from './components/topbar/topbar'
import SideBar from './components/sidebar/sidebar'
import Foot from './components/foot/foot'
export default {
  components: {
    TopBar,SideBar,Foot
  }
}
</script>

<style lang="less">
@import url(//at.alicdn.com/t/font_2019206_i0e5kj949z.css);
</style>
