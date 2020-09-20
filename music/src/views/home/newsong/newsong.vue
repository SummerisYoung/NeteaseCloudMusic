<template>
  <div id="newsong">
    <div class="newsong-top">
      <div>
        <p
          :class="[componentIndex == i ? 'default' : '']"
          v-for="(n,i) in ['新歌速递', '新碟上架']"
          :key="n"
          @click="changeComponent(i)"
        ><span>{{n}}</span></p>
      </div>
      <tab
        :items="items"
        :currentIndex="tabIndex"
        activeClass="active-grey"
        tabLiStyle="color:#666"
        @changeTab="changeTab"
      />
    </div>

    <component :is="newComponent" :active="items[tabIndex]"></component>
  </div>
</template>

<script>
import Tab from "components/common/Tab";
import Song from "./song";
import Album from "./album";

export default {
  components: {
    Tab,
    Song,
    Album,
  },
  data() {
    return {
      items: ["全部", "华语", "欧美", "韩国", "日本"],
      newTabComponent: ["Song", "Album"],
      componentIndex: 0,
      tabIndex: 0,
    };
  },
  computed: {
    newComponent() {
      return this.newTabComponent[this.componentIndex];
    },
  },
  methods: {
    changeComponent(index) {
      this.componentIndex = index;
    },
    changeTab(index) {
      this.tabIndex = index;
    },
  },
};
</script>

<style lang="less">
.newsong-top {
  div {
    display: flex;
    width: 200px;
    margin: 20px auto;
    p {
      width: 50%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      border: @border;

      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }

    .default {
      padding: 0;
      border: none;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    padding-right: 70%;
    margin: 0 20px;
    li {
      margin: 10px 30px 0 0;
      width: 32px;
      line-height: 30px;
      margin-left: 0;
      cursor: pointer;
    }
  }
}
</style>
