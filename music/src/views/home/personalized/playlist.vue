<template>
<div class="block">
    <div class="block-header">
        <h2>推荐歌单</h2>
        <span>更多></span>
    </div>
    
    <div class="block-list block-playlist">
        <play-list-ul :playlists="playlists"/>
    </div>
</div>
</template>

<script>
import PlayListUl from "../../../components/common/PlayListUl"
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
.block-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: @border;

    h2 {
        font-size: 20px;
        font-weight: 500;
    }

    span {
        font-size: 12px;
        font-weight: 300;
    }
}

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