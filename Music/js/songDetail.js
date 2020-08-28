function getSongDetail(song) {
    return async function() {
        let lyrics = await POST('http://localhost:3000/lyric',{id:song.id}).then(r => r.lrc.lyric)
        //页面标签
        let detail = document.getElementById('song-detail')
        //背景图标签
        let bgimg = detail.children[0].children[0]
        //上层标签
        let top = detail.children[0].children[1],
            left = top.children[0],
            right = top.children[1]
        //歌词标签
        let lyricDom = document.getElementsByClassName('lyric')[0]
        //歌曲图片标签
        let songImg = document.getElementsByClassName('song-image')[0]
        //audio标签
        let audio = document.getElementsByTagName('audio')[0]
        //页面中取到的所有dom元素放进一个对象传给后面需要的函数
        let dom = {detail,bgimg,top,left,right,lyricDom,songImg,audio}
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
        //歌词处理
        let lyricTime = makeLyric(lyrics,dom)
        //比较歌词项
        let num = 0
        //高亮歌词项
        let highlight = 0
        //定时器旋转歌曲图片
        let rotate = 0
        //歌词滚动
        bind(audio,'timeupdate',lyricScroll(lyricTime,dom,num,highlight,rotate))
        
    }
}

//歌词处理
function makeLyric(lyrics,dom) {
    //用一个数组保存歌词时间
    let lyricTime = []
    //布局页面
    let str = ''
    let time = ''
    let lrc = ''
    lyrics.split('\n').forEach((l,i) => {
        //a是匹配到的整个字符串
        //$1是第一个小括号内的字符串,即分钟
        //$2是第二个小括号内的字符串,即秒钟和毫秒
        //如a:[05:30.123],$1:05,$2:30.123
        //用*把字符串转为数字
        lrc = l.replace(/\[(\d\d):(\d\d\.\d{2,3})\]/g, function(a,$1,$2) {
            time = $1 * 60 + $2.substring(0,6) * 1
            return ""
        })
        lyricTime.push(time)
        str += `<li data-time="${time}">${lrc}</li>`
    });
    //填入页面
    dom.lyricDom.innerHTML = str
    //设置定时器，因为页面标签存在长宽变化的transition
    setTimeout(function(){
        $('.lyric-box').niceScroll({
            cursorcolor:"rgb(189,191,193)",     //滚动条的颜色值
            cursorwidth:8,         //滚动条的宽度值
            autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
            cursorborder:'none',
            preservenativescrolling:false
        })
    }, 500);
    //处理一下时间数组,主要针对歌词最后存在一些混音编曲之类的作者的,这些的时间相同的情况,手动延迟一点时间
    for(let i = lyricTime.length - 15;i < lyricTime.length;i++) {
        //如果前面的加了,那么可能出现前一项的时间大于后一项,所以判断这里是>=
        if(lyricTime[i - 1] >= lyricTime[i]) {
            lyricTime[i] = lyricTime[i - 1] + 0.5
        }
    }
    console.log(lyricTime);
    return lyricTime
}

//歌词滚动
function lyricScroll(lyricTime,dom,num,highlight,rotate) {
    return function() {
        //歌曲图片旋转
        dom.songImg.style.transform = `rotate(${(++rotate)}deg)`
        //取到页面中所有歌词li
        let lis = [...dom.lyricDom.children]
        //比较当前歌曲播放进度时间  大于 歌词时间列表的哪一项
        while(dom.audio.currentTime > lyricTime[num]) {
            //一直找
            num++
            //如果有一项比当前歌曲进度快了，那么就是刚刚播放到这一项的上一项
            if(dom.audio.currentTime < lyricTime[num]) {
                //清除前一个高亮
                lis[highlight].classList.remove('lyric-highlight')
                //前四条歌词和后四条歌词无需滚动
                if(num > 4 && num < lis.length - 4) {
                    //歌词滚动
                    dom.lyricDom.style.top = -lis[0].offsetHeight*(num-5) + 'px'
                    //滚动条滚动
                    document.querySelector('.song-top .nicescroll-cursors').style.top = (num - 5) / lyricTime.length * document.querySelector('.song-top #ascrail2001').offsetHeight + 'px'
                }
                //这一项加上高亮
                lis[num - 1].classList.add('lyric-highlight')
                //记录这一项
                highlight = num - 1
            }
        }
        //做完上述操作，要把num变为比歌曲播放的时间小一项，否则用户把歌曲往回拖动时，高亮会比音乐延迟
        while(dom.audio.currentTime < lyricTime[num]){
            num--
        }
        //歌曲结束,最后一句歌词取消高亮
        if(dom.audio.ended) {
            lis[highlight].className = ''
        }
    }
}