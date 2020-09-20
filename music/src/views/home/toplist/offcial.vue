<template>
  <div class="offcial">
    <h2>官方榜</h2>
    <ul class="offcial-ul">
      <li v-for="(o,i) in officialList" :key="o.id">
        <div class="offcial-ultop" :style="{backgroundColor: colorArr[i]}">
          <div>
            <h3>{{o.name.substring(3,4) == '创' ? '原' : o.name.substring(3,4)}}</h3>
            <div>
              <h4>{{o.name.substring(4) == '歌曲榜' ? '创榜' : o.name.substring(4)}}</h4>
              <p>{{stampToTime(o.updateTime).substring(5,9)}}更新</p>
            </div>
          </div>
          <div>
            <i class="iconfont icon-play"></i>
          </div>
        </div>
        <ul class="offcial-item">
          <li :class="[i == clickItem && j == clickIndex ? 'deep-color' : '']" v-for="(t,j) in o.tracks.slice(0,8)" :key="t.id" @dblclick="getSong(t.id)" @click="changeColor(i,j)">
            <div class="text-ellipsis">
              <span>{{j + 1}}</span>
              <span>-</span>
              <span>{{t.name}}</span>
            </div>
            <span v-if="t.ar" class="artist text-ellipsis" v-html="author(t.ar)"></span>
          </li>
        </ul>
        <p class="offcial-more">查看全部></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    officialList: Array
  },
  data() {
    return {
      colorArr: [
        //榜头颜色数组
        "rgb(81,137,228)",
        "rgb(64,180,192)",
        "rgb(224,96,134)",
        "rgb(200,95,67)",
        "rgb(145,67,200)"
      ],
      clickItem: -1,
      clickIndex: -1
    };
  },
  methods: {
    changeColor(i,j) {
      this.clickItem = i
      this.clickIndex = j
    }
  }
};
</script>

<style lang="less">
.offcial {
  h2 {
    padding: 20px 0 10px 0;
    font-size: 20px;
    font-weight: 500;
    border-bottom: @border;
  }

  .offcial-ul {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    &::after {
      content: "";
      flex: auto;
    }

    li {
      width: 30%;
      margin: 20px;

      .offcial-ultop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        width: 100%;
        height: 100px;
        color: #eee;
        cursor: pointer;
        div:first-child {
          display: flex;
          align-items: center;
          h3 {
            margin-left: 10px;
            transform: skew(-10deg);
            font-size: 50px;
            font-weight: 900;
          }
          h4 {
            font-size: 30px;
            font-weight: 900;
            font-style: italic;
          }
        }
        i {
          display: inline-block;
          width: 50px;
          height: 50px;
          line-height: 50px;
          border: @border;
          border-radius: 50%;
          text-align: center;
          font-size: 30px;
          cursor: pointer;
        }
      }
      .offcial-item {
        li {
          display: flex;
          justify-content: space-between;
          line-height: 40px;
          width: 100%;
          padding: 0 10px;
          margin: 0;
          user-select: none;
          div {
            display: flex;
            width: 70%;
            span:first-child {
              font-size: 18px;
            }
            span:nth-child(2) {
              margin: 0 10px;
            }
          }
          .artist {
            width: 30%;
            color: #999;
            text-align: right;
            cursor: pointer;
          }

          &:nth-child(odd) {
            background: @dark-background;
          }

          &:nth-child(even) {
            background: @light-background;
          }

          &:nth-child(-n + 3) {
            div span:first-child {
              color: @red;
            }
          }

          &:hover {
            background: @lihover;
          }
        }
      }
      .offcial-more {
        padding: 10px;
        text-align: right;
        color: #999;
        background: @dark-background;
      }
    }
  }
}
</style>
