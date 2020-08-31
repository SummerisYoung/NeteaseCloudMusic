$(async function() {
    //获取用户id
    let url = window.location.href
    let id = url.substring(url.indexOf('=') + 1)
    let res = await GET('http://localhost:3000/user/detail?uid=' + id)
    topDom(res)
})

//上层页面
function topDom(res) {
    console.log(res);
    document.getElementsByClassName('user-top')[0].innerHTML = `
        <img id="user-img" src="${res.profile.avatarUrl}" alt="">
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
    `
}