//请求音乐url
async function getSongUrl(that) {
    //拿到audio标签
    let audio = document.getElementsByTagName('audio')[0]
    let pause_play = document.querySelector('#footer .footer-left i:nth-child(2)')
    let volume = document.getElementsByClassName('volume')[0]
    let footer_song = document.getElementsByClassName('footer-song')[0]
    //请求歌曲url
    let res = await POST('http://localhost:3000/song/url', {id:that.dataset.id}).then(r => r.data[0])
    //请求歌曲详细信息
    let det = await POST('http://localhost:3000/song/detail',{ids:that.dataset.id})
    let song = det.songs[0]
    //音乐url
    audio.src = res.url
    //初始化一下音量
    audio.volumn = volume.children[1].offsetLeft / volume.offsetWidth
    //播放
    audio.play()
    //更改图标
    pause_play.classList.remove('icon-play')
    pause_play.classList.add('icon-pause')
    //左下角图片url
    footer_song.children[0].children[0].src = song.al.picUrl
    //左下角歌曲名和歌手
    footer_song.children[1].innerHTML = `
        <p class="text-ellipsis">${song.name}${song.alia.length ? '<span style="color:#999"> (' + song.alia + ') <span>' : ''}</p>
        <p class="text-ellipsis">${author(song.ar)}</p>
    `
    footer_song.style.opacity = '1'
    //左下角音乐图片点击事件
    footer_song.children[0].onclick = getSongDetail(song)
}

$(function () {
    $('#song-detail').load('public/songDetail.html')
    //获取滚动条
    let music_bar = document.getElementsByClassName('music-bar')[0]
    //获取音频标签
    let audio = document.getElementsByTagName('audio')[0]
    //获取播放暂停图标
    let pause_play = document.querySelector('#footer .footer-left i:nth-child(2)')
    //获取音量条
    let volumn = document.getElementsByClassName('volume')[0]

    //点击播放暂停图标
    pause_play.onclick = () => {
        if(pause_play.classList.contains('icon-pause')) {
            audio.pause()
        }else{
            audio.play()
        }
        pause_play.classList.toggle('icon-pause')
        pause_play.classList.toggle('icon-play')
    }

    //更新播放条
    audio.ontimeupdate = syncMusicBar(music_bar)
    
    //拖动播放条
    music_bar.children[1].onmousedown = dragBar(audio)

    //拖动音量条
    volumn.children[1].onmousedown = dragVolumn(audio)
})

//更新播放条
function syncMusicBar(music_bar) {
    return function () {
        if(this.duration >= 0) {
            //获取当前的播放时刻
            let current = Math.trunc(this.currentTime)
            //获取总时间
            let duration = Math.trunc(this.duration)
            //获取滚动条
            let progress = music_bar.children[1]
            //获取滚动条左右两个时间标签
            let spans = document.querySelectorAll('#footer .footer-middle span')
            //设置时间
            spans[0].innerText = (Math.floor(current / 60) + '').padStart(2,'0') + ':' + (Math.floor(current % 60) + '').padStart(2,'0')
            spans[1].innerText = (Math.floor(duration / 60) + '').padStart(2,'0') + ':' + (Math.floor(duration % 60) + '').padStart(2,'0')
            //计算并设置当前进度
            let x = current / duration * music_bar.offsetWidth
            music_bar.children[0].style.width = x + 'px'
            progress.style.left = x - progress.offsetWidth / 2 + 'px';
        }
    }
    
    
}

//拖动播放条
function dragBar(audio) {
    return function () {
        //获取鼠标摁下时的坐标
        let x1 = window.event.pageX
        //获取鼠标摁下时进度条的位置
        let left = this.offsetLeft
        //关闭音乐进度条的同步
        audio.ontimeupdate = null
        //设置初始进度所占比例
        let proportion = 0
        document.onmousemove = (e) => {
            let x2 = e.pageX - x1 + left
            //限定边界
            x2 = Math.max(x2,0)
            x2 = Math.min(x2,this.parentElement.offsetWidth - this.offsetWidth / 2)

            this.style.left = x2 + 'px'
            this.parentElement.children[0].style.width = x2 + 'px'
            // 保存当前拖动的进度在总进度里的比例
            proportion = x2 / this.parentElement.offsetWidth
        }

        //鼠标抬起
        document.onmouseup = () => {
            //开启进度条
            audio.ontimeupdate = syncMusicBar(this.parentElement)
            //进度条进度变化
            audio.currentTime = proportion * audio.duration

            //事件解绑
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}

//拖动音量条
function dragVolumn(audio) {
    return function() {
        //获取鼠标摁下时的坐标
        let x1 = window.event.pageX
        //获取鼠标摁下时进度条的位置
        let left = this.offsetLeft

        //鼠标拖动
        document.onmousemove = (e) => {
            let x2 = e.pageX - x1 + left
            //限定边界
            x2 = Math.max(x2, 0)
            x2 = Math.min(x2, this.parentElement.offsetWidth - this.offsetWidth / 2)
            
            //更改音量条位置
            this.style.left = x2 + 'px'
            this.parentElement.children[0].style.width = x2 + 'px'

            //计算音量
            audio.volume = x2 / (this.parentElement.offsetWidth - this.offsetWidth / 2)
        }

        //鼠标抬起
        document.onmouseup = () => {
            //事件解绑
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    
}