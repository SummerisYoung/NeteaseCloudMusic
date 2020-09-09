<template>
  <div>
    <banner :banners="banners"/>
  </div>
</template>

<script>
import Banner from '../../components/common/banner'
export default {
  components: {
    Banner
  },
  data() {
    return {
      banners: []
    }
  },
  created() {
    this.$axios.get('/banner?type=0').then(res => {
      this.banners = res.banners
    })
  }
}
</script>

<style lang="less">

</style>