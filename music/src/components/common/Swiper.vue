<template>
<div class="banner" @mouseenter="swiperPause()" @mouseleave="swiperBegin()">
  <ul class="banner-ul">
    <li :class="picClass[i]" v-for="(s,i) in swipers" :key="s.imageUrl" @click="swiperPic(picClass[i],s)">
      <img :src="s.imageUrl">
      <span :class="titleColor(s.typeTitle)">{{s.typeTitle}}</span>
    </li>
  </ul>
  <a href="javascript:;" class="prev btn" @click="previmg()">&lt;</a>
  <a href="javascript:;" class="next btn" @click="nextimg()">&gt;</a>

  <ul class="banner-btn">
    <li v-for="(s,i) in swipers" :key="s.imageUrl" @mouseenter="swiperBtn(i)">
      <span :class="i == index ? 'red':''"></span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    swipers: {
      type: Array,
      required:true,
      default: []
    }
  },
  data() {
    return {
      picClass: [], // 轮播图片样式数组
      index: 0,     // 轮播图片当前下标
      timer: null,  // 轮播图定时器
    }
  },
  created() {
    this.initSwipers()
  },
  methods: {
    titleColor(title) {  // 右侧title变色
      let color = 'bg-b'; 
      switch(title) {
        case '独家':
        case '新歌首发':
          color = 'bg-r'
      }
      return color
    },
    initSwipers() { // 轮播图初始化
      // 根据banner数量生成图片样式数组
      for(let i = 0; i < this.swipers.length;i++) {
        this.picClass.push(`p${i}`)
      }
      // 定时器开始自动轮播
      this.timer = setInterval(this.nextimg,3000);
    },
    swiperPic(classIndex,swiper) {  // 点击图片相应事件
    console.log(swiper);
      // 点击左边的图片触发上一张照片的函数
      if(classIndex == 'p1') {
        this.previmg()
      }
      // 点击右边的图片触发下一张照片的函数
      if(classIndex == 'p3') {
        this.nextimg()
      }
      // 点击中间的图片
      if(classIndex == 'p2') {
        switch(swiper.targetType) {
          case 1: { // 播放音乐
            this.getSong(swiper.targetId)
            break
          }
          case 10: {  // 跳转歌单
            this.$router.push({ path: "/album", query: { id: swiper.targetId } })
            break
          }
          case 3000: {  // 打开网页
            window.open(swiper.url,'_blank')
          }
        }
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
    // 鼠标移入下方btn切换图片
    swiperBtn(btnIndex) {
      // 创建原始样式数组,这样做的目的是保证每个图片对应的样式不变
      let arr = []
      for(let i = 0;i < this.picClass.length;i++) {
        arr.push('p' + i)
      }
      // 改一下下标
      this.index = btnIndex
      // 移动样式
      while(btnIndex) {
        arr.unshift(arr.pop())
        btnIndex--
      }
      // 把修改后的样式交给picClass,操作页面
      this.picClass = arr
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
      clearInterval(this.timer)
    },
    // 鼠标移除继续轮播
    swiperBegin() {
      this.timer = setInterval(this.nextimg,3000)
    }
  },
}
</script>

<style lang="less">
.banner {
  position: relative;
  height: 300px;
  margin: 0 20px;
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
          transform:translate3d(-300px,11px,0) scale(0.9);
      }
      .p1{
          transform:translate3d(0px,11px,0) scale(0.9);
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
          transform:translate3d(600px,11px,0) scale(0.9);
          transform-origin:100% 50%;
          opacity: 0.8;
          z-index: 2;
      }
      .p4{
          transform:translate3d(900px,11px,0) scale(0.9);
      }
      .p5{
          transform:translate3d(1200,11px,0) scale(0.9);
      }
      .p6{
          transform:translate3d(1500px,11px,0) scale(0.9);
      }
      .p7{
          transform:translate3d(1800px,11px,0) scale(0.9);
      }
      .p8{
          transform:translate3d(2100px,11px,0) scale(0.9);
      }
      .p9{
          transform:translate3d(2400px,11px,0) scale(0.9);
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
