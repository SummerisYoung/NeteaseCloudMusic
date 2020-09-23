<template>
  <div id="app">
    <!-- 顶部导航 -->
    <top-bar />

    <div class="middle">
      <!-- 侧边栏 -->
      <side-bar />

      <!-- 主体 -->
      <el-scrollbar style="flex:1;">
        <router-view />
      </el-scrollbar>
    </div>

    <!-- 底部 -->
    <foot />
  </div>
</template>

<script>
import TopBar from "components/topbar/TopBar";
import SideBar from "components/sidebar/SideBar";
import Foot from "components/foot/Foot";
export default {
  components: {
    TopBar,
    SideBar,
    Foot,
  },
};
</script>

<style lang="less">
@import url(//at.alicdn.com/t/font_2019206_we4zfqw804o.css);

/* 全局样式 */
// 最小宽度
body {
  position: relative;
  min-width: 1050px;
}
// 关键词高亮
.keyword-highlight {
  color: steelblue;
}
// 文字超出变为...
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
// 中间的内容高度100%
.middle {
  display: flex;
  height: calc(100vh - 130px);
  background: @light-background;
}
// 最小图
.tiny-img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
// 最小图圆角
.tiny-img-radius {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
// 小图
.small-img {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
// 小图圆角
.small-img-radius {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
}
// 中图
.mid-img {
  width: 180px;
  height: 180px;
  cursor: pointer;
}
// 大图
.big-img {
  width: 220px;
  height: 220px;
  border: @border;
}
// 点击这一行颜色变深
.deep-color {
  background: rgb(227, 227, 229) !important;
  span {
    color: #000;
  }
}
// 选中黑色样式
.default {
  color: #eee;
  background: grey;
  padding: 2px 5px;
  border-radius: 2px;
}
// li样式
.li-hover {
  position: relative;
  height: 100%;
  li {
    display: flex;
    align-items: center;
    padding: 10px 40px;
    cursor: pointer;

    &:nth-child(odd) {
      background: @light-background;
    }

    &:nth-child(even) {
      background: @dark-background;
    }

    &:hover {
      background: @lihover;
    }

    .search-item-name {
      width: 50%;
    }

    .tiny-img {
      margin-right: 20px;
    }
  }
}
// 所有图标都变成点击图标
.iconfont {
  cursor: pointer;
}
// element ui 滚动条样式设置
.el-scrollbar__wrap {
  margin-bottom: 0 !important;
  overflow-x: hidden !important;
}
.el-scrollbar__bar {
  opacity: 1 !important;
}
</style>
