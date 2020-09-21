<template>
  <div>
    <user-top :userInfo="userInfo" v-if="userInfo" />
    <div class="user-bottom">
      <dj-radio :djRadios="djRadios" />
      <p class="user-item">歌单({{covers.length}})</p>
      <cover-list :covers="covers" :leftBottom="false"/>
    </div>
  </div>
</template>

<script>
import CoverList from "components/common/CoverList";
import UserTop from "./UserTop";
import DjRadio from "./DjRadio";
export default {
  components: {
    CoverList,
    UserTop,
    DjRadio,
  },
  data() {
    return {
      userInfo: null,
      djRadios: [],
      covers: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.userInfo = await this.get(
        "/user/detail?uid=" + this.$route.query.id
      );
      this.djRadios = await this.get(
        "/user/audio?uid=" + this.$route.query.id
      ).then((r) => r.djRadios);
      this.covers = await this.get(
        "/user/playlist?uid=" + this.$route.query.id
      ).then((r) => r.playlist);
    },
  },
};
</script>

<style lang="less">
.user-bottom {
  .user-item {
    padding: 10px 40px;
    border-top: @border;
    border-bottom: @border;
  }
}
</style>
