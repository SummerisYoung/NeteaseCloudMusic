export default {
  install: function (Vue) {
    // 关键词高亮
    Vue.prototype.highlight = function (str, keyword) {
      // 搜索头部的关键词
      if (str == '') return `<span class="keyword-highlight">${keyword}</span>`
      // 搜索内容的关键词
      let index = str.toLowerCase().indexOf(keyword.toLowerCase())
      if (index != -1) {
        let rep = str.substring(index, index + keyword.length)
        return str.replace(rep, `<span class="keyword-highlight">${rep}</span>`)
      } else {
        return str
      }
    };

    // 作者格式化
    Vue.prototype.author = function (artists) {
      // 先遍历取到全部作者
      let song_articles = ''

      artists.forEach((b, i) => {
        song_articles += `<span onclick="goArtist(this)" data-id=${b.id}>${b.name}</span>`
        if (i < artists.length - 1) {
          song_articles += ' / '
        }
      })

      return song_articles
    };

    // 一个标签上同一事件绑定不同函数
    Vue.prototype.bind = function (obj, eventName, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(eventName, fn);
      } else {
        obj.attachEvent('on' + eventName, function () {
          fn.call(obj)
        })
      }
    };

    // 时间戳转时间
    Vue.prototype.stampToTime = function (timestamp) {
      let stamp = new Date(timestamp),
        y = stamp.getFullYear(),
        m = stamp.getMonth() + 1,
        d = stamp.getDate();
      return `${y}年${m}月${d}日 ${stamp.toTimeString().substring(0, 5)}`
    };

    // 数量单位转换
    Vue.prototype.numConvert = function (num) {
      return num > 100000 ? Math.floor(num / 10000) + '万' : num + ''
    };

    // 时间单位转换
    Vue.prototype.timeConvert = function (second) {
      return (Math.floor(second / 60) + '').padStart(2, '0') + ':' + (Math.floor(second % 60) + '').padStart(2, '0')
    };

    // 加载歌曲
    Vue.prototype.getSong = function(id) {
      // 请求歌曲详细信息
      this.all([
        this.get("/song/detail?ids=" + id),
        this.get("/song/url?id=" + id),
      ]).then((r) => {
        this.$store.dispatch("changeSongDetail", r[0].songs[0]);
        this.$store.dispatch("changeSongUrl", r[1].data[0]);
      });
    }

    // 加载loading
    Vue.prototype.showLoading = async function(fn) {
      // 添加loading
      this.$store.commit('changeLoading',true)
      // 执行函数
      await fn()
      // 关闭loading
      this.$store.commit('changeLoading',false)
    };

    // 跳转到专辑页面
    Vue.prototype.goAlbum = function(id) {
      this.$router.push({path: '/album', query: {id}})
    }
 
    // 跳转到歌手页面
    Vue.prototype.goArtist = function(id) {
      this.$router.push({path: '/artist', query: {id}})
    }

    // 跳转到用户界面
    Vue.prototype.goUser = function(id) {
      this.$router.push({path: 'user',query: {id}})
    }
  }
}
