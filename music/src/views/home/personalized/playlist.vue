<template>
<div>
    <div class="block-header">
        <h2>推荐歌单</h2>
        <span>更多></span>
    </div>
    
    <play-list-ul :playlists="playlists"/>
</div>
</template>

<script>
import PlayListUl from "components/common/PlayListUl"
export default {
    components: {
        PlayListUl
    },
    props: {
        playlists: Array
    }
}
</script>

<style lang="less">
.block-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .block-item {
        margin-bottom: 30px;
        img {
            margin: 10px 0;
            border: @border;
            cursor: pointer;
        }

        p {
            width: 180px;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
