import { ToolConfig, ComboTierInfo, ComboLevelKey } from '../types/game';

// 4 công cụ đầu tiên đã được mở khóa mặc định (Free). 4 công cụ sau dành cho VIP
export const HITTING_TOOLS: ToolConfig[] = [
  {
    id: 'honeycomb_slipper',
    name: 'Dép tổ ong',
    shortDesc: 'Mặc định • Tiếng đập bẹp bẹp giòn tan huyền thoại',
    accentColor: '#FACC15',
    secondaryColor: '#CA8A04',
    soundFreq: 280,
    soundType: 'triangle',
    isVipOnly: false,
  },
  {
    id: 'feather_duster',
    name: 'Chổi lông gà',
    shortDesc: 'Mặc định • Vung vút xé gió quất chát chúa',
    accentColor: '#F97316',
    secondaryColor: '#9A3412',
    soundFreq: 850,
    soundType: 'sawtooth',
    isVipOnly: false,
  },
  {
    id: 'frying_pan',
    name: 'Chảo',
    shortDesc: 'Mặc định • Tiếng kim loại BOOONG vang rền trời đất',
    accentColor: '#38BDF8',
    secondaryColor: '#0284C7',
    soundFreq: 440,
    soundType: 'sine',
    isVipOnly: false,
  },
  {
    id: 'rubber_hammer',
    name: 'Búa cao su',
    shortDesc: 'Mặc định • Đập phát nào thùm thụp nảy tưng phát đó',
    accentColor: '#FB7185',
    secondaryColor: '#E11D48',
    soundFreq: 110,
    soundType: 'square',
    isVipOnly: false,
  },
  {
    id: 'fly_swatter',
    name: 'Vỉ đập ruồi',
    shortDesc: 'VIP 7k • Chuyên trị lời thị phi vo ve',
    accentColor: '#34D399',
    secondaryColor: '#059669',
    soundFreq: 600,
    soundType: 'sawtooth',
    isVipOnly: true,
  },
  {
    id: 'baseball_bat',
    name: 'Gậy bóng chày',
    shortDesc: 'VIP 7k • Cú vung tiễn thẳng lên cung trăng',
    accentColor: '#A78BFA',
    secondaryColor: '#7C3AED',
    soundFreq: 260,
    soundType: 'triangle',
    isVipOnly: true,
  },
  {
    id: 'durian_shell',
    name: 'Vỏ sầu riêng',
    shortDesc: 'VIP 7k • Gai nhọn tối thượng cực kỳ thấm thía',
    accentColor: '#84CC16',
    secondaryColor: '#4D7C0F',
    soundFreq: 350,
    soundType: 'sawtooth',
    isVipOnly: true,
  },
  {
    id: 'mech_keyboard',
    name: 'Bàn phím cơ RGB',
    shortDesc: 'VIP 7k • Gõ Blue Switch đanh thép đau điếng',
    accentColor: '#EC4899',
    secondaryColor: '#BE185D',
    soundFreq: 480,
    soundType: 'square',
    isVipOnly: true,
  },
];

export const COMIC_HIT_WORDS = [
  'BỐP!',
  'CHÁT!',
  'BÙM!',
  'ÁI DA!',
  'BẸP!',
  'XOẢNG!',
  'UỲNH!',
  'CHỪA NÈ!',
];

export function getComboTier(combo: number): ComboTierInfo {
  if (combo >= 30) {
    return {
      level: 'ULTRA_COMBO',
      label: 'ULTRA COMBO',
      viLabel: 'SIÊU CẤP HỦY DIỆT',
      multiplier: 5,
      minHits: 30,
      nextMilestone: null,
      color: '#F43F5E',
      bgGradient: 'from-rose-500 via-fuchsia-600 to-amber-500',
      shakePx: 14,
      particleCount: 16,
    };
  }
  if (combo >= 20) {
    return {
      level: 'MEGA_COMBO',
      label: 'MEGA COMBO',
      viLabel: 'Đòn Đánh Bão Táp',
      multiplier: 4,
      minHits: 20,
      nextMilestone: 30,
      color: '#A855F7',
      bgGradient: 'from-purple-600 via-pink-500 to-amber-400',
      shakePx: 10,
      particleCount: 12,
    };
  }
  if (combo >= 10) {
    return {
      level: 'SUPER_COMBO',
      label: 'SUPER COMBO',
      viLabel: 'Liên Hoàn Cước',
      multiplier: 3,
      minHits: 10,
      nextMilestone: 20,
      color: '#F97316',
      bgGradient: 'from-orange-500 via-amber-500 to-yellow-400',
      shakePx: 7,
      particleCount: 9,
    };
  }
  if (combo >= 5) {
    return {
      level: 'COMBO',
      label: 'COMBO',
      viLabel: 'Đang Vào Đà',
      multiplier: 2,
      minHits: 5,
      nextMilestone: 10,
      color: '#EAB308',
      bgGradient: 'from-yellow-400 to-amber-500',
      shakePx: 4,
      particleCount: 6,
    };
  }
  return {
    level: 'NORMAL',
    label: 'NORMAL',
    viLabel: 'Khởi Động',
    multiplier: 1,
    minHits: 0,
    nextMilestone: 5,
    color: '#38BDF8',
    bgGradient: 'from-sky-400 to-blue-500',
    shakePx: 2,
    particleCount: 4,
  };
}
