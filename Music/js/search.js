$(function () {
    // 获取input标签和点击input后的结果标签
    let search_ipt = document.getElementById('search-ipt');
    let search_res = document.getElementsByClassName('search-res')[0];
    let icon = document.getElementsByClassName('icon-search')[0];

    // 给input标签添加onchange事件 -> 获取改变input输入后的搜索结果
    search_ipt.addEventListener('input',getInputChange.bind(this,search_res,search_ipt))
    // 给input标签添加focus事件 -> 获取热搜
    search_ipt.addEventListener('focus',getSearchHot.bind(this,search_res,search_ipt))

    // 判断鼠标点击了文档的哪一部分，根据定位父级判断是否隐藏结果标签
    document.addEventListener('click',(e) => {
        if(e.target.offsetParent != search_res && e.target.offsetParent != search_ipt.parentElement) {
            search_res.style.display = 'none'
            search_res.parentElement.style.display = 'none'
        }
    })
})

// 获取热搜
async function getSearchHot(search_res,search_ipt) {
    if(search_ipt.value == '') {
        // 发送请求
        let res = await GET('/search/hot/detail');
        // 初始化要修改的dom内容
        let str = '<h3>热搜榜</h3><ul class="search-ul">'
        // 遍历请求后返回的结果
        res.data.forEach((r,i) => {
            // 每次遍历都把每一项填入str
            str += `
                <li>
                    <span>${++i}</span>
                    <div class='search-li-text'>
                        <p><span>${r.searchWord}</span><span>${r.score}</span><img src="${r.iconUrl == null ? '' : r.iconUrl}" alt=""></p>
                        <p>${r.content}</p>
                    </div>
                </li>
            `
        })
        str += '</ul>'
        // 一次性修改dom
        search_res.innerHTML = str
        // 显示结果标签
        search_res.style.display = 'block'
        search_res.parentElement.style.display = 'block'
        // 改一下结果标签宽度
        search_res.style.width = '530px'
        nicescroll(search_res)
    }else{
        getInputChange(search_res,search_ipt)
    }
}

// 改变input输入后的搜索结果
async function getInputChange(search_res,search_ipt) {
    // 清空一下之前的结果
    search_res.innerHTML = ''
    // 改一下结果标签宽度
    search_res.style.width = '450px'
    if(search_ipt.value) {
        // 发送请求
        let res = await GET('/search/suggest?keywords=' + search_ipt.value)
        let str = `<p style="padding:5px 10px" class="suggest-li" onclick="gosearchList()">搜"${search_ipt.value}"相关的结果></p>`
        res.result.order.forEach(o => {
            switch(o) {
                case 'songs':
                    str += `<p class="suggest-order"><i class="iconfont icon-note"></i>单曲</p><ul>`
                    res.result[o].forEach(s => {
                        str += `<li class="suggest-li text-ellipsis" onclick="getSongUrl(this)" data-id="${s.id}">${s.name}  ${s.alias.length ? '(' + s.alias + ')' : ''} - ${author(s.artists)}</li>`
                    })
                    break;
                case 'artists':
                    str += `<p class="suggest-order"><i class="iconfont icon-user"></i>歌手</p><ul>`
                    res.result[o].forEach(s => {
                        str += `<li class="suggest-li text-ellipsis" onclick="goArtist(this)" data-id="${s.id}">${s.name}</li>`
                    })
                    break;
                case 'albums':
                    str += `<p class="suggest-order"><i class="iconfont icon-album"></i>专辑</p><ul>`
                    res.result[o].forEach(s => {
                        str += `<li class="suggest-li text-ellipsis" onclick="goAlbum(this)" data-id="${s.id}">${s.name} - ${s.artist.name}</li>`
                    })
                    break;
                case 'playlists':
                    str += `<p class="suggest-order"><i class="iconfont icon-musiclist"></i>歌单</p><ul>`
                    res.result[o].forEach(s => {
                        str += `<li class="suggest-li text-ellipsis" onclick="goPlayList(this)" data-id="${s.id}">${s.name}</li>`
                    })
                    break;
            }
            str += '</ul>'
        })

        search_res.innerHTML = str

        // 添加点击关闭search_res事件
        search_res.onclick = (e) => {
            if(e.target.tagName == 'LI') {
                search_res.style.display = 'none'
            }
        }

        // 显示结果标签
        search_res.style.display = 'block';
        search_res.parentElement.style.display = 'block'
    }else{
        getSearchHot(search_res,search_ipt)
    }
}

// 跳转到歌曲列表界面
function gosearchList() {
    // 获取input标签
    let search_ipt = document.getElementById('search-ipt')
    if(window.event.keyCode == 13 || window.event.keyCode == undefined) {
        window.location.href = 'searchList.html?keywords=' + search_ipt.value + '&type=1&limit=100'
    }
}