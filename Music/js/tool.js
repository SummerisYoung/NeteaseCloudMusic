//post请求
const POST = function (url, data) {
    return new Promise((r,j) => {
       $.ajax({
            url: url + '?_=' + Date.now(),
            data,
            method:'post',
            dataType:'json',
            success(res) {
                r(res)
            },
            error(err) {
                j(err)
            }
        }) 
    })
}

//get请求
const GET = function(url) {
    return new Promise((r,j) => {
        $.ajax({
             url: url,
             method:'get',
             dataType:'json',
             success(res) {
                 r(res)
             },
             error(err) {
                 j(err)
             }
         }) 
     })
}

//关键词高亮
function highlight(str,keyword) {
    if(str == '') return `<span class="search-keyword">${keyword}</span>`
    let index = str.toLowerCase().indexOf(keyword.toLowerCase())
    if(index != -1){
        let rep = str.substring(index,index + keyword.length)
        return str.replace(rep, `<span class="search-keyword">${rep}</span>`)
    }else {
        return str
    }
}

//作者格式化
function author(artists) {
    //先遍历取到全部作者
    let song_articles = ''

    artists.forEach((b,i) => {
        song_articles += b.name
        if(i < artists.length - 1) {
            song_articles += ' / '
        }
    })

    return song_articles
}

//一个标签上同一事件绑定不同函数
function bind(obj,eventName,fn) {
    if(obj.addEventListener) {
        obj.addEventListener(eventName, fn);
    }else {
        obj.attachEvent('on' + eventName, function() {
            fn.call(obj)
        })
    }
}