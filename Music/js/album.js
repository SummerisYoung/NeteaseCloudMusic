$(async function (){
    //获取歌单id
    let url = window.location.href
    let id = url.substring(url.indexOf('=') + 1)
    //调用歌单详情接口
    let res = await GET('/album?id=' + id)
    console.log(res);
    //布局上层页面
    let html = topLayout(res.album)
    //布局下层页面
    html += `
    <div class="album-bottom">
        <ul class="section">
            <li id="lists" class="active">歌曲列表</li>
            <li onclick="commentsLayout(this)" data-id="${id}">评论(${res.album.info.commentCount})</li>
            <li onclick="descriptionLayout(this)" data-description="${res.album.description}">专辑详情</li>
        </ul>
        <div class="main">${songsLayout(res)}</div>
    </div>
    `
    //填入页面
    document.getElementById('album').innerHTML = html

    //设置滚动条
    nicescroll(document.getElementById('album'))

    //歌曲列表单独设置点击事件
    document.getElementById('lists').onclick = function() {
        //设置选中样式
        active(this)
        document.getElementsByClassName('main')[0].innerHTML = songsLayout(res)

        // 检测滚动条是否重置大小（当窗口改变大小时）
        $("#index").getNiceScroll().resize();
    }
})

//上侧布局
function topLayout(res) {
    let str = `
    <div class="album-top">
        <img class="big-img" src="${res.picUrl + '?param=220y220'}" alt="">
        <div class="album-content">
            <div class="content-top">
                <span>专辑</span>
                <h2>${res.name}</h2>
            </div>
            <div class="content-middle">
                <ul>
                    <li>
                        <span><i class="iconfont icon-play"></i>播放全部</span>
                        <span><i class="iconfont icon-plus"></i></span>
                    </li>
                    <li><span><i class="iconfont icon-favority"></i>收藏(${res.info.likedCount})</span></li>
                    <li><span><i class="iconfont icon-share"></i>分享(${res.info.shareCount})</span></li>
                    <li><span><i class="iconfont icon-download"></i>VIP下载</span></li>
                </ul>
            </div>
            <div class="content-bottom">
                <p>歌手：<span>${author(res.artists)}</span></p>
                <p>时间：<span>${stampToTime(res.publishTime).substring(0,9)}</span></p>
            </div>
        </div>
    </div>
    `
    return str
}

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
async function commentsLayout(that) {
    //获取评论内容
    let res = await GET('/comment/album?id=' + that.dataset.id)
    console.log(res);
    //填入评论内容
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
    //填入精彩评论
    if(res.hotComments.length) {
        let hotUl = '<div class="hot-comment"><p class="comment-section">精彩评论</p><ul>' + commentDom(res.hotComments) + '</ul><p class="read-more">查看更多精彩评论></p></div>'
        str += hotUl
    }
    //填入最新评论
    if(res.comments.length) {
        let ul = `<div class="new-comment"><p class="comment-section">最新评论<span>(${res.total})</span></p><ul>` + commentDom(res.comments) + '</ul></div>'
        str += ul
    }
    if(res.hotComments.length + res.comments.length == 0) {
        let p = '<div class="no-comment">还没有评论，快来抢沙发~</div>'
        str += p
    }

    str += '</div></div>'

    document.getElementsByClassName('main')[0].innerHTML = str

    //设置选中样式
    active(that)
}

//评论li
function commentDom(comments) {
    let str = ''
    comments.forEach(h => {
        str += `
            <li>
                <img class="tiny-img-radius" src="${h.user.avatarUrl + '?param=50y50'}" alt="">
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

//专辑详情布局
function descriptionLayout(that) {
    // 描述数组
    let arr = that.dataset.description.split('\n')
    let str = `
    <div class="description">
        <h3>专辑介绍</h3>
        <ul>
    `
    arr.forEach(a => str += `<li>${a}<li>`)
    str += '</ul></div>'
    document.getElementsByClassName('main')[0].innerHTML = str

    //设置选中样式
    active(that)
}