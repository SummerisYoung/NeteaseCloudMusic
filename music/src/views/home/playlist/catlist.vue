<template>
  <div class="catlist">
    <p class="display-sub" id="display-sub" @click="openMenu()">
      <span id="display-sub">{{cat}}</span>
      <i class="iconfont icon-right" id="display-sub"></i>
    </p>
    <div class="menu-before" v-show="isOpen">
      <div class="catlist-main">
        <h6>添加标签</h6>
        <div class="catlist-menu">
          <p id="all" class="choose" @click="changeCat('全部歌单')">
            <span>全部歌单</span>
          </p>

          <div class="category" v-for="(value,key) in category" :key="key">
            <p>
              <i class="iconfont" :class="'icon-' + key"></i>
              <span>{{categoryCh[key]}}</span>
            </p>
            <ul>
              <li v-for="v in value" :key="v.name" @click="changeCat(v.name)">
                {{v.name}}
                <span v-if="v.hot" class="hot">HOT</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tagName: String
  },
  data() {
    return {
      category: {         // 分类
        language:[],
        style:[],
        scene:[],
        smile:[],
        theme:[]
      },
      categoryCh: {       // 分类名
        language:'语种',
        style:'风格',
        scene:'场景',
        smile:'情感',
        theme:'主题'
      },
      isOpen: false,      // 开关分类菜单
      cat: '全部菜单'      // 菜单选中项
    }
  },
  created() {
    this.$axios.get('/playlist/catlist').then(r => this.classify(r))
  },
  mounted() {
    // 给歌单分类添加滚动条
    this.$nextTick(() => {
      this.nicescroll('.catlist-menu')
    })
  },
  methods: {
    classify(r) {
      r.sub.forEach(c => {
        switch(c.category) {
          case 0: {
            this.category.language.push(c)
            break;
          }
          case 1: {
            this.category.style.push(c)
            break;
          }
          case 2: {
            this.category.scene.push(c)
            break;
          }
          case 3: {
            this.category.smile.push(c)
            break;
          }
          case 4: {
            this.category.theme.push(c)
            break;
          }
        }
      });
    },
    openMenu() {
      this.isOpen = !this.isOpen
    },
    changeCat(cat) {
      this.isOpen = false
      this.cat = cat
      this.$emit('changeCat',cat)
    }
  },
  watch: {
    // 如果传入了tag
    tagName(val) {
      this.cat = val
    }
  }
}
</script>

<style lang="less">
.catlist {
  position: relative;
  margin: 40px 20px 0 20px;
  .display-sub {
    display: inline;
    padding: 2px 10px;
    border: @border;
    cursor: pointer;
    user-select: none;
    background: #fff;
    &:hover {
      background: @dark-background;
    }
    .icon-right {
      display: inline-block;
      transform: rotate(90deg);
    }
  }

  .menu-before {
    position: absolute;
    top: 15px;
    left: 0;
    border-radius: 5px;
    z-index: 5;
    background: @light-background;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 20px;
      z-index: 5;
      border: 10px solid;
      border-color: transparent transparent #fff transparent;
    }
    &::after {
      content: "";
      position: absolute;
      top: -1px;
      left: 20px;
      border: 10px solid;
      border-color: transparent transparent rgb(225, 225, 226) transparent;
    }
    .catlist-main {
      position: absolute;
      top: 20px;
      left: 0;
      width: 640px;
      background: @dark-background;
      border-radius: 5px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);

      h6 {
        padding: 20px;
        border-bottom: @border;
      }
      .catlist-menu {
        padding: 10px 20px;
        height: 400px;
        #all {
          position: relative;
          width: 100%;
          height: 40px;
          padding: 10px;
          margin-bottom: 10px;
          border: @border;
          text-align: center;
          cursor: pointer;
          user-select: none;
          &:hover {
            background: @light-background;
          }
        }
        .category {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            display: flex;
            align-items: center;
            color: rgb(224, 148, 148);
            i {
              font-size: 36px;
            }
            span {
              font-size: 18px;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            width: 500px;
            li {
              position: relative;
              width: 20%;
              height: 40px;
              padding: 10px 0;
              text-align: center;
              border: @border;
              cursor: pointer;
              user-select: none;

              &:hover {
                background: @dark-background;
              }
              .hot {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 10px;
                font-weight: 900;
                color: @red;
              }
            }
          }
        }
        .choose {
          border-color: @red !important;
          &::after {
            content: "√";
            position: absolute;
            right: -9px;
            bottom: -9px;
            width: 0;
            height: 0;
            line-height: 12px;
            transform: scale(0.5);
            font-size: 20px;
            color: #fff;
            border: 16px solid @red;
            border-color: transparent @red @red transparent;
          }
        }
      }
    }
  }
}
</style>
