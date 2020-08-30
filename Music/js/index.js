$(async function() {
    //填充数据的dom
    let dom = document.getElementById('index')
    //首页请求的api数组
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
    //准备添加到页面的html
    let html = `
        <ul class="index-header">
            <li class="active">个性推荐</li>
            <li>歌单</li>
            <li>主播电台</li>
            <li>排行榜</li>
            <li>歌手</li>
            <li>最新音乐</li>
        </ul>
    `
    //循环获取数据生成dom
    for(let i = 0;i < homeApi.length;i++) {
        html += await dataDom(homeApi[i])
    }
    //添加到页面
    dom.innerHTML = html
    //添加滚动条
    $(dom).niceScroll({
        cursorcolor:"#ddd",     //滚动条的颜色值
        cursorwidth:8,         //滚动条的宽度值
        autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
    })
    //banner处理
    banner(document.getElementsByClassName('banner-list')[0].children[0])
})

//展示数据
async function dataDom(homeApi) {
    let res = await GET('http://localhost:3000' + homeApi.url)
    let str = ''
    switch(homeApi.name) {
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
                        <h2>${homeApi.name}</h2>
                        <span>更多></span>
                    </div>

                    <div class="block-list block-${homeApi.class}">
            `
            str += '<ul class="ul-newsong">'
            for(let i = 0;i < res.result.length / 2;i++){
                str += `
                    <li>
                        <div>${(i + 1 + '').padStart(2,'0')}</div>
                        <img src="${res.result[i].picUrl}">
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
                        <img src="${res.result[i].picUrl}">
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
                        <h2>${homeApi.name}</h2>
                        <span>更多></span>
                    </div>

                    <div class="block-list block-${homeApi.class}">
            `
            res.result.forEach(i => {
                str += `
                    <div class="block-item" data-id="${i.id}">
                        <img src="${i.picUrl}">
                        <p>${i.name}</p>
                    </div>
                `
            });
            str += '</div></div>'
        }
    }
    return str
}

//banner
function banner(banner_ul) {
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