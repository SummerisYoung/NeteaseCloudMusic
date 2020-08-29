$(async function() {
    //填充数据的dom
    let dom = document.getElementById('index')
    //首页请求的api数组
    let homeApi = [
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
        },
        {
            name:'听听',
            class:'homepage',
            url:'/homepage/block/page'
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
    for(let i = 0;i < homeApi.length - 1;i++) {
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
})

//展示数据
async function dataDom(homeApi) {
    console.log(homeApi);
    let res = await GET('http://localhost:3000' + homeApi.url)
    let str = `
        <div class="block">
            <div class="block-header">
                <h2>${homeApi.name}</h2>
                <span>更多></span>
            </div>

            <div class="block-list block-${homeApi.class}">
    `
    switch(homeApi.name) {
        case '最新音乐': {
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
            break;
        }
        case '听听': {

        }
        default: {
            res.result.forEach(i => {
                str += `
                    <div class="block-item" data-id="${i.id}">
                        <img src="${i.picUrl}">
                        <p>${i.name}</p>
                    </div>
                `
            });
        }
    }

    str += '</div></div>'
    return str
}