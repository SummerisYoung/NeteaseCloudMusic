<template>
<div>
  <official :officialList="officialList"/>
  <global :globalList="globalList" />
</div>
</template>

<script>
import Official from './offcial'
import Global from './global'
export default {
  components: {
    Official,Global
  },
  data() {
    return {
      globalList: [],      //全球榜
      officialList: []     //官方榜
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    getTopList() {
      this.$axios.get('/toplist/detail').then(r => {
        // 获取全球榜
        this.globalList = r.list.splice(4)
        // 处理官方榜
        this.getOfficial(r)
      })
    },
    // 处理官方榜
    async getOfficial(r) {
      let arr = []
      for(let i = 0;i < 4;i++) {
        arr.push(this.$axios.get('/playlist/detail?id=' + r.list[i].id).then(r => r.playlist))
      }
      this.officialList = await Promise.all(arr)
      this.officialList.push(await this.getArtist(r))
      console.log(this.officialList);
    },
    // 处理歌手榜
    getArtist(res) {
      return this.$axios.get('/toplist/artist').then(r => {
        r.list.name = "云音乐歌手榜"
        r.list.tracks = r.list.artists
        r.list.coverImgUrl = res.artistToplist.coverUrl
        return r.list
      })
    }
  }
}
</script>

<style>

</style>
