$(function () {
    // 获取value
    let url = window.location.href
    let value = decodeURI(url.substring(url.indexOf('?') + 1))
    // 用正则表达式的断言取到关键词
    let keyword = value.match(/(?<==).*?(?=&)/)[0]
    // 获取页面标签
    let searchList = document.getElementById('searchList')
    // 获取搜索导航
    let lis = [...searchList.children[1].children]
    // 获取内容部分
    let main = searchList.children[2]
    // 默认搜索单曲
    searchSong(keyword, searchList);
    // 给导航添加点击事件
    lis.forEach(l => {
        l.onclick = function(){
            active(this)
            // 添加loading
            main.innerHTML = `<div class="loading"><img src='./public/img/loading.gif'>载入中...</div>`
            switch(this.innerText) {
                case "单曲": {
                    searchSong(keyword, searchList);
                    break;
                }
                case "歌手": {
                    searchSinger(keyword, searchList)
                    break;
                }
                case "专辑": {
                    searchAlbum(keyword, searchList)
                    break;
                }
                case "视频": {
                    searchVideo(keyword, searchList)
                    break;
                }
                case "歌单": {
                    searchPlayList(keyword, searchList)
                    break;
                }
                case "歌词": {
                    searchLyric(keyword, searchList)
                    break;
                }
                case "主播电台": {
                    searchRadio(keyword, searchList)
                    break;
                }
                case "用户": {
                    searchUser(keyword, searchList)
                    break;
                }
            }
        }
    })
    // 添加滚动条
    nicescroll(searchList)
})

// 搜索单曲
async function searchSong(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=1&limit=100').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.songCount}首单曲`
    // 布局页面
    let str = `
        <div id="search-song">
            <table>
                <thead>
                    <tr>
                        <th width="6%"></th>
                        <th width="6%">操作</th>
                        <th width="25%">音乐标题</th>
                        <th width="25%">歌手</th>
                        <th width="25%">专辑</th>
                        <th width="13%">时长</th>
                    </tr>
                </thead>
                <tbody id="search-tbody">
    `
    res.songs.forEach((s,i) => {
        // 再布置内容
        str += `
            <tr onclick="changeColor(this)" ondblclick="getSongUrl(this)" data-id="${s.id}">
                <td>${(i + 1 + '').padStart(2,'0')}</td>
                <td><i class="iconfont icon-love"></i><i class="iconfont icon-download"></i></td>
                <td class="text-ellipsis">${highlight(s.name,keyword)}${s.alias.length ? '<p style="padding:15px 0 0 0;color:#999">' + s.alias + '</p>' : ''}</td>
                <td class="text-ellipsis">${highlight(author(s.artists),keyword)}</td>
                <td class="text-ellipsis">${highlight(s.album.name,keyword)}</td>
                <td>${timeConvert(s.duration / 1000)}</td>
            </tr>
        `
    });
    str += `
            </tbody>
        </table>
    </div>
    `
    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 搜索歌手
async function searchSinger(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=100').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.artistCount}位歌手`
    // 布局页面
    let str = `
        <div id="search-singer">
            <ul class="li-hover">
    `
    res.artists.forEach(a => {
        str += `
        <li onclick="goArtist(this)" data-id="${a.id}">
            <img class="tiny-img" src="${a.picUrl + '?param=50y50'}">
            <span>${highlight(a.name,keyword)}</span>
            <span><i class="iconfont icon-user"></i></span>
        </li>
        `
    });

    str += '</ul></div>'
    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 搜索专辑
async function searchAlbum(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=10').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.albumCount}张专辑`
    // 布局页面
    let str =`
    <div id="search-album">
        <ul class="li-hover">
    `

    res.albums.forEach(a => {
        str += `
        <li onclick="goAlbum(this)" data-id="${a.id}">
            <div class="bg"></div>
            <img class="tiny-img" src="${a.picUrl + '?param=50y50'}">
            <span>${highlight(a.name, keyword)}</span>
            <span>${a.artist.name}</span>
        </li>
        `
    })

    str += '</ul></div>'

    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 搜索视频
async function searchVideo(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=1014').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.videoCount}个视频`
    // 布局页面
    let str = `
    <div id="search-video">
        <div class="playlist">
            <ul>
    `
    res.videos.forEach(v => {
        str += `
        <li>
            <div class="playlist-img">
                <img class="mid-img" src="${v.coverUrl + '?param=180y180'}">
                <p class="right-top">
                    <i class="iconfont icon-video"></i>
                    <span>${numConvert(v.playTime)}</span>
                </p>
                <p class="left-bottom">
                    ${timeConvert(v.durationms / 1000)}
                </p>
            </div>
            <p class="playlist-name text-ellipsis">${highlight(v.title,keyword)}</p>
            <p class="trackCount">by ${v.creator.userName}</p>
        </li>
        `
    })
    str += '</ul></div></div>'

    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 搜索歌单
async function searchPlayList(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=1000').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.playlistCount}个歌单`
    // 布局页面
    let str = `
    <div id="search-playlist">
        <ul class="li-hover">
    `

    res.playlists.forEach(p => {
        str += `
        <li>
            <img class="tiny-img" src="${p.coverImgUrl + '?param=50y50'}">
            <span>${highlight(p.name, keyword)}</span>
            <span>${p.trackCount}首</span>
            <span>${p.creator.nickname}</span>
        </li>
        `
    })

    res += '</ul></div>'

    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 搜索歌词
async function searchLyric(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=1006').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.songCount}首歌词`
    // 布局页面
    let str = `
        <div id="search-lyric">
            <table>
                <thead>
                    <tr>
                        <th width="6%"></th>
                        <th width="6%">操作</th>
                        <th width="25%">音乐标题</th>
                        <th width="18%">歌手</th>
                        <th width="25%">专辑</th>
                        <th width="20%">时长</th>
                    </tr>
                </thead>
                <tbody id="tbody">
    `
    res.songs.forEach((s,i) => {
    // 再布置内容
    str += `
        <tr onclick="changeColor(this)" ondblclick="getSongUrl(this)" data-id="${s.id}">
            <td>${(i + 1 + '').padStart(2,'0')}</td>
            <td><i class="iconfont icon-love"></i><i class="iconfont icon-download"></i></td>
            <td class="text-ellipsis">${highlight(s.name,keyword)}</td>
            <td class="text-ellipsis">${highlight(author(s.artists),keyword)}</td>
            <td class="text-ellipsis">${highlight(s.album.name,keyword)}</td>
            <td>${timeConvert(s.duration / 1000)}</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td><div class="text-ellipsis lyric">${highlight(s.lyrics.txt.substring(s.lyrics.txt.indexOf(keyword)),keyword)}</div></td>
            <td></td>
            <td></td>
            <td>
                <span onclick="spread(this)">展开歌词</span>
                <span onclick="copyText(this)">复制歌词</span>
            </td>
        </tr>
    `
    });
    str += `
            </tbody>
        </table>
    </div>
    `

    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 搜索主播电台
async function searchRadio(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=1009').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.djRadiosCount}个电台`
    // 布局页面
    let str = `
    <div id="search-radio">
        <p class="title">主播电台</p>
        <div class="playlist">
            <ul>
    `

    res.djRadios.forEach(d => {
        str += `
        <li>
            <img class="mid-img" src="${d.picUrl + '?param=180y180'}">
            <p class="playlist-name text-ellipsis">${highlight(d.name, keyword)}</p>
            <p class="trackCount">by ${d.dj.nickname}</p>
        </li>
        `
    })

    res += '</ul></div></div>'

    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 搜索用户
async function searchUser(keyword, searchList) {
    // 搜索歌单接口
    let res = await GET('/search?keywords=' + keyword + '&type=1002').then(r => r.result)
    // 更改顶部提示
    searchList.children[0].innerHTML = `搜索${highlight('',keyword)}，找到${res.userprofileCount}位用户`
    // 布局页面
    let str = `
    <div id="search-user">
        <ul class="li-hover">
    `

    res.userprofiles.forEach(u => {
        str += `
        <li onclick="goUser(this)" data-id="${u.userId}">
            <img class="tiny-img-radius" src="${u.avatarUrl + '?param=50y50'}">
            <span>${highlight(u.nickname, keyword)}</span>
            <i class="iconfont ${u.gender == 1 ? 'icon-man' : 'icon-woman'}"></i>
            <span>${u.signature}</span>
        </li>
        `
    })

    res += '</ul></div></div>'

    searchList.children[2].innerHTML = str

    // 检测滚动条是否重置大小（当窗口改变大小时）
    $(searchList).getNiceScroll().resize();
}

// 展开歌词
function spread(that) {
    let lyric = that.parentNode.parentNode.children[2].children[0]
    if(lyric.offsetHeight == 100) {
        lyric.style.height = 'auto'
    }else {
        lyric.style.height = '100px'
    }
}

// 复制文本到剪贴板
function copyText(that)
{
    new ClipboardJS(that,{
        text: function(trigger) {
            return trigger.parentNode.parentNode.children[2].innerText
        }
    }).onClick(event)// 解决第一次点击无效方法：再触发一次
}