<template>
  <div class="block">
    <div class="block-header">
      <h2>最新音乐</h2>
      <span @click="changeTab()">更多></span>
    </div>

    <div class="block-list block-newsong">
      <ul class="ul-newsong">
        <li :class="[i == clickIndex ? 'deep-color' : '']" v-for="(n,i) in newsongs.slice(0,newsongs.length / 2)" :key="n.id" @dblclick="getSong(n.id,newsongs)" @click="changeColor(i)">
          <div>{{(i + 1 + '').padStart(2,'0')}}</div>
          <div class="newsong-img" @click="getSong(n.id,newsongs)">
            <img :src="n.album.picUrl + '?param=50y50'" alt />
            <i class="iconfont icon-play"></i>
          </div>
          <div>
            <p class="text-ellipsis">{{n.name}}</p>
            <p class="text-ellipsis" v-html="author(n.artists)"></p>
          </div>
        </li>
      </ul>

      <ul class="ul-newsong">
        <li :class="[i + 6 == clickIndex ? 'deep-color' : '']" v-for="(n,i) in newsongs.slice(newsongs.length / 2)" :key="n.id" @dblclick="getSong(n.id,newsongs)" @click="changeColor(i + 6)">
          <div>{{(i + 6 + '').padStart(2,'0')}}</div>
          <div class="newsong-img" @click="getSong(n.id,newsongs)">
            <img :src="n.album.picUrl + '?param=50y50'" alt />
            <i class="iconfont icon-play"></i>
          </div>
          <div>
            <p class="text-ellipsis">{{n.name}}</p>
            <p class="text-ellipsis" v-html="author(n.artists)"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsongs: Array,
  },
  data() {
    return {
      clickIndex: -1
    }
  },
  methods: {
    changeColor(i) {
      this.clickIndex = i
    },
    changeTab() {
      this.$emit('changeTab',5)
    }
  }
};
</script>

<style lang="less">
.block-newsong {
  .ul-newsong {
    margin: 10px 0 30px 0;
    width: 50%;
    border: @border;

    .newsong-img {
      position: relative;

      i {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 17px;
        color: #fff;
        border: @border;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4);

        &:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      }
    }

    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:nth-child(even) {
        background: rgb(245, 245, 247);
      }

      &:hover {
        background: rgb(235, 236, 237);
      }

      div:first-child {
        margin: 0 20px;
      }

      img {
        border: @border;
      }

      div:last-child {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        p:last-child {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
