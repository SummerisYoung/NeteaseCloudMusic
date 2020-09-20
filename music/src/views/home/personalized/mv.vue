<template>
  <div>
    <div class="block-header">
      <h2>推荐MV</h2>
      <span>更多></span>
    </div>

    <div class="block-list block-mv">
      <div class="block-item" v-for="m in mvs" :key="m.id">
        <div class="mv-img">
          <div class="copywriter">{{m.copywriter}}</div>
          <img class="mid-img" :src="m.picUrl + '?param=300y180'" />
          <p class="right-top" v-if="m.playCount">
            <i class="iconfont icon-video"></i>
            <span>{{numConvert(m.playCount)}}</span>
          </p>
        </div>
        <p>{{m.name}}</p>
        <p class="album-name text-ellipsis" v-html="author(m.artists)"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvs: Array,
  }
};
</script>

<style lang="less">
.block-mv {
  .block-item {
    
    width: calc(25% - 10px);
    .mv-img {
      margin-top: 10px;
      position: relative;
      overflow: hidden;
      &:hover {
          .copywriter {
            top: 0;
          }
          .right-top {
            opacity: 0;
          }
        }

        .copywriter {
          position: absolute;
          top: -60px;
          display: -webkit-box;
          width: 100%;
          padding: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
          transition: 0.3s 0.5s;
        }

        .right-top {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 50%;
          color: #fff;
          padding: 5px 10px;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(0, 0, 0, 0.3)
          );
          text-align: right;
          transition: 0.1s 0.5s;
          i {
            margin-right: 5px;
          }
        }
    }
    img,
    p {
      margin: 0;
      width: 100%;
    }
  }
}
</style>
