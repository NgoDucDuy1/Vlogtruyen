load('config.js');

function execute(url) {
    // Fix URL về đúng domain trong config
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    
    // Vlogtruyen thường hiển thị tất cả chương trên cùng một trang (trang detail).
    // Do đó ta chỉ cần trả về một mảng chứa URL hiện tại.
    // Nếu web có phân trang chương (VD: page=1, page=2), cần parse HTML để lấy các link đó.
    return Response.success([url]);
}