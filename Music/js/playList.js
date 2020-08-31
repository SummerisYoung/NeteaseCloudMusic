$(async function (){
    //获取歌单id
    let url = window.location.href
    //调用歌单详情接口
    let id = url.substring(url.indexOf('=') + 1)
    //获取结果
    let res = await GET('http://localhost:3000/playlist/detail?id=' + id + '&s=10').then(r => r.playlist)
    //页面dom
    let playlist = document.getElementById('playlist');
    //歌单上部分描述
    let playlist_top = playlist.children[0]
    //歌单图片
    playlist_top.children[0].src = res.coverImgUrl
    //歌单上部分右侧
    let playlist_content = playlist_top.children[1]
    //歌单上部分右侧的上部分
    let content_top = playlist_content.children[0]
    //标题
    content_top.children[0].children[1].innerText = res.name
    //歌曲数和播放数
    content_top.children[1].children[0].innerText = `歌曲数${res.trackCount}`
    content_top.children[1].children[1].innerText = `播放数${numConvert(res.playCount)}`
    //歌单上部分右侧的中部分
    let content_middle = playlist_content.children[1]
    //作者和创建时间
    content_middle.children[0].children[0].src = res.creator.avatarUrl
    content_middle.children[0].children[1].innerText = res.creator.nickname
    content_middle.children[0].children[2].innerText = stampToTime(res.createTime) + '创建'
    //收藏数和分享数
    content_middle.children[1].children[1].children[1].innerText = `收藏(${res.subscribedCount})`
    content_middle.children[1].children[2].children[1].innerText = `分享(${res.shareCount})`
    //歌单上部分右侧的下部分
    let content_bottom = playlist_content.children[2]
    //标签
    res.tags.forEach((t,i) => {
        content_bottom.children[0].innerHTML += `<span class="keyword-highlight">${t}</span>`
        if(i != res.tags.length - 1)
        content_bottom.children[0].innerHTML += '/'
    });
    //描述
    let description = content_bottom.children[1].children[0]
    description.innerText = res.description
    //展开收起图标
    let icon = description.nextElementSibling
    if(description.offsetHeight > 50) {
        icon.style.display = 'block'
        description.style.height = '50px'
        description.classList.add('text-ellipsis') 
    }
    icon.onclick = () => {
        if(description.offsetHeight == 50){
            description.style.height = 'auto'
            icon.style.transform = 'rotate(-90deg)'
        } 
        else{
            description.style.height = '50px'
            icon.style.transform = 'rotate(90deg)'
        }
            
    }
    //歌单中的全部歌曲,用res中的全部trackIds请求一次song/detail 接口获取所有歌曲的详情
    let songsArr = []
    res.trackIds.forEach(t => {
        songsArr.push(t.id)
    })
    let playlist_songs = await GET('http://localhost:3000/song/detail?ids=' + songsArr.join(','))
    songsLayout(playlist_songs)
})

//布局页面
function songsLayout(res) {
    console.log(res);
    let tbody = document.getElementById('tbody')
    let str = ''
    let duration = 0
    res.songs.forEach((s,i) => {
        //计算歌曲时长
        duration = timeConvert(s.dt / 1000)
        //再布置内容
        str += `
            <tr onclick="changeColor(this)" ondblclick="getSongUrl(this)" data-id="${s.id}">
                <td>${(i + 1 + '').padStart(2,'0')}</td>
                <td><i class="iconfont icon-love"></i><i class="iconfont icon-download"></i></td>
                <td class="text-ellipsis">${s.name}${s.alia.length ? '<p style="padding:15px 0 0 0;color:#999">' + s.alia + '</p>' : ''}</td>
                <td class="text-ellipsis">${author(s.ar)}</td>
                <td class="text-ellipsis">${s.al.name}</td>
                <td>${duration}</td>
            </tr>
        `
    });
    tbody.innerHTML = str
    $('#playlist').niceScroll({
        cursorcolor:"#ddd",     //滚动条的颜色值
        cursorwidth:8,         //滚动条的宽度值
        autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
    })
}