load('config.js');

function execute(url) {
    // Thay thế domain cũ/lạ bằng BASE_URL từ config
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var doc = Http.get(url).html();

    // 1. Lấy ảnh bìa (Ưu tiên data-src lazyload)
    var cover = doc.select(".image-info img").attr("data-src");
    if (!cover) cover = doc.select(".image-info img").attr("src");
    if (cover && cover.startsWith("//")) cover = "https:" + cover;

    // 2. Lấy thông tin từ danh sách (Tác giả, Tình trạng, Thể loại)
    var author = "Đang cập nhật";
    var ongoing = false;
    var genres = [];
    // Tạo chuỗi thông tin chi tiết (Tác giả + Views + Tình trạng...)
    var detailInfo = ""; 
    
    var infoList = doc.select(".list-info li");
    for (var i = 0; i < infoList.size(); i++) {
        var item = infoList.get(i);
        var text = item.text();

        // Cộng dồn thông tin vào biến detail
        detailInfo += text + "<br>";

        if (text.indexOf("Tác giả") >= 0) {
            author = item.select("a").text();
            if (!author) author = item.text().replace("Tác giả:", "").trim();
        }
        
        if (text.indexOf("Tình trạng") >= 0) {
            if (text.indexOf("Đang") >= 0) ongoing = true;
        }

        if (text.indexOf("Thể loại") >= 0) {
            var genreTags = item.select("a");
            for (var j = 0; j < genreTags.size(); j++) {
                var g = genreTags.get(j);
                genres.push({
                    title: g.text(),
                    input: g.attr("href"),
                    script: "genrecontent.js" 
                });
            }
        }
    }

    // 3. Lấy truyện đề xuất (Suggests)
    var suggests = [];
    // Ưu tiên lấy truyện cùng tác giả trước
    var suggestEls = doc.select("#comic-same-author .story-item");
    // Nếu không có thì lấy truyện mới ở sidebar
    if (suggestEls.size() === 0) {
         suggestEls = doc.select(".widget-content .list-new-stories li");
    }

    for (var i = 0; i < suggestEls.size(); i++) {
        var s = suggestEls.get(i);
        var sLink = s.select("a").first().attr("href");
        
        // Sidebar cấu trúc HTML khác main content một chút, cần check kỹ
        var sName = s.select("a").first().attr("title");
        if (!sName) sName = s.select("h3").text(); // Fallback cho sidebar
        
        var sCover = s.select("img").attr("data-src");
        if (!sCover) sCover = s.select("img").attr("src");

        if (sName && sLink) {
            suggests.push({
                title: sName,
                input: sLink,
                script: "detail.js"
            });
        }
    }

    return Response.success({
        name: doc.select(".title-commic-detail").text(),
        cover: cover,
        host: BASE_URL,
        author: author,
        description: doc.select(".desc-commic-detail").html(),
        detail: detailInfo, // Hiển thị full thông tin dòng phụ
        ongoing: ongoing,
        genres: genres,
        suggests: suggests
        // comments: Bỏ qua vì Vlogtruyen dùng Facebook Comment/Ajax khó parse bằng script thường
    });
}