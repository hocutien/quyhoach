# Quy hoạch Duyên Hải – Trà Vinh cũ

Trang theo dõi kho văn bản quy hoạch trên Google Drive (`QUY HOACH`):

- **Sơ đồ**: quan hệ giữa các dự án, bấm ô để xem văn bản, kéo ô để đổi vị trí, thêm/xóa quan hệ.
- **Mục lục**: toàn bộ văn bản, tìm theo tên, số hiệu, lọc theo nhóm và nhãn.
- **Tải lên & duyệt**: kéo thả file → lên `_TIN MOI/Chờ duyệt` → Gemini đề xuất tên, thư mục, dự án liên quan → bấm **Duyệt** để đổi tên, đánh STT theo ngày ban hành, chuyển vào thư mục và chép bản sao.

Dữ liệu không nằm trong repo: trang gọi Web App Apps Script (thư mục `apps-script/`) bằng mã khóa riêng.

## Cài phần Apps Script (một lần)

1. script.google.com → mở dự án **So do quan he QH** (hoặc tạo mới).
2. Dán 3 file trong `apps-script/`: `Code.gs`, `Api.gs` (tạo tệp kịch bản mới tên `Api`), `SoDo.html` (tệp HTML tên `SoDo`).
3. ⚙ **Cài đặt dự án** → **Thuộc tính tập lệnh** → thêm:
   - `MA_KHOA`: mã khóa tự đặt (dài, khó đoán)
   - `GEMINI_KEY`: API key Gemini (aistudio.google.com)
   - (tùy chọn) `GEMINI_MODEL`, mặc định `gemini-2.5-flash`
4. Chọn hàm `caiDat` → **Chạy** → cấp quyền. Hàm này quét Drive lần đầu và đặt lịch quét mỗi giờ.
5. **Triển khai** → **Triển khai mới** → Ứng dụng web → *Thực thi với tư cách*: **Tôi**; *Ai có quyền truy cập*: **Bất kỳ ai** → chép địa chỉ `/exec`.
   (Bất kỳ ai mở được địa chỉ, nhưng không có mã khóa thì không đọc/ghi được gì.)
6. Mở trang GitHub → **Cài đặt** → dán địa chỉ `/exec` và mã khóa.

Khi sửa code Apps Script: **Triển khai** → **Quản lý bản triển khai** → ✏ → *Phiên bản*: **Mới** → Triển khai (giữ nguyên địa chỉ).
