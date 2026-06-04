# Tích Hợp Ảnh Sản Phẩm Thực & Impeccable Style

Kế hoạch này vạch ra các bước cụ thể để tái cấu trúc lại CSS, HTML và JavaScript của dự án VASORI nhằm hỗ trợ hình ảnh sản phẩm thực tế chất lượng cao, đúng chuẩn Editorial Luxury. Đồng thời, kế hoạch cũng bao gồm lộ trình tạo và tích hợp các ảnh AI theo đúng kịch bản bạn đã cung cấp.

## User Review Required

> [!IMPORTANT]
> Việc tạo toàn bộ 22 bức ảnh 4K bằng công cụ AI tích hợp có thể mất nhiều thời gian nếu làm cùng một lúc. Do đó, tôi đề xuất quy trình 2 bước:
> **Bước 1:** Tái cấu trúc toàn bộ mã nguồn (CSS/HTML/JS) để tương thích với bố cục ảnh mới.
> **Bước 2:** Bắt đầu tạo lần lượt các ảnh ưu tiên (Cherry Banner, Cherry Product, Shine Muscat, Dâu Hàn, Kiwi, Giỏ quà Tết) bằng DALL-E/Midjourney tool và chèn vào giao diện. 
> Bạn có đồng ý với lộ trình này không?

## Open Questions

> [!WARNING]
> Công cụ render ảnh AI nội bộ của tôi lưu ảnh vào bộ nhớ tạm (artifacts). Tôi sẽ viết một script nhỏ để tự động chuyển các ảnh này vào đúng cấu trúc thư mục `/images/...` trong máy của bạn, nhưng bạn có thể cần phê duyệt (Approve) khi script chạy.

## Proposed Changes

---

### Cấu Trúc Thư Mục Mới

Tạo tự động cấu trúc thư mục để lưu trữ hình ảnh chuẩn SEO:
- `d:\DN X tech\images\banners\`
- `d:\DN X tech\images\categories\`
- `d:\DN X tech\images\products\`
- `d:\DN X tech\images\gifts\`

---

### [MODIFY] index.html (CSS Layout)

Tái cấu trúc CSS để hỗ trợ hiển thị ảnh thực tế với hiệu ứng Hover mượt mà:
1. **Category Cards (.cat-card):** Xóa emoji. Thêm lớp bọc hình ảnh chiếm 60% chiều cao phía trên, text 40% phía dưới. Thêm hiệu ứng `transform: scale(1.05)` cho ảnh khi hover.
2. **Product Cards (.product-card):** Xóa emoji trong `.product-img-wrap`. Đặt chiều cao 250px, sử dụng `object-fit: cover`. Thêm lớp phủ đen (dark overlay) xuất hiện mờ ảo khi hover.
3. **Gift Showcase (.tet-item):** Thay đổi `.tet-item-img` thành thẻ chứa ảnh với chiều cao 300px, thêm các liên kết "Xem chi tiết".

---

### [MODIFY] index.html (JavaScript Data)

Cập nhật lại cấu trúc dữ liệu mảng `fruits` và `baskets` trong Javascript:
- Loại bỏ trường `emoji`.
- Thêm trường `image` tương ứng với tên file bạn đã định nghĩa (ví dụ: `prod-shine-muscat.jpg`, `gift-vas-gq001.jpg`, v.v...).
- Sửa đổi hàm `renderProducts()` để kết xuất ra thẻ `<img>` thay vì text emoji.

---

### Tích Hợp Ảnh Banner (Hero Slider)

- Cập nhật lại HTML của Hero Slider.
- Cập nhật CSS để overlay tối phần bên trái/phải giúp chữ "Cherry Đỏ Mỹ", "Trái Cây Nhật Bản" nổi bật trên nền ảnh tối.

## Verification Plan

### Automated Tests
- Chạy thử việc kết xuất giao diện để đảm bảo không có thẻ hình ảnh nào làm vỡ Grid Layout.
- Xác minh tính năng tự động chuyển slide vẫn hoạt động đúng sau khi chèn ảnh mới.

### Manual Verification
- Bạn cần tự kiểm tra hiệu ứng Hover trên từng card xem có mượt mà và đúng chất "Luxury" chưa.
- Kiểm tra lại độ tương phản của chữ trên nền ảnh bằng mắt thường.
