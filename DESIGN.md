# DESIGN.md — HỆ THỐNG THIẾT KẾ & TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX)
*Dự án: Đánh Tiểu Nhân — Phòng Xả Stress Online*
*2 Chế Độ Giao Diện: Tối (Dark) & Sáng (Light) — 100% Màu Đơn Sắc (Solid Colors)*

---

## 1. QUY TẮC MÀU ĐƠN SẮC & 2 CHẾ ĐỘ GIAO DIỆN

Hệ thống theme được quy chuẩn thành 2 chế độ thân thiện, quen thuộc với người dùng:
1. **Tối (Dark)**: Kế thừa phong cách Arcade Cyberpunk retro phẳng, nền tím đen sâu thẳm dịu mắt, điểm nhấn neon hồng, cyan, vàng cyber rực rỡ, thích hợp chơi ban đêm hoặc xả stress bùng nổ.
2. **Sáng (Light)**: Kế thừa phong cách Văn phòng giấy kraft ấm áp, nền kem giấy dịu nhẹ, điểm nhấn cam đất, xanh than công sở và xanh sage mint, thanh lịch và tươi sáng.

- **Nút chuyển đổi (ThemeSwitcher)**: Đặt ngay trên Header với icon Mặt Trăng 🌙 (Tối) / Mặt Trời ☀️ (Sáng) cùng nhãn **"Tối"** và **"Sáng"**, chuyển đổi tức thì 1-click hoặc qua menu lựa chọn.
- **Không dùng gradient**: 100% các thành phần (nút CTA, khung app, sân đấu, thanh thời gian, thẻ chia sẻ canvas) đều sử dụng các khối màu đơn sắc phẳng.

---

## 2. BẢNG MÃ MÀU ĐƠN SẮC

### 2.1 Chế Độ Tối (Dark) — Mặc Định

| Thành phần giao diện | Màu Đơn Sắc Áp Dụng | Mã Hex |
|---|---|---|
| **Nền App ngoài cùng** | Tím Đen Cyber | `#090516` |
| **Nền Khung Điện Thoại** | Tím Than Cockpit | `#130B2A` |
| **Nền Thẻ Card / Box** | Tím Đậm Arcade | `#1D123E` |
| **Nền Sân Đấu & Ô Nhập** | Tím Thẫm Phụ | `#261852` |
| **Nút CTA Chính** | Hồng Neon | `#FF2A6D` (chữ `#FFFFFF`) |
| **Nút Tải Ảnh / Stats** | Vàng Cyber Neon | `#FFE600` (chữ `#090516`) |
| **Nút Chia Sẻ / Kỷ Lục** | Xanh Cyan Điện Quang | `#00E5FF` (chữ `#FFFFFF`) |
| **Đường Viền (Border)** | Xanh Cyan hoặc Tím Neon | `#00E5FF` / `#3F257D` |
| **Chữ Chính** | Trắng Đơn Sắc | `#FFFFFF` |
| **Chữ Phụ** | Tím Xám | `#A296C8` |

### 2.2 Chế Độ Sáng (Light)

| Thành phần giao diện | Màu Đơn Sắc Áp Dụng | Mã Hex |
|---|---|---|
| **Nền App ngoài cùng** | Giấy Kraft Nhẹ | `#EAE5D9` |
| **Nền Khung Điện Thoại** | Kem Giấy Văn Phòng | `#F8F4E9` |
| **Nền Thẻ Card / Box** | Trắng Sạch Tinh Tế | `#FFFFFF` |
| **Nền Sân Đấu & Ô Nhập** | Kem Nhạt Bàn Làm Việc | `#EFE9DC` |
| **Nút CTA Chính** | Cam Đất Terracotta | `#E76F51` (chữ `#FFFFFF`) |
| **Nút Tải Ảnh / Stats** | Vàng Mù Tạt Ấm | `#E9C46A` (chữ `#264653`) |
| **Nút Chia Sẻ / Trạng Thái**| Xanh Sage Mint Công Sở | `#2A9D8F` (chữ `#FFFFFF`) |
| **Đường Viền (Border)** | Kẻ Giấy Văn Phòng | `#D8CFBE` |
| **Chữ Chính** | Xanh Than Đậm Đà | `#264653` |
| **Chữ Phụ** | Xám Xanh Công Sở | `#6B7F88` |

---

## 3. HỆ THỐNG ÂM THANH ĐỘC LẬP (`public/sound/`)

Toàn bộ âm thanh của 4 công cụ đập xả stress được nạp trực tiếp từ thư mục `public/sound/`:
1. `slipper.mp3` / `slipper.wav`: Dép tổ ong (tiếng "bẹp" dẹt cao su)
2. `feather_duster.mp3` / `feather_duster.wav`: Chổi lông gà (tiếng vút gió giòn tan)
3. `pan.mp3` / `pan.wav`: Chảo (tiếng kim loại "keeng" vang rền)
4. `hammer.mp3` / `hammer.wav`: Búa cao su (tiếng nảy lò xo "boing")

Người dùng chỉ cần copy đè file âm thanh mới vào `public/sound/` để cập nhật âm thanh mà không cần sửa code.
