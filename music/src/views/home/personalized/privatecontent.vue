<template>
<div>
    <div class="block-header">
        <h2>独家放送</h2>
        <span>更多></span>
    </div>

    <div class="block-list block-privatecontent">
        <div class="block-item" v-for="p in privatecontents" :key="p.id">
            <img class="mid-img" :src="p.picUrl + '?param=380y180'">
            <p>{{p.name}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        privatecontents: Array
    }
}
</script>

<style lang="less">
.block-privatecontent {
    .block-item {
        img,p {
            width: 100%;
        }
    }
}
</style>
