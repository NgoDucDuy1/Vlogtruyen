load('config.js');

function execute(key, page) {
    // Tạo URL tìm kiếm: domain/tim-kiem/?q=tukhoa
    var url = BASE_URL + "/tim-kiem/?q=" + key;
    
    // Xử lý phân trang
    if (page) {
        url += "&page=" + page;
    }

    var doc = Http.get(url).html();
    
    // Selector lấy danh sách truyện (giống genrecontent.js)
    var el = doc.select(".list-stories .story-item");
    
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        
        var coverImg = e.select("img").first().attr("data-src");
        if (!coverImg) {
            coverImg = e.select("img").first().attr("src");
        }
        
        if (coverImg && coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }

        data.push({
            name: e.select(".title").text(),
            link: e.select("a").first().attr("href"),
            cover: coverImg,
            description: e.select(".chapter-title").text(),
            host: BASE_URL
        });
    }

    // Xử lý trang tiếp theo
    var next = null;
    if (data.length > 0) {
        if (!page) {
            next = "2";
        } else {
            next = (parseInt(page) + 1).toString();
        }
    }

    return Response.success(data, next);
}