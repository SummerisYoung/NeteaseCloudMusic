<template>
  <div class="block">
    <div class="block-header">
      <h2>最新音乐</h2>
      <span>更多></span>
    </div>

    <div class="block-list block-newsong">
      <ul class="ul-newsong">
        <li v-for="(n,i) in newsongs.slice(0,newsongs.length / 2)" :key="n.id">
          <div>{{(i + 1 + '').padStart(2,'0')}}</div>
          <img class="tiny-img" :src="n.picUrl  + '?param=50y50'" />
          <div>
            <p class="text-ellipsis">{{n.name}}</p>
            <p class="text-ellipsis" v-html="author(n.song.artists)"></p>
          </div>
        </li>
      </ul>

      <ul class="ul-newsong">
        <li v-for="(n,i) in newsongs.slice(newsongs.length / 2)" :key="n.id">
          <div>{{(i + 1 + '').padStart(2,'0')}}</div>
          <img class="tiny-img" :src="n.picUrl  + '?param=50y50'" />
          <div>
            <p class="text-ellipsis">{{n.name}}</p>
            <p class="text-ellipsis" v-html="author(n.song.artists)"></p>
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
  }
};
</script>

<style lang="less">
.block-newsong {
  .ul-newsong {
    margin: 10px 0 30px 0;
    width: 50%;
    border: @border;

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
