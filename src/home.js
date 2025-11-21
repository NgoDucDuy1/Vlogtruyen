function execute() {
    return Response.success([
        { 
            title: "Mới Cập Nhật", 
            input: "https://vlogtruyen58.com/tim-kiem/", 
            script: "genre.js" 
        },
        { 
            title: "Truyện Mới", 
            input: "https://vlogtruyen58.com/tim-kiem/?status=-1&sort=15", 
            script: "genre.js" 
        },
        { 
            title: "Top All", 
            input: "https://vlogtruyen58.com/tim-kiem/?status=-1&sort=10", 
            script: "genre.js" 
        },
        { 
            title: "Đã Hoàn Thành", 
            input: "https://vlogtruyen58.com/danh-sach/truyen-da-hoan-thanh/", 
            script: "genre.js" 
        }
    ]);
}