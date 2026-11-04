import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AppStepId } from '../../types/game';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeSwitcher } from '../Theme/ThemeSwitcher';

interface HeaderProps {
  currentStep: AppStepId;
  isMuted: boolean;
  onToggleMute: () => void;
  onStepClick?: (step: AppStepId) => void;
}

const STEPS_NAV: { id: AppStepId; num: number; label: string }[] = [
  { id: 'setup', num: 1, label: 'Chọn Bực Bội' },
  { id: 'beat', num: 2, label: 'Xả Cơn Giận' },
  { id: 'fortune', num: 3, label: 'Quẻ May Mắn' },
];

export const Header: React.FC<HeaderProps> = ({ currentStep, isMuted, onToggleMute, onStepClick }) => {
  const { theme, themeConfig } = useTheme();
  const currentIdx = STEPS_NAV.findIndex((s) => s.id === currentStep);

  return (
    <header
      className="px-4 pt-3.5 pb-3 border-b-2 sticky top-0 z-30 backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: themeConfig.bgFrame,
        borderColor: themeConfig.border,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo icon */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md select-none border"
          >
            <img src="public/images/app.png" alt="logo" />
          </div>
          <div>
            <h1
              className="text-xs sm:text-sm font-black tracking-[-0.02em] flex items-center gap-1.5 leading-none"
              style={{ color: themeConfig.textMain }}
            >
              <span>ĐÁNH TIỂU NHÂN</span>
            </h1>
            <p
              className="text-[10px] sm:text-[11px] font-semibold mt-1 leading-none truncate max-w-[150px] sm:max-w-none"
              style={{ color: themeConfig.textMuted }}
            >
              Phòng xả stress vui vẻ • Hả hê
            </p>
          </div>
        </div>

        {/* Right Tools: Theme Switcher Button + Step Pill + Sound Toggle */}
        <div className="flex items-center gap-1.5">
          {/* Nút chọn Style Color Theme */}
          <ThemeSwitcher />

          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-1.5 rounded-xl border transition active:scale-95 cursor-pointer shadow-sm flex items-center justify-center"
            style={{
              backgroundColor: themeConfig.bgSubtle,
              borderColor: themeConfig.border,
              color: isMuted ? themeConfig.primary : themeConfig.secondary,
            }}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Progress navigation steps */}
      <nav aria-label="Tiến trình các bước" className="mt-2.5 grid grid-cols-3 gap-2">
        {STEPS_NAV.map((s, idx) => {
          const isActive = s.id === currentStep;
          const isPassed = currentIdx > idx;

          let barColor = themeConfig.border;
          let textColor = themeConfig.textMuted;
          let fontBold = 'font-bold';

          if (isActive) {
            barColor = themeConfig.primary;
            textColor = themeConfig.primary;
            fontBold = 'font-black';
          } else if (isPassed) {
            barColor = themeConfig.secondary;
            textColor = themeConfig.secondary;
          }

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onStepClick && onStepClick(s.id)}
              className="text-left group cursor-pointer"
            >
              <div
                className="h-1.5 w-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: barColor,
                  boxShadow:
                    isActive && theme === 'dark'
                      ? `0 0 8px ${themeConfig.primary}`
                      : 'none',
                }}
              />
              <div className="flex items-center justify-between mt-1">
                <span
                  className={`text-[10px] tracking-tight truncate transition-colors ${fontBold}`}
                  style={{ color: textColor }}
                >
                  {s.num}. {s.label}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
