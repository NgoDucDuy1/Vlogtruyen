load('config.js');

function execute(url) {
    // Thay thế domain cũ bằng domain mới trong config nếu cần
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);

    var doc = Http.get(url).html();
    
    var el = doc.select(".list-chapters li");
    var data = [];
    
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var linkEl = e.select("a");
        
        data.push({
            name: linkEl.text(),
            url: linkEl.attr("href"),
            host: BASE_URL
        });
    }

    // Vlogtruyen thường để chương mới nhất ở trên cùng
    // Đảo ngược lại danh sách để chương 1 nằm đầu tiên
    return Response.success(data.reverse());
}