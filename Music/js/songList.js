$(function () {
    //获取value和调用搜索接口
    let url = window.location.href
    let value = decodeURI(url.substring(url.indexOf('?') + 1))
    searchValue(value);
})

//搜索
async function searchValue(value) {
    let res = await GET('/search?' + value).then(r => r.result)
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
        duration = timeConvert(s.duration / 1000)
        //再布置内容
        str += `
            <tr onclick="changeColor(this)" ondblclick="getSongUrl(this)" data-id="${s.id}">
                <td>${(i + 1 + '').padStart(2,'0')}</td>
                <td><i class="iconfont icon-love"></i><i class="iconfont icon-download"></i></td>
                <td class="text-ellipsis">${highlight(s.name,keyword)}${s.alias.length ? '<p style="padding:15px 0 0 0;color:#999">' + s.alias + '</p>' : ''}</td>
                <td class="text-ellipsis">${highlight(author(s.artists),keyword)}</td>
                <td class="text-ellipsis">${highlight(s.album.name,keyword)}</td>
                <td>${duration}</td>
            </tr>
        `
    });
    tbody.innerHTML = str
    nicescroll(document.getElementById('songList'))
}