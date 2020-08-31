$(async function (){
    //获取歌单id
    let url = window.location.href
    //调用歌单详情接口
    let id = url.substring(url.indexOf('=') + 1)
    let res = await GET('http://localhost:3000/playlist/detail?id=' + id + '&s=10').then(r => r.playlist)
    //获取评论内容
    let commentsRes = await GET('http://localhost:3000/comment/playlist?id=' + id)
    //获取收藏者内容
    let loversRes = await GET('http://localhost:3000/playlist/subscribers?id=' + id + '&limit=100')
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
    content_middle.children[0].children[0].dataset.userId = res.creator.userId

    content_middle.children[0].children[1].innerText = res.creator.nickname
    content_middle.children[0].children[1].dataset.userId = res.creator.userId

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

    //歌单下部分歌曲
    let playlist_bottom = playlist_top.nextElementSibling
    //下部分标题栏
    let ul = [...playlist_bottom.children[0].children]
    //下部分主体
    let main = playlist_bottom.children[1]
    //一进来先获取歌曲列表
    main.innerHTML = songsLayout(playlist_songs)
    //点击标题栏
    ul.forEach((u,i) => {
        u.onclick = () => {
            //所有子标签清除选中样式
            for(let i of ul) {
                i.className = ''
            }
            //当前子标签设置点中样式
            u.className = 'active'
            //判断使用哪个函数
            switch(i) {
                case 0: {
                    main.innerHTML = songsLayout(playlist_songs)
                    break;
                }
                case 1: {
                    u.innerText = `评论(${res.commentCount})`
                    main.innerHTML = commentsLayout(commentsRes)
                    break;
                }
                case 2:{
                    main.innerHTML = lovesLayout(loversRes)
                }
            }
        }
    })

    //设置滚动条
    $('#playlist').niceScroll({
        cursorcolor:"#ddd",     //滚动条的颜色值
        cursorwidth:8,         //滚动条的宽度值
        autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
    })
})

//歌曲列表布局
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
            
            <tbody id="tbody">
    `
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
    str += `
            </tbody>
        </table>
    `
    return str
}

//评论布局
function commentsLayout(res) {
    //填入评论内容
    let comment = `
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
    //填入精彩评论
    if(res.hotComments.length) {
        let hotUl = '<div class="hot-comment"><p class="comment-section">精彩评论</p><ul>' + commentDom(res.hotComments) + '</ul><p class="read-more">查看更多精彩评论></p></div>'
        comment += hotUl
    }
    //填入最新评论
    if(res.comments.length) {
        let ul = `<div class="new-comment"><p class="comment-section">最新评论<span>(${res.total})</span></p><ul>` + commentDom(res.comments) + '</ul></div>'
        comment += ul
    }

    comment += '</div></div>'

    return comment
}

//评论li
function commentDom(comments) {
    let str = ''
    comments.forEach(h => {
        str += `
            <li>
                <img src="${h.user.avatarUrl}" alt="">
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

//收藏者布局
function lovesLayout(res) {
    let str = '<ul class="subscribers">'
    res.subscribers.forEach(s => {
        str += `
            <li>
                <img src="${s.avatarUrl}">
                <p class="text-ellipsis">${s.nickname}</p>
            </li>
        `
    })

    str += '</ul>'

    return str
}