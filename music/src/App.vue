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
import TopBar from 'components/topbar/topbar'
import SideBar from 'components/sidebar/sidebar'
import Foot from 'components/foot/foot'
export default {
  components: {
    TopBar,SideBar,Foot
  }
}
</script>

<style lang="less">
@import url(//at.alicdn.com/t/font_2019206_i0e5kj949z.css);

/* 全局样式 */
// 最小宽度
body {
    position: relative;
    min-width: 1050px;
}
// 中部内容
.middle {
    display: flex;
}
// 关键词高亮
.keyword-highlight {
    color: steelblue;
    cursor: pointer;
    user-select: none;
}
// 文字超出变为...
.text-ellipsis {
    white-space:nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
// 中间的内容高度100%
.middle {
    height: calc(100vh - 130px);
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
    background: rgb(227,227,229) !important;
    td {
        color: #000;
    }
    td:nth-child(1),td:nth-child(6) {
        color: #000;
    }
    td:nth-child(3) {
        p {
            color: #000 !important;
        }
    }
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
// 歌曲列表
table {
    width: 100%;
    color: #666;
    table-layout: fixed;
    user-select: none;
    thead {
        th {
            padding: 8px;
            font-weight: normal;
            border: @border;
            border-left: none;

            &:last-child {
                border-right: none;
            }
        } 
    }
    
    tbody {
        td {
            padding: 5px;
        }

        tr {
            line-height: 25px;
        }

        tr > td:first-child {
            vertical-align: top;
            text-align: right;
            color: #999;
        }

        tr > td:nth-child(2) {
            display: flex;
            justify-content: space-evenly;
            color: #ccc;
        }

        tr > td:nth-child(3) {
            color: #333;
        }

        tr > td:nth-child(n + 6) {
            color: #999;
        }

        tr:nth-child(even) {
            background: @dark-background;
        }

        tr:hover {
            background: rgb(235,236,237);
        }
    }
}
// li的hover样式
.li-hover{
    li {
        display: flex;
        align-items: center;
        line-height: 30px;
    }
    
    li:nth-child(even) {
        background: @dark-background;
    }
    
    li:hover {
        background: rgb(235,236,237);
    }
}
// 所有图标都变成点击图标
.iconfont {
    cursor: pointer;
}
</style>
