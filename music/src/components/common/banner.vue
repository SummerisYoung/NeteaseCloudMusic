<template>
<div class="banner" @mouseenter="swiperPause()" @mouseleave="swiperBegin()">
  <ul class="banner-ul" id="banner">
    <li :class="picClass[i]" v-for="(b,i) in banners" :key="b.targetId" @click="swiperPic(picClass[i])">
      <img :src="b.imageUrl">
      <span class="bg-r">独家</span>
    </li>
  </ul>
  <a href="javascript:;" class="prev btn" @click="previmg()">&lt;</a>
  <a href="javascript:;" class="next btn" @click="nextimg()">&gt;</a>

  <ul class="banner-btn">
    <li href="javascript:;" v-for="(b,i) in banners" :key="b.targetId"><span :class="i == index ? 'red':''"></span></li>
  </ul>
</div>
</template>

<script>
import tabVue from './tab.vue';
export default {
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  watch: {
    // 监听父组件是否传递过来轮播图数据
    banners: function(newVal,oldVal){
      // 如果传递过来了数据,就调用初始化方法
      newVal && this.initBanners();
    }
  },
  data() {
    return {
      picClass: [], // 轮播图片样式数组
      index: 0,     // 轮播图片当前下标
      timer: null,  // 轮播图定时器
    }
  },
  methods: {
    // 轮播图初始化
    initBanners() {
      // 根据banner数量生成图片样式数组
      for(let i = 0; i < this.banners.length;i++) {
        this.picClass.push(`p${i}`)
      }
      // 定时器开始自动轮播
      this.timer = setInterval(this.nextimg,3000);
    },
    // 点击左右两边的图片触发上一张或下一张函数
    swiperPic(classIndex) {
      // 点击class为p1的元素触发上一张照片的函数
      if(classIndex == 'p1') {
        this.previmg()
      }
      // 点击class为p3的元素触发下一张照片的函数
      if(classIndex == 'p3') {
        this.nextimg()
      }
    },
    // 上一张
    previmg(){
      this.picClass.push(this.picClass[0]);
      this.picClass.shift();
      this.index--;
      if (this.index < 0) {
        this.index = this.picClass.length - 1;
      }
    },
    // 下一张
    nextimg(){
      this.picClass.unshift(this.picClass[this.picClass.length - 1]);
      this.picClass.pop();
      this.index++;
      if (this.index > this.picClass.length - 1) {
        this.index = 0;
      }
    },
    // 鼠标移入暂停轮播
    swiperPause() {
      console.log(111);
      clearInterval(this.timer)
    },
    // 鼠标移除继续轮播
    swiperBegin() {
      let that = this
      setTimeout(function(){
        that.timer = that.nextimg()
      },3000)
    }
  }
}
</script>

<style lang="less">
.banner {
  position: relative;
  height: 300px;
  overflow: hidden;

  .banner-ul {
      position: relative;
      height: 240px;
      perspective: 1000px;
      margin-top: 10px;
      li {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;
          width: calc(100% - 600px);
          opacity: 0;
          transition: all 0.3s ease-out;
          cursor: pointer;

          span {
              position: absolute;
              right: 0;
              z-index: 5;
              bottom: 15px;
              padding: 2px 5px;
              color: #fff;
              &::after {
                  position: absolute;
                  top: 0;
                  left: -10px;
                  z-index: -1;
                  width: 23px;
                  height: 100%;
                  content: '';
                  border-radius: 50%;
              }
          }

          .bg-r {
              background: @red;
              &::after {
                  background: @red;
              }
          }

          .bg-b {
              background: rgb(74,121,204);
              &::after {
                  background: rgb(74,121,204);
              }
          }
      }

      .p0{
          transform:translate3d(-300px,11.5px,0) scale(0.9);
      }
      .p1{
          transform:translate3d(0px,11.5px,0) scale(0.9);
          transform-origin:0 50%;
          opacity: 0.8;
          z-index: 2;
      }
      .p2{
          transform:translate3d(300px,0,0) scale(1);
          z-index: 3;
          opacity: 1;
      }
      .p3{
          transform:translate3d(600px,11.5px,0) scale(0.9);
          transform-origin:100% 50%;
          opacity: 0.8;
          z-index: 2;
      }
      .p4{
          transform:translate3d(900px,11.5px,0) scale(0.9);
      }
      .p5{
          transform:translate3d(1200,11.5px,0) scale(0.9);
      }
      .p6{
          transform:translate3d(1500px,11.5px,0) scale(0.9);
      }
      .p7{
          transform:translate3d(1800px,11.5px,0) scale(0.9);
      }
      .p8{
          transform:translate3d(2100px,11.5px,0) scale(0.9);
      }
      .p9{
          transform:translate3d(2400px,11.5px,0) scale(0.9);
      }
  }
  
  &:hover .btn {
      display: block;
  }

  .btn{
      display: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 100px;
      line-height: 100px;
      font-size: 30px;
      color: rgb(164,163,162);
      text-align: center;
      cursor: pointer;
  }
  .next{
      right: 0;
  }

  .banner-btn{
      display: flex;
      justify-content: space-evenly;
      width: 250px;
      margin: 20px auto;

      li {
          display: inline-block;
          cursor: pointer;
      }
      span{
          display: block;
          width: 20px;
          height: 3px;
          background: #ccc;
      }
      .red{
          background: @red;
      }
  }
} 
</style>