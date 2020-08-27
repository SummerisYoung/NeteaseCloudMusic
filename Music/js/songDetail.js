function getSongDetail(song) {
    return async function() {
        let lyrics = await POST('http://localhost:3000/lyric',{id:song.id}).then(r => r.lrc.lyric)
        //页面标签
        let detail = document.getElementById('song-detail')
        //背景图标签
        let bgimg = document.getElementsByClassName('bg-img')[0]
        //上层标签
        let top = document.getElementsByClassName('song-top')[0],
            left = top.children[0],
            right = top.children[1]
        //歌词标签
        let lyricDom = document.getElementsByClassName('lyric')[0]
        //audio标签
        let audio = document.getElementsByTagName('audio')[0]
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
        let lyricTime = makeLyric(lyrics,lyricDom)
        //比较歌词项
        let num = 0
        //歌词滚动
        bind(audio,'timeupdate',lyricScroll(lyricTime,lyricDom,audio,num))
    }
}

//把歌词显示在页面上
function makeLyric(lyrics,lyricDom) {
    //用一个数组保存歌词时间
    let lyricTime = []
    //布局页面
    let str = ''
    let time = ''
    let lrc = ''
    lyrics.split('\n').forEach((l,i) => {
        //a是匹配到的整个字符串,b是小括号内的东西,如a:[00:00:000],b:00:00
        lrc = l.replace(/\[(\d\d:\d\d)\.\d{2,3}\]/g, function(a,b) {
            time = b
            return ""
        })
        lyricTime.push(time)
        str += `<li data-time="${time}">${lrc}</li>`
    });
    //填入页面
    lyricDom.innerHTML = str
    //设置定时器，因为页面标签存在长宽变化的transition
    setTimeout(function(){
        $('.lyric-box').niceScroll({
            cursorcolor:"rgb(189,191,193)",     //滚动条的颜色值
            cursorwidth:8,         //滚动条的宽度值
            autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
            cursorborder:'none'
        })
    }, 500);

    return lyricTime
}

//歌词滚动
function lyricScroll(lyricTime,lyricDom,audio,num) {
    return function() {
        //把时间数组里的分和秒提取出来,s是匹配的时间,$1是分,$2是秒,用分和秒计算总秒数,返回字符串,再用+转为数字
        let lyricList = lyricTime.map(v => +(v.replace(/(\d\d):(\d\d)/, (s, $1, $2) => $1*60 + $2*1)))
        //取到页面中所有歌词li
        let lis = [...lyricDom.children]
        //比较当前歌曲播放进度时间  大于 歌词时间列表的哪一项
        while(audio.currentTime > lyricList[num]) {
            //一直找
            num++
            //如果有一项比当前歌曲进度快了，那么就是刚刚播放到这一项的上一项
            if(audio.currentTime < lyricList[num]) {
                lis.forEach((li,i) => {
                    //清除高亮
                    li.classList.remove('lyric-highlight')
                    //找到上一项歌词li对应
                    if(i == (num - 1)) {
                        //滚动到前四条歌词和后四条歌词时不在滚动
                        if(num > 4 && num < lis.length - 4) {
                            //歌词滚动
                            lyricDom.style.top = -40*(num-5) + 'px'
                        }
                        console.log(lyricList,num);
                        //加上高亮
                        li.classList.add('lyric-highlight')
                    }
                })
            }
        }
        //做完上述操作，要把num变为比歌曲播放的时间小一项，否则用户把歌曲往回拖动时，高亮会比音乐延迟
        while(audio.currentTime < lyricList[num]){
            num--
        }
        //歌曲结束,全部歌词取消高亮
        if(num == lyricList.length) {
            lis.forEach(li => {
                li.className = ''
            })
        }
    }
}