<template>

</template>

<script>
export default {
  data() {
    return {
      globalList: [],       //全球榜
      officialList: [],     //官方榜
      colorArr: [           //榜头颜色数组
        'rgb(81,137,228)',
        'rgb(64,180,192)',
        'rgb(224,96,134)',
        'rgb(200,95,67)'
      ]
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    getTopList() {
      this.$axios.get('/toplist/detail').then(async r => {
        console.log(r);
        // 获取全球榜
        this.globalList = r.list.splice(4)
        // 获取官方榜前四个
        let [res1,res2,res3,res4] = await Promise.all(this.getOfficial(r))
        this.officialList = [res1,res2,res3,res4]
      })
    },
    getOfficial(r) {
      let arr = []
      for(let i = 0;i < 4;i++) {
        arr.push(this.$axios.get('/playlist/detail?id=' + r.list[i].id).then(r => r.playlist))
      }
      return arr
    }
  }
}
</script>

<style lang="less">

</style>
