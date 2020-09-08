$(async function () {
    // 获取歌手id
    let id = window.location.href.match(/(?<=(id=)).*/)[0]
    // 请求基本信息
    let res = await GET('/artists?id=' + id)
    // 获取页面标签
    let artist = document.getElementById('artist')
    // 布局上层页面
    let html = `
    <div class="artist-top">
        <img class="big-img" src="${res.artist.picUrl + '?param=220y220'}">
        <div class="artist-content">
            <div class="content-top">
                <div>
                    <span>歌手</span>
                    <h2>${res.artist.name}</h2>
                </div>
                <p><i class="iconfont icon-favority"></i>收藏</p>
            </div>
            ${res.artist.alias.length ? `<p class="alias">${res.artist.alias}</p>` : ''}
            <div class="content-bottom">
                ${res.artist.musicSize ? `<p><i class="iconfont icon-music"></i>单曲数：${res.artist.musicSize}</p>` : ''}
                ${res.artist.albumSize ? `<p><i class="iconfont icon-album"></i>专辑数：${res.artist.albumSize}</p>` : ''}
                ${res.artist.mvSize ? `<p><i class="iconfont icon-mv"></i>MV数：${res.artist.mvSize}</p>` : ''}
            </div>
        </div>
    </div>
    `
    // 添加导航栏和默认内容
    html += `
    <ul class="artist-nav">
        <li onclick="albumLayout(${id})" class="active">专辑</li>
        <li onclick="mvLayout(${id})">MV</li>
        <li onclick="detailLayout(${id})">歌手详情</li>
        <li onclick="similarLayout(${id})">相似歌手</li>
    </ul>
    <div class="main">${await albumLayout(id)}</div>
    ` 
    // 填入页面
    artist.innerHTML = html
    // 获取导航栏
    let lis = [...document.getElementsByClassName('artist-nav')[0].children]
    // 获取内容标签
    let main = document.getElementsByClassName('main')[0]
    // 导航栏点击事件
    lis.forEach(l => {
        l.onclick = async function(){
            // 选中样式
            active(this)
            // 添加loading
            main.innerHTML = `<div class="loading"><img src='./public/img/loading.gif'>载入中...</div>`
            switch(l.innerText) {
                case "专辑": {
                    main.innerHTML = await albumLayout(id)
                    break;
                }
                case "MV": {
                    main.innerHTML = await mvLayout(id)
                    break;
                }
                case "歌手详情": {
                    main.innerHTML = await descLayout(id)
                    break;
                }
                case "相似歌手": {
                    
                }
            }
            // 调整滚动条
            $(artist).getNiceScroll().resize()
        }
    })
    // 添加滚动条
    nicescroll(artist)
})

// 专辑
async function albumLayout(id) {
    // 获取热门五十首
    let res1 = await GET('/artists?id=' + id).then(r => r.hotSongs)
    // 普通专辑
    let res2 = await GET('/artist/album?id=' + id + '&limit=10').then(r => r.hotAlbums)
    // 本地存储对象
    let storage = {}
    // 布局页面
    let str = '<div id="album">'
    // 热门50首
    {
        str += `
        <div class="album-item">
            <img class="mid-img" src="${res1[0].al.picUrl + '?param=180y180'}">
            <div class="album-right">
                <div class="album-title">
                    <p>热门50首</p>
                    <p>
                        <i class="iconfont icon-favority"></i>
                        <i class="iconfont icon-play"></i>
                    </p>
                </div>
                <ul class="li-hover text-ellipsis beyond" data-parent-id=1>
        `
        res1.forEach((h,i) => {
            str += `
            <li ondblclick="getSongUrl(this)" data-id="${h.id}">
                <span>${(i + 1 + '').padStart(2,'0')}</span>
                <span><i class="iconfont icon-love"></i><i class="iconfont icon-download"></i></span>
                <span>${h.name}</span>
                <span>${timeConvert(h.dt / 1000)}</span>
            </li>
            `
        });
        str += `</ul><p onclick="lookmore(this)">查看全部50首></p></div></div>`
        // 放入本地存储
        storage['1'] = res1
    }
    // 普通专辑
    {
        for(let a of res2) {
            // 请求专辑内容
            let res3 = await GET('/album?id=' + a.id).then(r => r.songs)
            str += `
            <div class="album-item">
                <div class="album-left">
                    <div class="bg"></div>
                    <img class="mid-img" src="${a.picUrl  + '?param=180y180'}">
                    <p>${stampToTime(a.publishTime).split(' ')[0]}</p>
                </div>
                <div class="album-right">
                    <div class="album-title">
                        <p>${a.name}</p>
                        <p>
                            <i class="iconfont icon-favority"></i>
                            <i class="iconfont icon-play"></i>
                        </p>
                    </div>
            `
            str += `<ul class="li-hover text-ellipsis ${res3.length > 10 ? 'beyond' : ''}" data-parent-id=${a.id}>`
            res3.forEach((r,i) => {
                str += `
                <li ondblclick="getSongUrl(this)" data-id="${r.id}">
                    <span>${(i + 1 + '').padStart(2,'0')}</span>
                    <span><i class="iconfont icon-love"></i><i class="iconfont icon-download"></i></span>
                    <span>${r.name}</span>
                    <span>${timeConvert(r.dt / 1000)}</span>
                </li>
                `
            })
            str += `</ul>${res3.length > 10 ? `<p onclick="goAlbum(this)" data-id="${a.id}">查看全部${res3.length}首></p>` : ''}`
            str += '</div></div>'
            // 放入本地存储
            storage[a.id] = res3
        }
    }
    str += '</div>'
    // 覆盖本地存储
    sessionStorage.setItem('list',JSON.stringify(storage))

    return str
}

// 查看全部
function lookmore(that) {
    // 取消高度限制
    document.getElementsByClassName('li-hover')[0].style.height = 'auto' 
    // 调整滚动条  
    $(artist).getNiceScroll().resize()
    // 删除这个提示节点
    that.parentNode.removeChild(that)
}

// MV
async function mvLayout(id) {
    // 获取mv
    let res = await GET('/artist/mv?id=' + id)
    console.log(res);
    // 布局页面
    // 布局页面
    let str = `
    <div id="mv">
        <div class="playlist">
            <ul>
    `
    res.mvs.forEach(v => {
        str += `
        <li>
            <div class="playlist-img">
                <img class="mid-img" src="${v.imgurl + '?param=180y180'}">
                <p class="right-top">
                    <i class="iconfont icon-video"></i>
                    <span>${numConvert(v.playCount)}</span>
                </p>
                <p class="left-bottom">
                    ${timeConvert(v.duration / 1000)}
                </p>
            </div>
            <p class="playlist-name text-ellipsis">${v.name}</p>
        </li>
        `
    })
    str += '</ul></div></div>'

    return str
}

// 详情
async function descLayout(id) {
    // 获取详情
    let res = await GET('/artist/desc?id=' + id)
    // 布局页面
    let str = `
    <div id="desc">
    `
    // 歌手描述数组
    let arr = []
    res.introduction.forEach(i => {
        // 歌手描述按照\n分割成字符串
        arr = i.txt.split('\n')
        str += `
        <div>
            <h3>${i.ti}</h3>
            <ul>
        `
        arr.forEach(a => {
            str += `
            <li>
                ${a}
            </li>
            `
        })
        str += `
            </ul>
        </div>
        `
    })
    str += '</div>'

    return str
}
