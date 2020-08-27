$(async function() {
    let res = await GET('http://localhost:3000/homepage/block/page')
    let main = document.getElementById('index')
    let block = '',item = '';

    res.data.blocks.forEach(r => {
        //每个循环清空之前的item
        item = '';
        if(r.creatives != undefined) {
            //遍历
            r.creatives.forEach(i => {
                if(i.creativeType == 'list' || i.creativeType == "djprogram") {
                    item += `
                        <div class="block-item">
                            <img width="190" height="190" src="${i.uiElement.image.imageUrl}" alt="">
                            <p>${i.uiElement.mainTitle.title}</p>
                        </div>
                    `
                }else if(i.creativeType == 'SONG_LIST_HOMEPAGE'){
                    i.resources.forEach(j => {
                       item += `
                            <div class="block-item">
                                <img width="190" height="190" src="${j.uiElement.image.imageUrl}" alt="">
                                <p>${j.uiElement.mainTitle.title}</p>
                            </div>
                        ` 
                    })
                }
            })
        }else if(r.extInfo != undefined) {
            //遍历
            if(r.blockCode == "HOMEPAGE_BLOCK_MLOG") {
                r.extInfo.squareFeedViewDTOList.forEach(s => {
                  item += `
                        <div class="block-item">
                            <img width="190" height="190" src="${s.resource.mlogBaseData.coverUrl}" alt="">
                            <p class="text-ellipsis">${s.resource.mlogBaseData.text}</p>
                        </div>
                    `  
                })
            }else{
                r.extInfo.forEach(s => {
                    item += `
                        <div class="block-item">
                            <img width="190" height="190" src="${s.cover}" alt="">
                            <p>${s.title}</p>
                        </div>
                    `  
                })
            }
        }

        //填入block
        block += `
            <div class="block">
                <div class="block-header">
                    <h2>${r.uiElement.mainTitle.title}</h2>
                    <span>更多></span>
                </div>

                <div class="block-list">
                    ${item}
                </div>
            </div>
        `
        main.innerHTML = block
    });
    $('#index').niceScroll({
        cursorcolor:"#ddd",     //滚动条的颜色值
        cursorwidth:8,         //滚动条的宽度值
        autohidemode:false,      //滚动条是否是自动隐藏，默认值为 true
    })
})