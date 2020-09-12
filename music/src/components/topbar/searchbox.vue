<template>
  <div class="search">
    <input
      id="search-ipt"
      type="text"
      placeholder="搜索音乐，视频，歌词，电台"
      @click.stop="openSearch()"
      @focus="getSearchHot()"
      @input="getInputChange()"
      v-model="iptValue"
      onkeydown="gosearchList()"
    />
    <i class="iconfont icon-search" onclick="gosearchList()"></i>
    <div class="search-res-box" v-if="isSearch" ref="search">
      <el-scrollbar class="search-res">
        <div v-if="iptValue == ''">
          <h3>热搜榜</h3>
          <ul class="search-ul">
            <li v-for="(h,i) in hotRes" :key="i">
              <span>{{++i}}</span>
              <div class="search-li-text">
                <p>
                  <span>{{h.searchWord}}</span>
                  <span>{{h.score}}</span>
                  <img :src="h.iconUrl == null ? '' : h.iconUrl" />
                </p>
                <p>{{h.content}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <p style="padding:5px 10px" class="suggest-li" onclick="gosearchList()" 
          v-html="'搜' + highlight('',iptValue) + '相关的结果'">></p>
          
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSearch: false,
      hotRes: [],
      searchRes: [],
      iptValue: ''
    };
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (this.$refs.search && !this.$refs.search.contains(e.target))
        this.isSearch = false;
    });
  },
  methods: {
    openSearch() {
      this.isSearch = true;
    },
    getSearchHot() {
      this.$axios.get("/search/hot/detail").then((r) => {
        this.hotRes = r.data;
      });
    },
    getInputChange() {
      this.$axios.get('/search/suggest?keywords=' + this.iptValue).then(r => {
        this.searchRes = r.result
      })
    }
  },
};
</script>

<style lang="less">
.search {
  position: relative;
  display: inline-block;
  input {
    margin-left: 10px;
    width: 280px;
    height: 25px;
    border-radius: 20px;
    text-indent: 10px;
    color: #fff;
    background: rgb(168, 40, 40);
    border: none;
    outline: none;
  }

  input::placeholder {
    color: @red-grey;
  }

  input:focus + i {
    color: rgb(220, 170, 170);
  }

  i {
    position: absolute;
    top: 1px;
    right: 5px;
    border: none;
    font-size: 16px;
  }
  .search-res-box {
    &::before {
      content: "";
      position: absolute;
      top: 30px;
      left: 30px;
      border: 8px solid;
      border-color: transparent transparent #fff transparent;
    }
  }

  .search-res {
    position: absolute;
    top: 44px;
    left: 10px;
    width: 530px;
    height: 530px;
    background: #fff;
    color: #000;
    border: @border;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    z-index: 5;

    .suggest-order {
      font-size: 12px;
      background: rgb(245, 245, 247);
      cursor: pointer;
      i {
        position: relative;
        right: 0;
        color: #666;
      }
    }
    .suggest-li {
      padding: 5px 30px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background: @lihover;
      }
      span {
        font-size: 12px;
      }
    }

    h3 {
      padding: 0 25px;
      line-height: 50px;
      color: #666;
    }

    .search-ul li {
      display: flex;
      align-items: center;
      padding: 10px 0;
      cursor: pointer;

      &:hover {
        background: @lihover;
      }

      .search-li-text {
        margin-left: 25px;
        p:first-child {
          span:nth-child(1) {
            font-size: 12px;
            font-weight: 600;
          }

          span:nth-child(2) {
            margin: 0 15px;
            vertical-align: -3px;
            color: #ccc;
            font-size: 12px;
          }

          img {
            height: 15px;
            vertical-align: -3px;
          }
        }

        p:last-child {
          font-size: 12px;
          color: #aaa;
        }
      }

      &:nth-child(-n + 3) > span {
        margin-left: 25px;
        color: red;
      }

      &:nth-child(n + 4) > span {
        margin-left: 25px;
        color: #aaa;
      }

      &:nth-child(n + 4) {
        .search-li-text {
          p:first-child {
            span:nth-child(1) {
              font-weight: 400;
            }
          }
        }
      }
    }
  }
}
</style>
