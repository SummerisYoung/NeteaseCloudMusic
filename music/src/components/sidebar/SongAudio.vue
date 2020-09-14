<template>
  <audio ref="audio" :src="$store.state.songUrl.url"></audio>
</template>

<script>
export default {
  watch: {
    '$store.state.songUrl'() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  },
  methods: {
    playSong() {
      
    }
  }
}
</script>

<style>

</style>
