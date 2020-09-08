// 请求音乐url
async function getSongUrl(that) {
    // 根据点击的元素父级有无parentId判断是列表还是单曲
    // 列表
    if(that.parentNode.dataset.parentId) {
        // 全局记录一下当前正在播放的歌曲的歌单或专辑id
        window.parentId = that.parentNode.dataset.parentId
    }
    // 把歌曲详情加载到页面
    $('#song-detail').load('public/songDetail.html')
    // 获取audio标签
    let audio = document.getElementsByTagName('audio')[0]
    // 左下角设置
    let footer_song = document.getElementsByClassName('footer-song')[0]
    // 音乐界面初始化
    initSong()
    // 请求歌曲url
    let res = await POST('/song/url', {id:that.dataset.id}).then(r => r.data[0])
    // 请求歌曲详细信息
    let det = await POST('/song/detail',{ids:that.dataset.id})
    let song = det.songs[0]
    // 音乐url
    audio.src = res.url
    // 给audio绑定一下正在播放的音乐id
    audio.dataset.id = that.dataset.id
    // 左下角图片url
    footer_song.children[0].children[0].src = song.al.picUrl + '?param=50y50'
    // 左下角歌曲名和歌手
    footer_song.children[1].innerHTML = `
        <p class="text-ellipsis">${song.name}${song.alia.length ? '<span style="color:#999"> (' + song.alia + ') <span>' : ''}</p>
        <p class="text-ellipsis">${author(song.ar)}</p>
    `
    footer_song.style.opacity = '1'
    // 左下角音乐图片点击事件
    footer_song.children[0].onclick = getSongDetail(song)
    // 播放
    audio.play()
    // 除去loading效果
    document.getElementsByClassName('dot')[0].classList.remove('dot-loading')
    // 如果正在播放的是列表
    if(window.parentId) {
        // 播放列表为空或播放的歌单变了
        if(document.getElementById('list-ul') == null || window.parentId != document.getElementById('list-ul').dataset.parentId) {
            // 初始化
            myList(audio)
        }
        // 同步播放样式
        syncVisible(audio)
    }
}

$(function () {
    // 获取滚动条
    let music_bar = document.getElementsByClassName('music-bar')[0]
    // 获取音频标签
    let audio = document.getElementsByTagName('audio')[0]
    // 获取播放暂停图标
    let pause_play = document.querySelector('#footer .footer-left i:nth-child(2)')
    // 获取上一个、下一个标签
    let prev = document.getElementsByClassName('icon-previous')[0]
    let next = document.getElementsByClassName('icon-next')[0]
    // 获取音量条
    let volumn = document.getElementsByClassName('volume')[0]
    // 播放列表icon标签
    let icon_playlist = document.getElementsByClassName('icon-playlist')[0]
    // 播放列表标签
    let list = document.getElementsByClassName('list')[0]
    // footer标签
    let footer = document.getElementById('footer')

    // 点击播放暂停图标
    pause_play.onclick = () => {
        if(pause_play.classList.contains('icon-pause')) {
            audio.pause()
        }else{
            audio.play()
        }
        // 正在播放,点击暂停
        pause_play.classList.toggle('icon-pause')
        pause_play.classList.toggle('icon-play')
        let visible = document.getElementsByClassName('visible')[0]
        // 如果播放列表也开着,那么它里面播放的音乐也得同步暂停
        if(visible) {
            visible.children[0].classList.toggle('icon-play')
            visible.children[0].classList.toggle('icon-pause')
        }
    }

    // 点击了上一个
    prev.onclick = prevBtn

    // 点击了下一个
    next.onclick = nextBtn

    // 更新播放条
    audio.ontimeupdate = syncMusicBar(music_bar)
    
    // 拖动播放条
    music_bar.children[1].onmousedown = dragBar(audio)

    // 拖动音量条
    volumn.children[1].onmousedown = dragVolumn(audio)

    // 显示播放列表
    icon_playlist.onclick = function(){
        list.style.display = 'flex'
        // 获取歌曲li的高度
        let liHeight = list.children[2].children[0].children[0].offsetHeight
        // 调整滚动条高度和位置
        if($(list.children[2]).getNiceScroll().length) {
            $(list.children[2]).getNiceScroll().resize()
            $(list.children[2]).getNiceScroll(0).doScrollTop(window.playing * liHeight,0)
        }
        // 同步播放样式
        if(document.getElementById('list-ul')) {
            syncVisible(audio)
        }
        // 点击外面关闭播放列表
        document.onclick = (e) => {
            // 如果点击的冒泡路径里,既没有播放列表标签,又没有footer标签
            // 说明点击的是列表外面,可以关闭列表
            if(e.path.indexOf(list) == -1 && e.path.indexOf(footer) == -1) {
                list.style.display = 'none'
                document.onclick = null
            }
        }
    }
})

// 音乐界面初始化操作
function initSong() {
    // 音乐播放时间归0
    document.getElementsByTagName('audio')[0].currentTime = 0
    // 播放时间归0
    document.querySelectorAll('#footer .footer-middle span')[0].innerText = '00:00'
    // 进度条进度归0
    document.getElementsByClassName('passed')[0].style.width = 0
    // 进度条上的圈归位
    document.getElementsByClassName('progress')[0].style.left = "-7px"
    // 进度条上的圈里面的点加上loading效果
    document.getElementsByClassName('dot')[0].classList.add('dot-loading')
    // 播放暂停标签
    let play_pause = document.querySelector('#footer .footer-left i:nth-child(2)')
    play_pause.classList.remove('icon-play')
    play_pause.classList.add('icon-pause')
}

// 更新播放条
function syncMusicBar(music_bar) {
    return function () {
        if(this.duration >= 0) {
            // 获取当前的播放时刻
            let current = Math.trunc(this.currentTime)
            // 获取总时间
            let duration = Math.trunc(this.duration)
            // 获取滚动条
            let progress = music_bar.children[1]
            // 获取滚动条左右两个时间标签
            let spans = document.querySelectorAll('#footer .footer-middle span')
            // 设置时间
            spans[0].innerText = timeConvert(current)
            spans[1].innerText = timeConvert(duration)
            // 计算并设置当前进度
            let x = current / duration * music_bar.offsetWidth
            music_bar.children[0].style.width = x + 'px'
            progress.style.left = x - progress.offsetWidth / 2 + 'px';
        }
        // 歌曲播放完毕调用点击下一个函数
        if(this.currentTime == this.duration) nextBtn()
    }
}

// 拖动播放条
function dragBar(audio) {
    return function () {
        // 获取鼠标摁下时的坐标
        let x1 = window.event.pageX
        // 获取鼠标摁下时进度条的位置
        let left = this.offsetLeft
        // 关闭音乐进度条的同步
        audio.ontimeupdate = null
        // 设置初始进度所占比例
        let proportion = 0
        document.onmousemove = (e) => {
            let x2 = e.pageX - x1 + left
            // 限定边界
            x2 = Math.max(x2,0)
            x2 = Math.min(x2,this.parentElement.offsetWidth - this.offsetWidth / 2)

            this.style.left = x2 + 'px'
            this.parentElement.children[0].style.width = x2 + 'px'
            // 保存当前拖动的进度在总进度里的比例
            proportion = x2 / this.parentElement.offsetWidth
        }

        // 鼠标抬起
        document.onmouseup = () => {
            // 开启进度条
            audio.ontimeupdate = syncMusicBar(this.parentElement)
            // 进度条进度变化
            audio.currentTime = proportion * audio.duration

            // 事件解绑
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}

// 拖动音量条
function dragVolumn(audio) {
    return function() {
        // 获取鼠标摁下时的坐标
        let x1 = window.event.pageX
        // 获取鼠标摁下时进度条的位置
        let left = this.offsetLeft

        // 鼠标拖动
        document.onmousemove = (e) => {
            let x2 = e.pageX - x1 + left
            // 限定边界
            x2 = Math.max(x2, 0)
            x2 = Math.min(x2, this.parentElement.offsetWidth - this.offsetWidth / 2)
            
            // 更改音量条位置
            this.style.left = x2 + 'px'
            this.parentElement.children[0].style.width = x2 + 'px'

            // 计算音量
            audio.volume = x2 / (this.parentElement.offsetWidth - this.offsetWidth / 2)
        }

        // 鼠标抬起
        document.onmouseup = () => {
            // 事件解绑
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    
}

// 播放列表处理
function myList(audio) {
    // 获取播放列表
    let list_content = document.getElementsByClassName('list-content')[0]
    // 获取播放列表歌曲
    let songs = JSON.parse(sessionStorage.getItem('list'))[window.parentId]
    // 播放列表布局
    let str = `<ul class="li-hover" id="list-ul" data-parent-id=${window.parentId}>`
    // 改变总歌曲数
    document.getElementById('list-count').innerText = songs.length
    songs.forEach((l,i) => {
        if(l.id == audio.dataset.id) {
            // 全局变量记录一下正在播放的音乐在音乐列表里的下标
            window.playing = i
        }
        str += `
        <li onclick="changeColor(this)" ondblclick="getSongUrl(this)" data-id="${l.id}">
            <p ${l.id == audio.dataset.id ? 'class="visible"' : ''}><i class="iconfont icon-play"></i></p>
            <p class="text-ellipsis">${l.name} ${l.alia.length ? `<span style="color:#999">${l.alia}</span>` : ''}</p>
            <p class="text-ellipsis">${author(l.ar)}</p>
            <p><i class="iconfont icon-link"></i></p>
            <p>${timeConvert(l.dt / 1000)}</p>
        </li>
        `
    });
    str += '</ul>'
    list_content.innerHTML = str
    nicescroll(list_content)
}

// 播放列表的播放样式要能和音乐列表同步
function syncVisible(audio) {
    // 除去上一个听的歌的播放样式
    document.getElementsByClassName('visible')[0].classList.remove('visible')
    // 获取播放列表的所有歌曲
    let songs = [...document.getElementById('list-ul').children]
    // 遍历查找点击的是哪首歌
    songs.forEach((s,i) => {
        // 找到就设置播放样式
        if(s.dataset.id == audio.dataset.id) {
            s.children[0].classList.add('visible')
            // 全局变量记录一下正在播放的音乐在音乐列表里的下标
            window.playing = i
        }
    })
}

// 点击了上一个
function prevBtn() {
    // 看看播放列表是否有歌曲
    let list_ul = document.getElementById('list-ul')
    if(list_ul) {
        // 获取播放列表里的所有音乐
        let songs = [...document.getElementById('list-ul').children]
        // 先改一下下标
        window.playing--
        // 判断边界
        window.playing = window.playing < 0 ? songs.length - 1 : window.playing
        // 换歌
        getSongUrl(songs[window.playing])
    }
}

// 点击了下一个
function nextBtn() {
    // 看看播放列表是否有歌曲
    let list_ul = document.getElementById('list-ul')
    if(list_ul) {
        // 获取播放列表里的所有音乐
        let songs = [...document.getElementById('list-ul').children]
        // 先改一下下标
        window.playing++
        // 判断边界
        window.playing = window.playing > songs.length - 1 ? 0 : window.playing
        // 换歌
        getSongUrl(songs[window.playing])
    }
}