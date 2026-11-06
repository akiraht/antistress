import { ThemeColors } from '../../types/theme';

/**
 * Cấu hình Bảng màu Phong cách Truyện Tranh Cổ Phong Trào Phúng (Comic Theme)
 * Lấy cảm hứng từ truyện tranh dân gian hài hước: Nét mực đậm, màu sắc tươi sáng ấm áp,
 * nền giấy ngà hoài niệm, tạo cảm giác như lật từng trang truyện tranh biếm họa.
 */
export const COMIC_THEME: ThemeColors = {
  id: 'comic' as any,
  name: 'Truyện Tranh (Comic)',
  badge: '🎨 Phong Cách Truyện Tranh',
  description: 'Nét vẽ hoạt hình biếm họa cổ phong, rực rỡ và hài hước',
  primary: '#E63946',       // Đỏ son comic nhiệt huyết
  secondary: '#2A9D8F',     // Xanh ngọc áo lính dân gian
  accent: '#264653',        // Xanh than mực vẽ
  highlight: '#F4A261',     // Cam đất tươi sáng
  bgApp: '#F8F1E5',         // Nền giấy tranh cổ ngà vàng ấm áp
  bgFrame: '#FFFDF9',       // Khung giấy truyện tranh sáng
  bgCard: '#FFFFFF',        // Ô tranh comic trắng sạch
  bgSubtle: '#F0E6D2',      // Nền phụ màu giấy vẽ
  bgChar: '#FAF5EA',        // Nền khung nhân vật
  border: '#3D2B1F',        // Viền mực vẽ tay đậm nét đặc trưng comic
  borderActive: '#E63946',  // Viền active đỏ son nổi bật
  textMain: '#2B1E16',      // Chữ màu mực tàu nâu đen đậm
  textMuted: '#7D6A5D',     // Chữ phụ màu mực phai
};

