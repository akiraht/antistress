export type ThemeId = 'dark' | 'light';

export interface ThemeColors {
  id: ThemeId;
  name: string;
  badge: string;
  description: string;
  // Bảng màu nhận diện đơn sắc
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  bgApp: string;
  bgFrame: string;
  bgCard: string;
  bgSubtle: string;
  bgChar: string;
  border: string;
  borderActive: string;
  textMain: string;
  textMuted: string;
}

export const THEMES: Record<ThemeId, ThemeColors> = {
  dark: {
    id: 'dark',
    name: 'Tối (Dark)',
    badge: '🌙 Giao diện Tối',
    description: 'Phong cách Tối neon cyber, dịu mắt, huyền ảo và bùng nổ năng lượng',
    primary: '#FF2A6D',      // Hồng neon
    secondary: '#00E5FF',    // Xanh cyan
    accent: '#8E44FF',       // Tím neon
    highlight: '#FFE600',    // Vàng cyber
    bgApp: '#090516',        // Nền ngoài cùng tím đen
    bgFrame: '#130B2A',      // Nền khung điện thoại tím than
    bgCard: '#1D123E',       // Nền các thẻ card
    bgSubtle: '#130B2A',     // Nền phụ
    bgChar: '#000000',
    border: '#3F257D',       // Viền thẻ
    borderActive: '#00E5FF', // Viền khi active
    textMain: '#FFFFFF',     // Chữ trắng sáng
    textMuted: '#A296C8',    // Chữ tím xám
  },
  light: {
    id: 'light',
    name: 'Sáng (Light)',
    badge: '☀️ Giao diện Sáng',
    description: 'Phong cách Sáng kem giấy văn phòng, ấm áp đời thường và thanh lịch',
    primary: '#E76F51',      // Cam đất
    secondary: '#2A9D8F',    // Xanh sage mint
    accent: '#264653',       // Xanh than
    highlight: '#E9C46A',    // Vàng mù tạt
    bgApp: '#EAE5D9',        // Nền ngoài kem giấy
    bgFrame: '#F8F4E9',      // Nền khung điện thoại kem sáng
    bgCard: '#FFFFFF',       // Nền thẻ card trắng
    bgSubtle: '#EFE9DC',     // Nền phụ
    bgChar: '#494949ff',
    border: '#D8CFBE',       // Viền thẻ
    borderActive: '#E76F51', // Viền khi active
    textMain: '#264653',     // Chữ xanh than
    textMuted: '#6B7F88',    // Chữ xám xanh
  },
};
