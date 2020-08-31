$(function() {
    //获取用户id
    let url = window.location.href
    let id = url.substring(url.indexOf('=') + 1)
    console.log(id);
})