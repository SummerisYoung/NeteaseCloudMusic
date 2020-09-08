$(async function (){
    // 获取歌单id
    let url = window.location.href
    let id = url.substring(url.indexOf('=') + 1)
    // 调用歌单详情接口
    let playListRes = await GET('/playlist/detail?id=' + id).then(r => r.playlist)
    // 歌单中的全部歌曲,用res中的全部trackIds请求一次song/detail 接口获取所有歌曲的详情
    let songsArr = []
    playListRes.trackIds.forEach(t => {
        songsArr.push(t.id)
    })
    let playlist_songs = await GET('/song/detail?ids=' + songsArr.join(',')).then(r => {
        return {id,songs:r.songs}
    })
    // 本地存储
    let storage = {}
    storage[playlist_songs.id] = playlist_songs.songs
    // 覆盖本地存储播放列表,预备播放
    sessionStorage.setItem('list',JSON.stringify(storage))
    // 布局上层页面
    let html = topLayout(playListRes)
    // 布局下层页面
    html += `
    <div class="playlist-bottom">
        <ul class="section">
            <li id="lists" class="active">歌曲列表</li>
            <li onclick="commentsLayout(this)" data-id="${id}">评论(${playListRes.commentCount})</li>
            <li onclick="lovesLayout(this)" data-id="${id}">收藏者</li>
        </ul>
        <div class="main">${songsLayout(playlist_songs)}</div>
    </div>
    `
    // 填入页面
    document.getElementById('playlist').innerHTML = html

    // 展开收起图标
    let description = document.getElementsByClassName('description')[0]
    let icon = description.nextElementSibling
    if(description.offsetHeight > 50) {
        icon.style.display = 'block'
        description.style.height = '50px'
        description.classList.add('text-ellipsis') 
        description.style.whiteSpace = 'pre-wrap'
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

    // 设置滚动条
    nicescroll(document.getElementById('playlist'))

    // 歌曲列表单独设置点击事件
    document.getElementById('lists').onclick = function() {
        // 设置选中样式
        active(this)
        document.getElementsByClassName('main')[0].innerHTML = songsLayout(playlist_songs)

        // 检测滚动条是否重置大小（当窗口改变大小时）
        $("#index").getNiceScroll().resize();
    }
})

// 上侧布局
function topLayout(res) {
    let str = `
    <div class="playlist-top">
        <img class="big-img" src="${res.coverImgUrl + '?param=220y220'}" alt="">
        <div class="playlist-content">
            <div class="content-top">
                <div>
                    <span>歌单</span>
                    <h2>${res.name}</h2>
                </div>
                <div>
                    <p><span>歌曲数</span><span>${res.trackCount}</span></p>
                    <p><span>播放数</span><span>${numConvert(res.playCount)}</span</p>
                </div>
            </div>
            <div class="content-middle">
                <div>
                    <img style="width:30px;height:30px" class="tiny-img-radius" src="${res.creator.avatarUrl}" alt="" onclick="goUser(this)" data-id="${res.creator.userId}">
                    <span class="creator" onclick="goUser(this)" data-id="${res.creator.userId}">${res.creator.nickname}</span>
                    <span class="create-time">${stampToTime(res.createTime)}创建</span>
                </div>
                <ul>
                    <li>
                        <span><i class="iconfont icon-play"></i>播放全部</span>
                        <span><i class="iconfont icon-plus"></i></span>
                    </li>
                    <li><span><i class="iconfont icon-favority"></i>收藏(${res.subscribedCount})</span></li>
                    <li><span><i class="iconfont icon-share"></i>分享(${res.shareCount})</span></li>
                    <li><span><i class="iconfont icon-download"></i>下载全部</span></li>
                </ul>
            </div>
            <div class="content-bottom">
                ${res.tags.length ? `<p class="tag">标签：<span class="keyword-highlight">${res.tags.join(' / ')}</span></p>` : ''}
                ${res.description ? `
                    <div>
                        <p class="description">${res.description}</p>
                        <i class="iconfont icon-right"></i>
                    </div>
                ` : ''}
            </div>
        </div>
    </div>
    `
    return str
}

// 歌曲列表布局
function songsLayout(res) {
    let str = `
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
            
            <tbody id="tbody" data-parent-id="${res.id}">
    `
    let duration = 0
    res.songs.forEach((s,i) => {
        // 计算歌曲时长
        duration = timeConvert(s.dt / 1000)
        // 再布置内容
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
    str += `
            </tbody>
        </table>
    `
    return str
}

// 评论布局
async function commentsLayout(that) {
    // 获取评论内容
    let res = await GET('/comment/playlist?id=' + that.dataset.id)
    // 填入评论内容
    let str = `
        <div class="comment">
            <div class="comment-input">
                <div>
                    <i class="iconfont icon-pen"></i>
                    <span>发表评论</span> 
                </div>
                <div>
                    <i class="iconfont icon-smile"></i>
                    <span class="aite">@</span>
                </div>
            </div>
            <div class="comment-middle">
    `
    // 填入精彩评论
    if(res.hotComments.length) {
        let hotUl = '<div class="hot-comment"><p class="comment-section">精彩评论</p><ul>' + commentDom(res.hotComments) + '</ul><p class="read-more">查看更多精彩评论></p></div>'
        str += hotUl
    }
    // 填入最新评论
    if(res.comments.length) {
        let ul = `<div class="new-comment"><p class="comment-section">最新评论<span>(${res.total})</span></p><ul>` + commentDom(res.comments) + '</ul></div>'
        str += ul
    }

    str += '</div></div>'

    document.getElementsByClassName('main')[0].innerHTML = str

    // 设置选中样式
    active(that)
}

// 评论li
function commentDom(comments) {
    let str = ''
    comments.forEach(h => {
        str += `
            <li>
                <img class="tiny-img-radius" src="${h.user.avatarUrl  + '?param=50y50'}" alt="">
                <div class="comment-content">
                    <div><span class="keyword-highlight">${h.user.nickname}</span>：${h.content}</div>

                    ${h.beReplied.length ? (h.beReplied[0].content ? '<div class="be-replied"><span class="keyword-highlight">@' + h.beReplied[0].user.nickname + '</span>：' + h.beReplied[0].content + '</div>' : '<p style="text-align:center;">该评论已删除</p>') : ''}

                    <div class="comment-other">
                        <p>${stampToTime(h.time)}</p>
                        <div class="comment-operate">
                            <p class="report">举报</p>
                            <p>
                                <i class="iconfont icon-like"></i>
                                ${h.likedCount ? '<span>(' + h.likedCount + ')</span>' : ''}
                            </p>
                            <p>分享</p>
                            <p>回复</p>
                        </div>
                    </div>
                </div>
            </li>
        `
    })
    return str
}

// 收藏者布局
async function lovesLayout(that) {
    // 获取收藏者内容
    let res = await GET('/playlist/subscribers?id=' + that.dataset.id + '&limit=100')
    let str = '<ul class="subscribers">'
    res.subscribers.forEach(s => {
        str += `
            <li>
                <img class="small-img-radius" src="${s.avatarUrl +'?param=100y100'}">
                <p class="text-ellipsis">${s.nickname}</p>
            </li>
        `
    })

    str += '</ul>'

    document.getElementsByClassName('main')[0].innerHTML = str

    // 设置选中样式
    active(that)
}