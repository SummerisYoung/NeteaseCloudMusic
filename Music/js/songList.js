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
    let keyword = decodeURI(window.location.href).match(/[\u4E00-\u9FA5]+/)[0]
    let keyword_dom = `<span class="search-keyword">${keyword}</span>`
    search_prompt.innerHTML = `搜索"${keyword_dom}"，找到${res.songCount}首单曲>`
    //布局页面
    let str = ''
    let song_articles = ''
    let duration = 0
    res.songs.forEach((s,i) => {
        //先遍历取到全部作者
        song_articles = ''
        s.artists.forEach((b,i) => {
            song_articles += b.name
            if(i < s.artists.length - 1) {
                song_articles += ' / '
            }
        })
        //计算歌曲时长
        duration = (Math.floor(s.duration / 1000 / 60) + '').padStart(2,'0') + ':' + (Math.floor(s.duration / 1000 % 60) + '').padStart(2,'0')
        //再布置内容
        str += `
            <tr onclick="changeColor(this)">
                <td>${(i + 1 + '').padStart(2,'0')}</td>
                <td><i class="iconfont icon-favority"></i><i class="iconfont icon-download"></i></td>
                <td class="text-ellipsis">${s.name.indexOf(keyword) != -1 ? s.name.replace(keyword,keyword_dom) : s.name}${s.alias.length ? '<p style="padding:15px 0 0 0;color:#999">' + s.alias + '</p>' : ''}</td>
                <td class="text-ellipsis">${song_articles}</td>
                <td class="text-ellipsis">${s.album.name.indexOf(keyword) != -1 ? s.album.name.replace(keyword,keyword_dom) : s.album.name}</td>
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
        t.style.background = ''
    })
    //当前点击的变色
    that.style.background = 'rgb(227,227,229)';
    that.style.color = '#000'
}