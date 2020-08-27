$(function () {
    //获取value和调用搜索接口
    let url = window.location.href
    let value = decodeURI(url.substring(url.indexOf('?') + 1))
    searchValue(value);
})

//搜索
async function searchValue(value) {
    let res = await GET('http://localhost:3000/search?' + value).then(r => r.result)
    let tbody = document.getElementById('tbody')
    let search_prompt = document.getElementsByClassName('search-prompt')[0]
    //取到关键词和歌曲总数
    let keyword = value.substring(value.indexOf('=') + 1,value.indexOf('&'))
    search_prompt.innerHTML = `搜索"${highlight('',keyword)}"，找到${res.songCount}首单曲>`
    //布局页面
    let str = ''
    let duration = 0
    res.songs.forEach((s,i) => {
        //计算歌曲时长
        duration = (Math.floor(s.duration / 1000 / 60) + '').padStart(2,'0') + ':' + (Math.floor(s.duration / 1000 % 60) + '').padStart(2,'0')
        //再布置内容
        str += `
            <tr onclick="changeColor(this)" ondblclick="getSongUrl(this)" data-id="${s.id}">
                <td>${(i + 1 + '').padStart(2,'0')}</td>
                <td><i class="iconfont icon-love"></i><i class="iconfont icon-download"></i></td>
                <td class="text-ellipsis">${highlight(s.name,keyword)}${s.alias.length ? '<p style="padding:15px 0 0 0;color:#999">' + s.alias + '</p>' : ''}</td>
                <td class="text-ellipsis">${highlight(author(s.artists),keyword)}</td>
                <td class="text-ellipsis">${highlight(s.album.name,keyword)}</td>
                <td>${duration}</td>
                <td>热度</td>
            </tr>
        `
    });
    tbody.innerHTML = str
    $('#songList').niceScroll({
        cursorcolor:"#ddd",     //滚动条的颜色值
        cursorwidth:8,         //滚动条的宽度值
        autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
    })
}

//点击歌曲,这一行变色
function changeColor(that) {
    //先把之前点击的每一项的颜色去掉
    let tbody = [...document.getElementById('tbody').children]
    tbody.forEach(t => {
        t.className = ''
    })
    //当前点击的变色
    that.className = 'deep-color'
}