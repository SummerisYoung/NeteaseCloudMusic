import $ from 'jquery'
import niceScroll from 'jquery.nicescroll'

export default {
    // 关键词高亮
    highlight(str,keyword) {
        // 搜索头部的关键词
        if(str == '') return `<span class="keyword-highlight">${keyword}</span>`
        // 搜索内容的关键词
        let index = str.toLowerCase().indexOf(keyword.toLowerCase())
        if(index != -1){
            let rep = str.substring(index,index + keyword.length)
            return str.replace(rep, `<span class="keyword-highlight">${rep}</span>`)
        }else {
            return str
        }
    },

    // 作者格式化
    author(artists) {
        // 先遍历取到全部作者
        let song_articles = ''

        artists.forEach((b,i) => {
            song_articles += `<span onclick="goArtist(this)" data-id=${b.id}>${b.name}</span>`
            if(i < artists.length - 1) {
                song_articles += ' / '
            }
        })

        return song_articles
    },

    // 一个标签上同一事件绑定不同函数
    bind(obj,eventName,fn) {
        if(obj.addEventListener) {
            obj.addEventListener(eventName, fn);
        }else {
            obj.attachEvent('on' + eventName, function() {
                fn.call(obj)
            })
        }
    },

    // 时间戳转时间
    stampToTime(timestamp) {
        let stamp = new Date(timestamp),
            y = stamp.getFullYear(),
            m = stamp.getMonth() + 1,
            d = stamp.getDate();
        return `${y}年${m}月${d}日 ${stamp.toTimeString().substring(0,5)}`
    },

    // 数量单位转换
    numConvert(num) {
        return num > 100000 ? Math.floor(num / 10000) + '万' : num + ''
    },

    // 时间单位转换
    timeConvert(second) {
        return (Math.floor(second / 60) + '').padStart(2,'0') + ':' + (Math.floor(second % 60) + '').padStart(2,'0')
    },

    // 点击歌曲,这一行变色
    changeColor(that) {
        // 先把之前点击的每一项的颜色去掉
        let prev = [...document.getElementsByClassName('deep-color')]
        prev.forEach(p => {
            p.classList.remove('deep-color')
        })
        // 当前点击的变色
        that.classList.add('deep-color')
    },

    // 滚动条
    nicescroll(dom) {
        $(dom).niceScroll({
            cursorcolor:"#ddd",     // 滚动条的颜色值
            cursorwidth:8,          // 滚动条的宽度值
            autohidemode:false,     // 滚动条是否是自动隐藏，默认值为 true
            zIndex: 5               // 改变z-index值的滚动条的div
        })
    }
}
