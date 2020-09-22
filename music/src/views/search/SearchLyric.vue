<template>
  <loading v-if="$store.state.loading" />
  <div v-else>
    <ul class="search-song-title">
      <li style="width:5.5%"></li>
      <li style="width:5%">操作</li>
      <li style="width:40%">音乐标题</li>
      <li style="width:15%">歌手</li>
      <li style="width:28%">专辑</li>
      <li style="width:5%">时长</li>
    </ul>
    <ul class="song-list-ul">
      <li
        :class="[i == clickIndex ? 'deep-color' : '']"
        v-for="(s,i) in songs"
        :key="s.id"
        @dblclick="getSong(s.id)"
        @click="changeColor(i)"
      >
        <div class="song-li">
          <p class="index">
            <span>{{(i + 1 + '').padStart(2, '0')}}</span>
          </p>
          <p class="icon">
            <i class="iconfont icon-love"></i>
            <i class="iconfont icon-download"></i>
          </p>
          <p class="name text-ellipsis">
            <span v-html="highlight(s.name,keyword)"></span>
            <span class="alias" v-if="s.alias && s.alias.length">{{s.alias[0]}}</span>
          </p>
          <p class="artist text-ellipsis" v-html="author(s.artists)"></p>
          <p class="album text-ellipsis" v-html="highlight(s.album.name,keyword)"></p>
          <p class="time">
            <span>{{timeConvert(s.duration / 1000)}}</span>
          </p>
        </div>

        <div class="lyric-li">
          <div
            :style="{height: s.spread ? 'auto' : '100px'}"
            class="text-ellipsis lyric"
            v-html="highlight(s.lyrics.txt.substring(s.lyrics.txt.indexOf(keyword)),keyword)"
          ></div>

          <div class="lyric-opearte">
            <span @click="spreadLyric(s)">{{s.spread ? '收起歌词' : '展开歌词'}}</span>
            <span
              v-clipboard:copy="s.lyrics.txt"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >复制歌词</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
export default {
  components: {
    Loading,
  },
  props: {
    keyword: String,
  },
  data() {
    return {
      songs: null,
      clickIndex: -1,
    };
  },
  created() {
    this.showLoading(this.getData);
  },
  methods: {
    async getData() {
      // 获取歌词
      let res = await this.get(
        "/search?keywords=" + this.keyword + "&type=1006"
      ).then((r) => r.result);
      this.songs = res.songs;
      // 把搜索统计返给父级
      this.$emit(
        "searchPrompt",
        `搜索"${this.highlight("", this.keyword)}"，找到${res.songCount}首歌词`
      );
    },
    spreadLyric(s) {
      // 展开歌词
      s.spread = s.spread ? false : true;
      this.changeColor(s.id);
    },
    onCopy(e) {
      console.log("复制成功！");
    },
    onError(e) {
      console.log("复制失败！");
    },
    changeColor(i) {
      // 点击的下标
      this.clickIndex = i;
    },
  },
};
</script>

<style lang="less">
.song-list-ul {
  li {
    .song-li {
      display: flex;
      padding: 10px 0;
      background: @dark-background;

      &:hover {
        background: @lihover;

        .artist,
        .album {
          color: #333;
        }
      }

      .index {
        margin-left: 40px;
        margin-right: 15px;
        line-height: 16px;
        text-align: right;
        color: #999;
      }

      .icon {
        width: 5%;
        i {
          margin-right: 10px;
          color: #aaa;

          &:hover {
            color: #333;
          }
        }
      }

      .name {
        width: 40%;
        .alias {
          display: block;
          margin-top: 10px;
          color: #999;
        }
      }

      .artist {
        width: 15%;
        color: #666;
      }

      .album {
        width: 16%;
        color: #666;
        font-size: 12px;
      }

      .time {
        width: 5%;
        color: #999;
      }
    }

    .lyric-li {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      background: @light-background;
      .lyric {
        margin-left: 132px;
        font-size: 12px;
        line-height: 20px;
        color: #999;
        white-space: pre-wrap;
      }

      .lyric-opearte {
        margin-right: 85px;
        span {
          padding: 5px 10px;
          margin: 10px 10px 0 0;
          color: #000;
          border: @border;
          background: #fff;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background: @dark-background;
          }
        }
      }
    }
  }
  .deep-color {
    .lyric-li {
      background: rgb(227, 227, 229);
      .lyric {
        color: #000;
      }
    }
  }
}
</style>
