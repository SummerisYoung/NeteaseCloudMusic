<template>
  <div id="topbar">
    <!-- logo -->
    <div class="logo">
      <h2>
        <a href="/">
          <i class="iconfont icon-wangyiyun"></i>
          网易云音乐
        </a>
      </h2>
    </div>
    <!-- 前进、后退、搜索 -->
    <div class="topbar-middle">
      <i class="iconfont icon-left"></i>
      <i class="iconfont icon-right"></i>
      <search-box />
    </div>
    <!-- 登录、vip、皮肤、消息、设置、分享、缩小、放大、关闭 -->
    <div class="menu">
      <div id="menu-left" class="action">
        <i class="iconfont icon-user"></i>
        <span>未登录</span>
        <i class="iconfont icon-down"></i>
        <span>开通VIP</span>
      </div>
      <div id="menu-middle" class="action">
        <i class="iconfont icon-cloth"></i>
        <i class="iconfont icon-email"></i>
        <i class="iconfont icon-setting"></i>
      </div>
      <span id="gun">丨</span>
      <div id="menu-right" class="action">
        <i class="iconfont icon-share"></i>
        <i class="iconfont icon-shrink"></i>
        <i class="iconfont icon-enlarge"></i>
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from './SearchBox'
export default {
  components: {
    SearchBox
  },
  
};
</script>

<style lang="less">
#topbar {
  display: flex;
  align-items: center;
  height: 65px;
  margin-left: auto;
  color: #fff;
  background: @red;

  /* 左侧logo */
  .logo {
    padding-left: 20px;
    width: 240px;

    h2 {
      font-size: 20px;
    }

    i {
      display: inline-block;
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      background: #fff;
      color: @red;
      font-size: 20px;
      border-radius: 50%;
    }
  }

  .topbar-middle {
    > i {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      width: 30px;
      font-size: 20px;
      vertical-align: -2px;
      font-weight: 900;
      color: @red-grey;
      text-align: center;
      border: 1px solid rgb(168, 40, 40);
      cursor: pointer;
    }
    > i:nth-child(1) {
      border-right: transparent;
    }
  }

  .menu {
    float: right;
    display: flex;
    margin-left: auto;

    .action {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: rgb(238, 193, 193);

      i {
        font-size: 18px;
        margin: 0 10px;
      }
    }

    #menu-left {
      margin-right: 5px;

      i:nth-child(1) {
        height: 26px;
        width: 26px;
        line-height: 26px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        background: rgb(225, 227, 228);
      }

      span {
        font-size: 14px;
      }
    }

    #menu-middle {
      i:nth-child(2) {
        font-size: 22px;
      }
    }

    #gun {
      color: rgb(168, 40, 40);
    }

    #menu-right {
      i:nth-child(1) {
        font-size: 22px;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
