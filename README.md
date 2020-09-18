﻿# NeteaseCloudMusic
由原生js改为使用vue2 + vue-cli4 + vue-router + vuex编写

- 2.0.0 初始化vue-cli项目，复盘首页轮播功能，调用api**banner**

- 2.0.1 复盘首页个性推荐的推荐歌单部分，调用api**推荐歌单**

- 2.0.2 复盘首页个性推荐、首页歌单，调用api**推荐歌单**、**独家放送(入口列表)**、**推荐新音乐**、**推荐mv**、**推荐电台**、**歌单(网友精选碟)**、**热门歌单分类**、**歌单分类**

- 2.0.3 复盘首页排行榜、歌手、最新音乐，调用api**所有榜单内容摘要**、**歌手榜**、**歌手分类列表**、**新歌速递**、**新碟上架**

- 2.0.4 废弃jquery.niceScroll滚动条，改用element ui滚动条组件，复盘topbar热搜，调用api**热搜列表(详细)**

- 2.0.5 复盘topbar搜索、搜索结果歌曲部分，调用api**搜索建议**、**搜索**

- 2.0.6 复盘歌曲播放url，调用api**获取歌曲详情**、**获取音乐 url**

- 2.0.7 复盘播放音乐部分，初始化歌词，调用api**获取歌词**

- 2.0.8 复盘歌词滚动部分，复盘歌曲详情页，调用api**歌曲评论**、**获取相似音乐**

- 2.0.9 全面修改网络请求部分，使用async-await搭配axios，全局加载loading方法