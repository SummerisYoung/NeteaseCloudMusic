<template>
  <div>
    <ul class="search-song-title">
      <li style="width:5.5%"></li>
      <li style="width:5%">操作</li>
      <li style="width:40%">音乐标题</li>
      <li style="width:15%">歌手</li>
      <li style="width:28%">专辑</li>
      <li style="width:5%">时长</li>
    </ul>
    <song-list-ul :songs="songs"></song-list-ul>
  </div>
</template>

<script>
import SongListUl from 'components/common/SongListUl'
export default {
  components: {
    SongListUl
  },
  props: {
    keyword: String
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this.$axios.get('/search?keywords=' + this.keyword + '&type=1&limit=100').then(r => {
      this.songs = r.result.songs
      this.$emit('searchPrompt',`搜索"${this.highlight('',this.keyword)}"，${r.result.songCount}首单曲`)
    })
  }
}
</script>

<style lang="less">
.search-song-title {
  display: flex;
  border-top: @border;
  border-bottom: @border;
  font-size: 12px;

  li {
    line-height: 30px;
    text-indent: 1em;
    border-right: @border;

    &:last-child {
      border: none;
    }
  }
}
</style>
