<template>
  <cover-list :covers="similar"/>
</template>

<script>
import CoverList from 'components/common/CoverList';
export default {
  components: {
    CoverList
  },
  props: {
    similar: Array
  }
}
</script>

<style lang="less">

</style>
