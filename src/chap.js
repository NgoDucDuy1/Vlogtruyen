load('config.js');

function execute(url) {
    // Thay thế domain cũ/lạ bằng BASE_URL từ config để tránh lỗi
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var doc = Http.get(url).html();
    
    // Selector chứa ảnh truyện của Vlogtruyen
    var el = doc.select(".content-img img");
    
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        
        // Ưu tiên lấy data-src vì Vlogtruyen dùng lazyload
        var img = e.attr("data-src");
        if (!img) {
            img = e.attr("src");
        }
        
        if (img) {
            // Xử lý nếu ảnh bắt đầu bằng // (thiếu https:)
            if (img.startsWith("//")) {
                img = "https:" + img;
            }
            data.push(img);
        }
    }
    
    return Response.success(data);
}