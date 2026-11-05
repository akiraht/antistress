import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Smile, Sparkles, User, Zap, Users, ChevronDown, BookOpen } from 'lucide-react';
import { PlayerProfile, ToolConfig, CharacterStyleId } from '../../types/game';
import { STRESS_TARGET_PRESETS, CHARACTER_STYLES } from '../../constants/stressRelief';
import { HITTING_TOOLS } from '../../constants/tools';
import { WeaponSvg } from '../WeaponSvg';
import { encodeTargetName } from '../../utils/crypto';
import { useTheme } from '../../contexts/ThemeContext';

interface StepSetupProps {
  initialProfile: PlayerProfile;
  selectedTool: ToolConfig;
  onSelectTool: (tool: ToolConfig) => void;
  onSubmit: (profile: PlayerProfile) => void;
  onOpenCultureIntro?: () => void;
}

export const StepSetup: React.FC<StepSetupProps> = ({
  initialProfile,
  selectedTool,
  onSelectTool,
  onSubmit,
  onOpenCultureIntro,
}) => {
  const { theme, themeConfig } = useTheme();
  const [nickname, setNickname] = useState(initialProfile.nickname || 'Chiến Thần Xả Stress');
  const [targetStress, setTargetStress] = useState(initialProfile.targetStress || 'Đồng Nghiệp Thảo Mai');
  const [characterStyle, setCharacterStyle] = useState<CharacterStyleId>(
    initialProfile.characterStyle || 'office_suit'
  );

  const selectedStyleConfig =
    CHARACTER_STYLES.find((s) => s.id === characterStyle) || CHARACTER_STYLES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTarget = targetStress.trim() || 'Nỗi Bực Bội Giấu Tên';
    const encoded = await encodeTargetName(finalTarget);
    onSubmit({
      nickname: nickname.trim() || 'Người Bạn Vui Tính',
      targetStress: finalTarget,
      encodedTarget: encoded,
      characterStyle,
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5">
      {/* Header section with solid theme colors */}
      <div className="text-center space-y-1 mb-2">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border"
            style={{
              backgroundColor: themeConfig.bgSubtle,
              borderColor: themeConfig.primary,
              color: themeConfig.primary,
            }}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>PHÒNG XẢ STRESS • 10 GIÂY HẢ HÊ</span>
          </div>

          {onOpenCultureIntro && (
            <button
              type="button"
              onClick={onOpenCultureIntro}
              title="Tìm hiểu phong tục & cam kết lành mạnh"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border transition hover:opacity-90 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: themeConfig.bgSubtle,
                borderColor: themeConfig.border,
                color: themeConfig.secondary,
              }}
            >
              <BookOpen className="w-3 h-3" />
              <span>Văn hóa &amp; Ý nghĩa</span>
            </button>
          )}
        </div>
        <h2
          className="text-xl sm:text-2xl font-black tracking-[-0.03em] leading-tight"
          style={{ color: themeConfig.textMain }}
        >
          Hôm Nay Ai Làm Bạn Bực Bội?
        </h2>
        <p
          className="text-xs max-w-sm mx-auto leading-relaxed"
          style={{ color: themeConfig.textMuted }}
        >
          Đừng giữ ấm ức trong lòng! Chọn style chibi, vung bảo bối và đập liên hồi trong 10 giây để xả sạch stress nào!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* 1. Biệt danh người chơi */}
          <div
            className="border-2 rounded-2xl p-3.5 space-y-1.5 shadow-sm"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="player-nickname"
                className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: themeConfig.secondary }}
              >
                <User className="w-3.5 h-3.5" />
                <span>1. Biệt danh của bạn</span>
              </label>
              <span className="text-[10px] font-bold" style={{ color: themeConfig.textMuted }}>
                Ẩn danh & tự do
              </span>
            </div>
            <input
              id="player-nickname"
              type="text"
              required
              maxLength={30}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="VD: Cú Đêm Deadline, Bé Nhân Viên..."
              className="w-full px-3.5 py-2.5 rounded-xl border-2 text-xs font-bold focus:outline-none transition-colors"
              style={{
                backgroundColor: themeConfig.bgSubtle,
                borderColor: themeConfig.border,
                color: themeConfig.textMain,
              }}
            />
          </div>

          {/* 2. CHỌN DIỆN MẠO TIỂU NHÂN (CHIA 2 CỘT: DROPDOWN TRÁI, ẢNH PHẢI) */}
          <div
            className="border-2 rounded-2xl p-3.5 space-y-2 shadow-sm"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="character-style-select"
                className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: themeConfig.secondary }}
              >
                <Users className="w-3.5 h-3.5" />
                <span>2. Diện mạo tiểu nhân</span>
              </label>
            </div>

            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Cột trái: Dropdown list 6 nhân vật + mô tả */}
              <div className="col-span-7 sm:col-span-8 space-y-2">
                <div className="relative">
                  <select
                    id="character-style-select"
                    value={characterStyle}
                    onChange={(e) => setCharacterStyle(e.target.value as CharacterStyleId)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-xl border-2 text-xs font-bold focus:outline-none transition-colors cursor-pointer"
                    style={{
                      backgroundColor: themeConfig.bgSubtle,
                      borderColor: themeConfig.border,
                      color: themeConfig.textMain,
                    }}
                  >
                    {CHARACTER_STYLES.map((st) => (
                      <option
                        key={st.id}
                        value={st.id}
                        style={{
                          backgroundColor: themeConfig.bgCard,
                          color: themeConfig.textMain,
                        }}
                      >
                        {st.avatarEmoji} {st.name} ({st.badge})
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: themeConfig.secondary }}
                  />
                </div>

                <div
                  className="p-2.5 rounded-xl border"
                  style={{
                    backgroundColor: themeConfig.bgSubtle,
                    borderColor: themeConfig.border,
                  }}
                >
                  <div
                    className="text-[11px] font-bold leading-snug"
                    style={{ color: themeConfig.secondary }}
                  >
                    {selectedStyleConfig.desc}
                  </div>
                </div>
              </div>

              {/* Cột phải: Hình ảnh tiểu nhân chibi */}
              <div className="col-span-5 sm:col-span-4 flex flex-col items-center justify-center">
                <div
                  className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl border-2 p-1.5 flex items-center justify-center relative group overflow-hidden"
                  style={{
                    backgroundColor: themeConfig.bgSubtle,
                    borderColor: themeConfig.border,
                  }}
                >
                  <img
                    src={`/images/avt/${characterStyle}/suit.svg`}
                    alt={selectedStyleConfig.name}
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `/images/avt/${characterStyle}.svg`;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. NỖI BỰC BỘI CẦN XẢ */}
          <div
            className="border-2 rounded-2xl p-3.5 space-y-2 shadow-sm"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="target-stress-input"
                className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: themeConfig.secondary }}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>3. Nỗi bực bội cần xả</span>
              </label>
              <span
                className="text-[10px] font-bold flex items-center gap-1"
                style={{ color: themeConfig.primary }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Mã hóa an toàn
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Cột trái: Input nhập tên + Ghi chú mã hóa */}
              <div className="space-y-1">
                <input
                  id="target-stress-input"
                  type="text"
                  required
                  maxLength={40}
                  value={targetStress}
                  onChange={(e) => setTargetStress(e.target.value)}
                  placeholder="Nhập tên đối tượng bực bội..."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 text-xs font-bold focus:outline-none transition-colors"
                  style={{
                    backgroundColor: themeConfig.bgSubtle,
                    borderColor: themeConfig.border,
                    color: themeConfig.textMain,
                  }}
                />
                <p
                  className="text-[10px] italic font-semibold leading-tight pt-0.5"
                  style={{ color: themeConfig.textMuted }}
                >
                  *Tên sẽ được mã hóa nhiều lớp để khi share sẽ không hiện tên thật nhân vật
                </p>
              </div>

              {/* Cột phải: Dropdown list 16 gợi ý nhanh */}
              <div>
                <div className="relative">
                  <select
                    id="stress-preset-select"
                    value={targetStress}
                    onChange={(e) => setTargetStress(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-xl border-2 text-xs font-bold focus:outline-none transition-colors cursor-pointer"
                    style={{
                      backgroundColor: themeConfig.bgSubtle,
                      borderColor: themeConfig.border,
                      color: themeConfig.textMain,
                    }}
                  >
                    <option value="" disabled>
                      -- Chọn nhanh 1 trong 16 nỗi niềm --
                    </option>
                    {STRESS_TARGET_PRESETS.map((preset, idx) => (
                      <option
                        key={preset}
                        value={preset}
                        style={{
                          backgroundColor: themeConfig.bgCard,
                          color: themeConfig.textMain,
                        }}
                      >
                        {idx + 1}. {preset}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: themeConfig.primary }}
                  />
                </div>
                <div
                  className="text-[10px] mt-1 font-medium"
                  style={{ color: themeConfig.textMuted }}
                >
                  💡 Chọn từ 16 gợi ý phổ biến hoặc tự gõ vào ô bên trái
                </div>
              </div>
            </div>
          </div>

          {/* 4. Weapon selection (4 tools unlocked) */}
          <div
            className="border-2 rounded-2xl p-3.5 space-y-2 shadow-sm"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div
              className="text-xs font-extrabold uppercase tracking-wider flex justify-between items-center"
              style={{ color: themeConfig.secondary }}
            >
              <span>4. Chọn pháp khí đập</span>
              <span className="font-black" style={{ color: themeConfig.highlight }}>
                {selectedTool.name}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {HITTING_TOOLS.slice(0, 4).map((tool) => {
                const isSelected = selectedTool.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => onSelectTool(tool)}
                    className="p-2 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected
                        ? themeConfig.bgSubtle
                        : themeConfig.bgCard,
                      borderColor: isSelected ? themeConfig.primary : themeConfig.border,
                      color: isSelected ? themeConfig.primary : themeConfig.textMuted,
                    }}
                  >
                    <WeaponSvg toolId={tool.id} className="w-8 h-8" />
                    <span className="text-[10px] font-black truncate w-full text-center">
                      {tool.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button CTA - Solid Color */}
        <button
          type="submit"
          className="w-full mt-2 py-3.5 px-4 rounded-2xl font-black text-sm tracking-wide shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
          style={{
            backgroundColor: themeConfig.primary,
            color: '#FFFFFF',
          }}
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span>Bắt Đầu 10 Giây Đập Tơi Bời!</span>
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
};
