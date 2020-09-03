$(async function() {
    // 页面最高父级
    let dom = document.getElementById('index')
    // 栏目导航
    let lis = [...dom.children[0].children]
    // 获取主体标签
    let main = dom.children[1]
    // 获取个性推荐
    main.innerHTML = await recommendDom()
    // 给栏目添加点击事件
    lis.forEach(l => {
        l.onclick = async function(){
            active(this)
            main.innerHTML = `<div class="loading"><img src='./public/img/loading.gif'>载入中...</div>`
            switch(this.innerText) {
                case "歌单": {
                    main.innerHTML = await playlistDom()
                    break;
                }
                case "主播电台": {

                }
                case "排行榜": {
                    main.innerHTML = await topListDom()
                    break;
                }
            }
            // 检测滚动条是否重置大小（当窗口改变大小时）
            $("#index").getNiceScroll().resize();
        }
    })
    // 添加banner控制器
    bannerControl(document.getElementsByClassName('banner-list')[0].children[0])
    // 添加滚动条
    nicescroll(document.getElementById('index'))
})

// 个性推荐
async function recommendDom() {
    //个性推荐六个子栏目对象
    let homeApi = [
        {
            name:'banner',
            class:'banner',
            url:'/banner?type=0'
        },
        {
            name:'推荐歌单',
            class:'personalized',
            url:'/personalized?limit=12'
        },
        {
            name:'独家放送',
            class:'privatecontent',
            url:'/personalized/privatecontent'
        },
        {
            name:'最新音乐',
            class:'newsong',
            url:'/personalized/newsong'
        },
        {
            name:'推荐MV',
            class:'mv',
            url:'/personalized/mv'
        },
        {
            name:'主播电台',
            class:'djprogram',
            url:'/personalized/djprogram'
        }
    ]
    let str = '<div id="recommend">'
    for(let i = 0;i < homeApi.length;i++) {
        let res = await GET(homeApi[i].url)
        switch(homeApi[i].name) {
            case 'banner': {
                str += `
                    <div class="banner">
                        <div class="banner-list">
                            <ul class="banner-ul">
                `
                res.banners.forEach((b,i) => {
                    str += `
                        <li class="p${i}">
                            <img src=${b.imageUrl}>
                        </li>
                    `
                })
                str += `</ul></div>
                    <a href="javascript:;" class="prev btn"><</a>
                    <a href="javascript:;" class="next btn">></a>
                    <ul class="banner-btn">
                `
                res.banners.forEach((b,i) => {
                    str += `
                        <li href="javascript:;"><span class="${i == 0 ? 'red':''}"></span></li>
                    `
                })
                str += '</ul></div>'
                break;
            }
            case '最新音乐': {
                str += `
                    <div class="block">
                        <div class="block-header">
                            <h2>${homeApi[i].name}</h2>
                            <span>更多></span>
                        </div>
    
                        <div class="block-list block-${homeApi[i].class}">
                `
                str += '<ul class="ul-newsong">'
                for(let i = 0;i < res.result.length / 2;i++){
                    str += `
                        <li>
                            <div>${(i + 1 + '').padStart(2,'0')}</div>
                            <img class="tiny-img" src="${res.result[i].picUrl}">
                            <div>
                                <p class="text-ellipsis">${res.result[i].name}</p>
                                <p class="text-ellipsis">${author(res.result[i].song.artists)}</p>
                            </div>
                        </li>
                    `
                }
                str += '</ul>'
    
                str += '<ul class="ul-newsong">'
                for(let i = res.result.length / 2;i < res.result.length;i++){
                    str += `
                        <li>
                            <div>${(i + 1 + '').padStart(2,'0')}</div>
                            <img class="tiny-img" src="${res.result[i].picUrl}">
                            <div>
                                <p class="text-ellipsis">${res.result[i].name}</p>
                                <p class="text-ellipsis">${author(res.result[i].song.artists)}</p>
                            </div>
                        </li>
                    `
                }
                str += '</ul>'
                str += '</div></div>'
                break;
            }
            default: {
                str += `
                    <div class="block">
                        <div class="block-header">
                            <h2>${homeApi[i].name}</h2>
                            <span>更多></span>
                        </div>
    
                        <div class="block-list block-${homeApi[i].class}">
                `
                res.result.forEach(i => {
                    str += `
                        <div class="block-item" data-id="${i.id}" onclick="goPlayList(this)">
                            <img class="mid-img" src="${i.picUrl}">
                            <p>${i.name}</p>
                        </div>
                    `
                });
                str += '</div></div>'
            }
        }
    }
    str += '</div>'
    return str
}

// banner控制器
function bannerControl(banner_ul) {
    //图片标签数组
    let picDom = [...banner_ul.children]
    //图片底下按钮数组
    let btn = [...document.querySelectorAll('.banner-btn span')]
    //图片样式数组
    let picClass = ['p0','p1','p2','p3','p4','p5','p6','p7','p8','p9']
    //切换图片下标
    let index = 0
    //定时器
    let timer = null
    //上一张
	function previmg(){
		picClass.push(picClass[0]);
		picClass.shift();
		picDom.forEach((p,i) => {
            p.className = picClass[i]
        })
        btn[index].className = ''
        index--;
		if (index < 0) {
			index = picDom.length - 1;
        }
        btn[index].className = 'red'
    }
    //下一张
	function nextimg(){
		picClass.unshift(picClass[picClass.length - 1]);
		picClass.pop();
		picDom.forEach((p,i) => {
            p.className = picClass[i]
        })
        btn[index].className = ''
        index++;
        if (index > picDom.length - 1) {
            index = 0;
        }
        btn[index].className = 'red'
    }
    //点击左按钮
    document.getElementsByClassName('prev')[0].onclick = previmg
    //点击右按钮
    document.getElementsByClassName('next')[0].onclick = nextimg
    //点击class为p1的元素触发上一张照片的函数
	$(document).on("click",".p1",function(){
		previmg();
	});

	//点击class为p3的元素触发下一张照片的函数
	$(document).on("click",".p3",function(){
		nextimg();
	});
    //进入页面自动开始定时器
	timer = setInterval(nextimg,3000);
    //鼠标移入box时清除定时器
	banner_ul.parentNode.parentNode.onmouseover = () => {
		clearInterval(timer);
	}
    // //鼠标移出box时开始定时器
    banner_ul.parentNode.parentNode.onmouseleave = () => {
        timer=setInterval(nextimg,3000);
    }
}

//歌单分类
async function playlistDom() {
    let str = '<div id="playlist">'
    // 添加歌单分类
    let catlists = await GET('/playlist/catlist')
    // 歌单分类
    let category = {
        language:[],
        style:[],
        scene:[],
        smile:[],
        theme:[]
    }
    let categoryCh = {language:'语种',style:'风格',scene:'场景',smile:'情感',theme:'主题'}
    catlists.sub.forEach(c => {
        switch(c.category) {
            case 0: {
                category.language.push(c)
                break;
            }
            case 1: {
                category.style.push(c)
                break;
            }
            case 2: {
                category.scene.push(c)
                break;
            }
            case 3: {
                category.smile.push(c)
                break;
            }
            case 4: {
                category.theme.push(c)
                break;
            }
        }
    })
    //歌单分类dom
    str += `
    <div class="catlist" onclick="openMenu(this)">
        <p class="display-sub" id="display-sub"><span id="display-sub">全部歌单</span><i class="iconfont icon-right" id="display-sub"></i></p>
        <div class="menu-before">
            <div class="catlist-main">
                <h6>添加标签</h6>
                <div class="catlist-menu">
                    <p id="all" class="choose" onclick="playlistControl(this)" data-name="全部歌单"><span>全部歌单</span></p>
    `
    //遍历歌单分类对象
    for(let i in category) {
        str += `
        <div class="category">
            <p><i class="iconfont icon-${i}"></i><span>${categoryCh[i]}</span></p>
            <ul>
        `
        category[i].forEach(c => {
            str += `
                <li onclick="playlistControl(this)" data-name="${c.name}">${c.name}${c.hot ? '<span class="hot">HOT</span>' : ''}</li>
            `
        })
        str += `
            </ul>
        </div>
        `
    }

    str += `
                </div>  
            </div>
        </div>
    </div>
    `
    
    //热门歌单
    let hots = await GET('/playlist/hot')

    str += '<div class="hot-tag"><span>热门标签：</span><ul>'

    hots.tags.forEach(t => {
        str += `
            <li onclick="playlistControl(this)" data-name=${t.name}>${t.name}</li>
        `
    })
    
    str += '</ul></div><div id="playlist-content">'

    str += await playlistUl("全部")

    str += '</div></div>'

    return str
}

// 歌单列表
async function playlistUl(cat) {
    //歌单图片
    let res = await GET('/top/playlist?limit=100&cat=' + cat)
    let str = '<div class="playlist"><ul>'

    res.playlists.forEach(p => {
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
                    <p class="left-bottom">
                        <i class="iconfont icon-user"></i>
                        ${p.creator.nickname}
                    </p>
                </div>
                <p class="playlist-name">${p.name}</p>
            </li>
        `
    })

    str += '</ul></div>'

    return str
}

// 歌单控制器
async function playlistControl(that) {
    console.log(that);
    // 获取内容标签
    let playlist_content = document.getElementById('playlist-content')
    // 放入加载样式
    playlist_content.innerHTML = `<div class="loading"><img src='./public/img/loading.gif'>载入中...</div>`
    //标签选中
    document.getElementsByClassName('choose')[0].classList.remove('choose')
    that.classList.add('choose')
    //改变标签文字
    document.getElementsByClassName('display-sub')[0].children[0].innerText = that.dataset.name
    //改变数据
    playlist_content.innerHTML = await playlistUl(that.dataset.name)
}

// 打开/关闭歌单分类菜单
function openMenu(that) {
    console.log(window.event.target.id);
    if(window.event.target.id == 'display-sub' || window.event.target.id == 'all' || window.event.target.tagName == 'LI'){
        if(window.getComputedStyle(that.children[1]).display == 'none') {
            that.children[1].style.display = 'block'
        }else {
            that.children[1].style.display = 'none'
        }
    }
    
    //添加滚动条
    nicescroll(document.getElementsByClassName('catlist-menu')[0])
}

// 排行榜
async function topListDom() {
    let res = await GET('/toplist/detail')
    // 全球榜
    let globalList = [...res.list.slice(4)]
    // 官方榜
    let officialList = []
    // 榜头颜色数组
    let colorArr = ['rgb(81,137,228)','rgb(64,180,192)','rgb(224,96,134)','rgb(200,95,67)']
    // 处理前四个热榜
    for(let i = 0;i < 4;i++) {
        officialList.push(await GET('/playlist/detail?id=' + res.list[i].id).then(r => r.playlist))
    }
    // 原创歌曲榜改名原创榜
    officialList[2].name = '云音乐原创榜'
    // 处理歌手榜
    let artistToplist = await GET('/toplist/artist').then(r => {
        r.list.coverImgUrl = res.artistToplist.coverUrl
        return r.list
    })
    let str = '<div id="toplist">'

    // 官方榜
    {
        str += `
            <div class="offcial">
                <h2>官方榜</h2>
                <ul class="offcial-ul">
        `
        //官方榜前四个
        for(let i = 0;i < officialList.length;i++) {
            str += `
            <li>
                <div class="offcial-ultop" style="background-color:${colorArr[i]}" data-id="${officialList[i].id}" onclick="goPlayList(this)">
                    <div>
                        <h3>${officialList[i].name.substring(3,4)}</h3>
                        <div>
                            <h4>${officialList[i].name.substring(4)}</h4>
                            <p>${stampToTime(officialList[i].updateTime).substring(5,9)}更新</p>
                        </div>
                    </div>
                    <div><i class="iconfont icon-play"></i></div>
                </div>
                <ul class="offcial-item">
            `      

            for(let j = 0;j < 8;j++) {
                str += `
                <li onclick="changeColor(this)" ondblclick="getSongUrl(this)" data-id="${officialList[i].tracks[j].id}">
                    <div class="text-ellipsis">
                        <span>${j + 1}</span>
                        <span>-</span>
                        <span>${officialList[i].tracks[j].name}</span>
                    </div>
                    <span class="artist text-ellipsis">${author(officialList[i].tracks[j].ar)}</span>
                </li>
                `
            }
            
            str += `
                </ul>
                <p class="offcial-more">查看全部></p>
            </li>
            `
        }
        //歌手榜
        str += `
        <li>
            <div class="offcial-ultop" style="background-color:rgb(145,67,200)">
                <div>
                    <h3>歌</h3>
                    <div>
                        <h4>手榜</h4>
                        <p>${stampToTime(artistToplist.updateTime).substring(5,9)}更新</p>
                    </div>
                </div>
            </div>
            <ul class="offcial-item">
        `
        for(let j = 0;j < 8;j++) {
            str += `
            <li>
                <div class="text-ellipsis">
                    <span>${j + 1}</span>
                    <span>-</span>
                    <span>${artistToplist.artists[j].name}</span>
                </div>
            </li>
            `
        }
        str += `
            </ul>
            <p class="offcial-more">查看全部></p>
        </li>
        `
                    
        str += `
                </ul>
            </div>
        `
    }

    // 全球榜
    {
        str += `
        <div class="global playlist">
            <h2>全球榜</h2>
            <ul class="global-ul">
        ` 

        globalList.forEach(g => {
            str += `
            <li data-id="${g.id}" onclick="goPlayList(this)">
                <div class="playlist-img">
                    <img class="mid-img" src="${g.coverImgUrl}">
                    <p class="right-top">
                        <i class="iconfont icon-headset"></i>
                        <span>${numConvert(g.playCount)}</span>
                    </p>
                </div>
                <p class="playlist-name">${g.name}</p>
            </li>
            `
        })

        str += '</ul></div>'
    }
    

    str += '</div>'

    return str
}