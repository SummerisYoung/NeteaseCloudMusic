function getSongDetail(song) {
    return async function() {
        let lyric = await POST('http://localhost:3000/lyric',{id:song.id}).then(r => r.lrc.lyric)
        //歌词处理
        makeLyric(lyric)
        //页面标签
        let detail = document.getElementById('song-detail')
        //背景图标签
        let bgimg = document.getElementsByClassName('bg-img')[0]
        //上层标签
        let top = document.getElementsByClassName('song-top')[0],
            left = top.children[0],
            right = top.children[1]
        //页面宽高
        detail.style.width = '100vw'
        detail.style.height = '100%'
        //上层背景图
        bgimg.style.cssText = `background:url(${song.al.picUrl});`
        //音乐封面
        left.children[0].children[0].src = song.al.picUrl
        //歌曲名
        right.children[0].innerText = song.name
        //专辑
        right.children[1].children[0].children[0].innerText = song.al.name
        //歌手
        right.children[1].children[1].children[0].innerText = author(song.ar)
        //歌词
    }
}

function makeLyric(lyric) {
    //用一个数组保存歌词时间
    let lyricTime = []
    //布局页面
    let str = ''
    let time = ''
    let lrc = ''
    lyric.split('\n').forEach((l,i) => {
        lrc = l.replace(/\[(\d\d:\d\d)\.\d{3}\]/g, function(a,b) {
            time = b
            return ""
        })
        lyricTime.push(time)
        str += `<li data-time="${time}">${lrc}</li>`
    });
    //填入页面
    let dom = document.getElementsByClassName('lyric')[0]
    dom.innerHTML = str
}