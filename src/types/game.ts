export type ComboLevelKey = 'NORMAL' | 'COMBO' | 'SUPER_COMBO' | 'MEGA_COMBO' | 'ULTRA_COMBO';

export type GameStatus = 'setup' | 'playing' | 'completed';

export type AppStepId =
  | 'setup'       // Bước 1: Chọn nỗi bực bội, style & pháp khí
  | 'beat'        // Bước 2: 10 giây đập tơi bời giải tỏa năng lượng
  | 'fortune';    // Bước 3: Hóa giải áp lực & Bốc quẻ may mắn

export type CharacterStyleId =
  | 'classic_puppet'   // Hình nhân giấy dân gian
  | 'office_suit'      // Đồng nghiệp thảo mai (sơ mi cà vạt)
  | 'hipster_badboy'   // Chiến thần thị phi (kính đen, ngậm tăm)
  | 'boss_demanding'   // Trùm hứa lèo (sếp bụng bự, ria mép)
  | 'lazy_coworker'    // Thánh đùn việc (ôm gối, ngái ngủ)
  | 'toxic_ex';        // Người yêu cũ độc hại (nước mắt cá sấu, tim nứt)

export interface CharacterStyleConfig {
  id: CharacterStyleId;
  name: string;
  badge: string;
  desc: string;
  avatarEmoji: string;
}

export type ToolId =
  | 'honeycomb_slipper'
  | 'feather_duster'
  | 'frying_pan'
  | 'rubber_hammer'
  | 'fly_swatter'
  | 'baseball_bat'
  | 'durian_shell'
  | 'mech_keyboard';

export interface ToolConfig {
  id: ToolId;
  name: string;
  shortDesc: string;
  accentColor: string;
  secondaryColor: string;
  soundFreq: number;
  soundType: OscillatorType;
  isVipOnly: boolean;
}

export interface PlayerProfile {
  nickname: string;
  targetStress: string;
  encodedTarget: string;
  characterStyle: CharacterStyleId;
}

export interface ComboTierInfo {
  level: ComboLevelKey;
  label: string;
  viLabel: string;
  multiplier: number;
  minHits: number;
  nextMilestone: number | null;
  color: string;
  bgGradient: string;
  shakePx: number;
  particleCount: number;
}

export interface HitEffect {
  id: string | number;
  x: number;
  y: number;
  word: string;
  color: string;
  rotation: number;
  scale: number;
  comboLevel?: ComboLevelKey;
  particles: Array<{
    angle: number;
    distance: number;
    size: number;
    color: string;
    shape: 'star' | 'circle' | 'spark';
  }>;
}

export interface WeaponSlamEffect {
  id: string | number;
  x: number;
  y: number;
  toolId: ToolId;
}

export interface FortuneCookie {
  id: number;
  grade: string;
  title: string;
  message: string;
  advice: string;
  tag: string;
}

export interface StressResultData {
  nickname: string;
  targetStress: string;
  encodedName: string;
  characterStyle: CharacterStyleId;
  toolName: string;
  toolId: ToolId;
  totalHits: number;
  bestCombo: number;
  fortune: FortuneCookie;
  completedAt: string;
}

export interface UserAccount {
  email: string;
  displayName: string;
  isVip: boolean;
  vipPlanName: string;
  vipExpiresAt: string | null;
}
