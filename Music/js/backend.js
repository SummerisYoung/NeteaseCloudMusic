const POST = function (url, data) {
    return new Promise((r,j) => {
       $.ajax({
            url: url + '?_=' + Date.now(),
            data,
            methods:'post',
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
const GET = function(url) {
    return new Promise((r,j) => {
        $.ajax({
             url: url,
             methods:'get',
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