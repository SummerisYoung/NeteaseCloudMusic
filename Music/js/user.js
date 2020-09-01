$(async function() {
    //获取用户id
    let url = window.location.href
    let id = url.substring(url.indexOf('=') + 1)
    //请求用户详情
    let userRes = await GET('/user/detail?uid=' + id)
    //布局上层页面
    let html = topLayout(userRes)
    //布局下层页面
    html += '<div class="user-bottom">'
    //请求用户创建的电台信息
    let djRes = await GET('/user/audio?uid=' + id)
    if(djRes.djRadios.length) {
        // 布局电台页面
        html += djLayout(djRes)
    }
    //请求用户的歌单信息
    let playRes = await GET('/user/playlist?uid=' + id)
    if(playRes.playlist.length) {
        // 布局歌单页面
        html += plLayout(playRes)
    }
    
    html += '</div>'
    //页面标签
    let user = document.getElementById('user')
    user.innerHTML = html
    //设置滚动条
    $(user).niceScroll({
        cursorcolor:"#ddd",     //滚动条的颜色值
        cursorwidth:8,         //滚动条的宽度值
        autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
    })
})

//上层页面
function topLayout(res) {
    let str = `
    <div class="user-top">
        <img class="big-img" src="${res.profile.avatarUrl}" alt="">
        <div class="user-content">
            <div class="content-top">
                <div class="top-head">
                    <div class="user-basic">
                        <h2 class="nickname">${res.profile.nickname}</h2>
                        <img src="public/img/vip.png" alt="">
                        <i class="iconfont ${res.profile.gender == 1 ? 'icon-man' : 'icon-woman'}"></i>
                        <em>Lv.${res.level}</em>
                    </div>

                    <div class="user-operate">
                        <p><i class="iconfont icon-email"></i>发私信</p>
                        <p><i class="iconfont icon-plus"></i>关注</p>
                        <p>···</p>
                    </div>
                </div>

                ${res.profile.expertTags ? `<p class='label'><i class='iconfont icon-star'></i>${res.profile.expertTags.join('、') || ''}</p>` : ''}
            </div>

            <div class="content-middle">
                <div class="user-data">
                    <h2 class="event-count">${res.profile.eventCount}</h2>
                    <span>动态</span>
                </div>

                <div class="user-data">
                    <h2 class="user-follows">${res.profile.follows}</h2>
                    <span>关注</span>
                </div>

                <div class="user-data">
                    <h2 class="user-followeds">${res.profile.followeds}</h2>
                    <span>粉丝</span>
                </div>
            </div>

            <div class="content-bottom">
                <p class="binding"><span>社交网络：</span><i class="iconfont ${res.bindings[1].url ? 'icon-weibo' : ''}"></i>${res.bindings[1].url ? '' : '未绑定'}</p>
                <p class="description">个人介绍：${res.profile.signature ? res.profile.signature : '暂无介绍'}</p>
            </div>
        </div>
    </div>
    `

    return str
}

//电台页面
function djLayout(res) {
    let str = `
        <div class="user-dj">
            <p class="user-item">Ta创建的电台(${res.djRadios.length})</p>
            <ul>
    `
    res.djRadios.forEach(d => {
        str += `
            <li>
                <div>
                    <img class="tiny-img" src="${d.picUrl}">
                    <span class="dj-name">${d.name}</span>
                    <span class="dj-category">${d.category}</span>
                </div>

                <div>
                    <span>节目${d.programCount}</span>
                    <span>订阅${numConvert(d.subCount)}</span>
                </div>
            </li>
        `
    });

    str += `
            </ul>
        </div>
    `
    return str
}

//歌单页面
function plLayout(res) {
    let str = `
        <div class="user-playlist">
            <p class="user-item">歌单</p>
            <ul>
    `

    res.playlist.forEach(p => {
        str += `
            <li data-id="${p.id}" onclick="goPlayList(this)">
                <div class="playlist-img">
                    <img class="mid-img" src="${p.coverImgUrl}">
                    <p class="right-top">
                        <i class="iconfont icon-headset"></i>
                        <span>${numConvert(p.playCount)}</span>
                    </p>
                    <p class="right-bottom">
                        <i class="iconfont icon-play"></i>
                    </p>
                </div>
                <p class="playlist-name">${p.name}</p>
                <p class="trackCount">${p.trackCount}首</p>
            </li>
        `
    })

    str += `
            </ul>
        </div>
    `
    return str
}