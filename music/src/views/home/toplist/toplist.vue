<template>
  <div>
    <loading v-if="toplistLoading" />
    <div v-else>
      <official :officialList="officialList" />
      <global :globalList="globalList" />
    </div>
  </div>
</template>

<script>
import Loading from "components/common/Loading";
import Official from "./offcial";
import Global from "./global";
export default {
  components: {
    Loading,
    Official,
    Global
  },
  data() {
    return {
      globalList: [], //全球榜
      officialList: [], //官方榜
      toplistLoading: true,
    };
  },
  created() {
    this.showLoading(this.getTopList)
  },
  methods: {
    async getTopList() {
      // 请求数据
      let res = await this.get("/toplist/detail");
      this.globalList = res.list.splice(4);
      await this.getOfficial(res);
      // 取消loading
      this.toplistLoading = false;
    },
    // 处理官方榜
    async getOfficial(r) {
      let arr = [];
      for (let i = 0; i < 4; i++) {
        arr.push(
          this.get("/playlist/detail?id=" + r.list[i].id).then(
            (r) => r.playlist
          )
        );
      }
      this.officialList = await Promise.all(arr);
      this.officialList.push(await this.getArtist(r));
    },
    // 处理歌手榜
    getArtist(res) {
      return this.get("/toplist/artist").then((r) => {
        r.list.name = "云音乐歌手榜";
        r.list.tracks = r.list.artists;
        r.list.coverImgUrl = res.artistToplist.coverUrl;
        return r.list;
      });
    },
  },
};
</script>

<style>
</style>
