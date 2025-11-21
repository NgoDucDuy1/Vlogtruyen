function execute(url, page) {
    var finalUrl = url;
    if (page) {
        if (finalUrl.indexOf("?") > -1) {
            finalUrl = finalUrl + "&page=" + page;
        } else {
            finalUrl = finalUrl + "?page=" + page;
        }
    }

    var doc = Http.get(finalUrl).html();
    var el = doc.select(".list-stories .story-item");
    
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var coverImg = e.select("img").first().attr("data-src");
        if (!coverImg) {
            coverImg = e.select("img").first().attr("src");
        }
        var description = e.select(".chapter-title").text();

        data.push({
            name: e.select(".title").text(),
            link: e.select("a").first().attr("href"),
            cover: coverImg,
            description: description,
            host: "https://vlogtruyen58.com"
        });
    }
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