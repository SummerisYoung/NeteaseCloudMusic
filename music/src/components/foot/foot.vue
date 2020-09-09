<template>
<div id="foot">
    <div class="foot-left">
        <i class="iconfont icon-previous"></i>
        <i class="iconfont icon-play"></i>
        <i class="iconfont icon-next"></i>
    </div>

    <div class="foot-middle">
        <span>00:00</span>
        <div class="music-bar">
            <div class="passed"></div>
            <div class="progress">
                <div class="dot"></div>
            </div>
        </div>
        <span>00:00</span>
        <i class="iconfont icon-laba"></i>
        <div class="volume">
            <div class="passed"></div>
            <div class="progress"></div>
        </div>
    </div>

    <div class="foot-right">
        <i class="iconfont icon-playcycle"></i>
        <span>较高</span>
        <i class="iconfont icon-whale"></i>
        <i class="iconfont icon-ci"></i>
        <i class="iconfont icon-playlist"></i>
    </div>

    <div class="list">
        <div class="list-nav">
            <p class="default">播放列表</p>
            <p>历史记录</p>
        </div>
        <div class="list-operate">
            <p>总<span id="list-count">0</span>首</p>
            <p>
                <span><i class="iconfont icon-favority"></i>收藏全部</span>
                <span><i class="iconfont icon-trash"></i>清空</span>
            </p>
        </div>
        <div class="list-content">
            <div class="none">
                <p>你还没有添加任何歌曲！</p>
                <p>去首页<a href="#">发现音乐</a></p>
            </div>
        </div>
    </div>

    <audio src=""></audio>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less">
#foot {
    display: flex;
    position: fixed;
    bottom: 0;
    align-items: center;
    width: 100%;
    height: 65px;
    background: @dark-background;
    border-top: @border;
    user-select: none;
    z-index: 10;
    
    .foot-left {
        width: 240px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #fff;

        i {
            display: inline-block;
            width: 35px;
            height: 35px;
            line-height: 35px;
            border-radius: 50%;
            font-size: 20px;
            text-align: center;
            background: @red;
        }

        i:nth-child(2) {
            width: 45px;
            height: 45px;
            line-height: 48px;
            font-size: 30px;
        }
    }

    .foot-middle {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 12px;
        span {
            margin: 0 10px;
        }

        .music-bar {
            position: relative;
            flex: 1;
            height: 5px;
            background: rgb(225, 225, 225);

            .passed {
                width: 0;
                height: 100%;
                background: @red;
            }
        }

        .icon-laba {
            margin-right: 15px;
            color: #666;
        }

        .progress {
            position: absolute;
            left: -7px;
            top: -4px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: @border;
            background: #fff;

            .dot {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: @red;
            }

            .dot-loading {
                width: 10px;
                height: 10px;
                background-image: url(/public/img/loading.gif);
                background-size: cover;
                background-position: center;
                background-color: transparent;
            }
        }
        
        .volume {
            position: relative;
            width: 120px;
            height: 5px;
            background: rgb(225, 225, 225);

            i {
                color:#666;
                margin-right: 10px;
            }

            .passed {
                width: 50%;
                height: 100%;
                background: @red;
            }

            .progress {
                left: calc(50% - 7px);
            }
        }
    }

    .foot-right {
        display: flex;
        float: right;
        margin-left: auto;
        color: grey;
        font-size: 22px;

        * {
            margin: 0 8px;
        }

        span {
            padding: 0 2px;
            border: 1px solid grey;
            font-size: 12px;
        }
    }

    .list {
        display: none;
        flex-direction: column;
        position: absolute;
        right: 0;
        bottom: 65px;
        z-index: 5;
        width: 800px;
        height: 70vh;
        box-shadow: -2px -2px 5px rgba(0,0,0,.2);
        background: #fff;

        .list-nav {
            display: flex;
            width: 300px;
            margin: 20px auto;
            p {
                width: 80%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                user-select: none;
                border: @border;
                &:first-child {
                    border-radius: 5px 0 0 5px;
                }
                &:last-child {
                    border-radius: 0 5px 5px 0;
                }
            }

            .default {
                padding: 0;
                border-radius: 0;
            }
        }

        .list-operate {
            display: flex;
            justify-content: space-between;
            padding: 10px 40px;
            color: #999;
            border: @border;
            p:last-child {
                span {
                    i {
                        margin: 0 10px;
                    }
                    &:first-child {
                        border-right: @border;
                        padding: 0 10px;
                    }
                    &:hover {
                        color: #333;
                    }
                }
            }
        }
        .list-content {
            flex: 1;
            .none {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #999;

                p:first-child {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                a {
                    color: #000;
                    text-decoration: underline;
                }
            }
            .li-hover {
                position: relative;
                height: 100%;
                li {
                    p {
                        &:nth-child(1) {
                            width: 5%;
                            text-align: center;
                            color: @red;
                            visibility: hidden;
                        }
                        &:nth-child(2) {
                            width: 60%;
                        }
                        &:nth-child(3) {
                            width: 20%;
                            color: #999;
                            cursor: pointer;
                        }
                        &:nth-child(4) {
                            width: 5%;
                            color: #999;
                             cursor: pointer;
                            text-align: left;
                        }
                        &:nth-child(5) {
                            width: 10%;
                            color: #666;
                        }
                    }

                    .visible {
                        visibility: visible !important;
                    }
                }
            }
        }
    }
}
</style>