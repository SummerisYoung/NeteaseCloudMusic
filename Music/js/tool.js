// post请求
const POST = function (url, data) {
    return new Promise((r,j) => {
       $.ajax({
            url: 'http://localhost:3000' + url + '?_=' + Date.now(),
            data,
            method:'post',
            dataType:'json',
            success(res) {
                r(res)
            },
            error(err) {
                j(err)
            }
        }) 
    })
}

// get请求
const GET = function(url) {
    return new Promise((r,j) => {
        $.ajax({
             url: 'http://localhost:3000' + url,
             method:'get',
             dataType:'json',
             success(res) {
                 r(res)
             },
             error(err) {
                 j(err)
             }
         }) 
     })
}

// 关键词高亮
function highlight(str,keyword) {
    // 搜索头部的关键词
    if(str == '') return `<span class="keyword-highlight">${keyword}</span>`
    // 搜索内容的关键词
    let index = str.toLowerCase().indexOf(keyword.toLowerCase())
    if(index != -1){
        let rep = str.substring(index,index + keyword.length)
        return str.replace(rep, `<span class="keyword-highlight">${rep}</span>`)
    }else {
        return str
    }
}

// 作者格式化
function author(artists) {
    // 先遍历取到全部作者
    let song_articles = ''

    artists.forEach((b,i) => {
        song_articles += `<span onclick="goArtist(this)" data-id=${b.id}>${b.name}</span>`
        if(i < artists.length - 1) {
            song_articles += ' / '
        }
    })

    return song_articles
}

// 一个标签上同一事件绑定不同函数
function bind(obj,eventName,fn) {
    if(obj.addEventListener) {
        obj.addEventListener(eventName, fn);
    }else {
        obj.attachEvent('on' + eventName, function() {
            fn.call(obj)
        })
    }
}

// 时间戳转时间
function stampToTime(timestamp) {
    let stamp = new Date(timestamp),
        y = stamp.getFullYear(),
        m = stamp.getMonth() + 1,
        d = stamp.getDate();
    return `${y}年${m}月${d}日 ${stamp.toTimeString().substring(0,5)}`
}

// 数量单位转换
function numConvert(num) {
    return num > 100000 ? Math.floor(num / 10000) + '万' : num + ''
}

// 时间单位转换
function timeConvert(second) {
    return (Math.floor(second / 60) + '').padStart(2,'0') + ':' + (Math.floor(second % 60) + '').padStart(2,'0')
}

// 点击歌曲,这一行变色
function changeColor(that) {
    // 先把之前点击的每一项的颜色去掉
    let prev = [...document.getElementsByClassName('deep-color')]
    prev.forEach(p => {
        p.classList.remove('deep-color')
    })
    // 当前点击的变色
    that.classList.add('deep-color')
}

// 跳转到用户页
function goUser(that) {
    window.location.href = 'user.html?id=' + that.dataset.id
}

// 跳转到歌单页
function goPlayList(that) {
    window.location.href = 'playList.html?id=' + that.dataset.id
}

// 跳转到专辑页
function goAlbum(that) {
    window.location.href = 'album.html?id=' + that.dataset.id
}

// 跳转到歌手页
function goArtist(that) {
    window.location.href = `artist.html?id=` + that.dataset.id
}

// 设置选中样式
function active(el) {
    // 清除兄弟标签选中样式
    [...el.parentNode.children].forEach(c => {
        c.className = ''
    })
    // that标签设置选中样式
    el.className = 'active'
}

// 设置滚动条
function nicescroll(dom) {
    $(dom).niceScroll({
        cursorcolor:"#ddd",     // 滚动条的颜色值
        cursorwidth:8,         // 滚动条的宽度值
        autohidemode:false,      // 滚动条是否是自动隐藏，默认值为 true
    })
}