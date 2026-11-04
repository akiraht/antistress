import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { theme, themeConfig } = useTheme();

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center relative overflow-x-hidden p-0 sm:py-6 sm:px-4 transition-colors duration-200"
      style={{ backgroundColor: themeConfig.bgApp }}
    >
      {/* Desktop labels with solid colors */}
      <div className="fixed inset-0 pointer-events-none hidden md:block overflow-hidden">
        <div
          className="absolute top-6 left-8 flex items-center gap-2 text-[11px] font-extrabold tracking-wider select-none"
          style={{ color: themeConfig.textMuted }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: themeConfig.primary }}
          />
          <span>ĐÁNH TIỂU NHÂN • {themeConfig.name.toUpperCase()}</span>
        </div>
        <div
          className="absolute top-6 right-8 text-[11px] font-bold tracking-wider select-none"
          style={{ color: themeConfig.textMuted }}
        >
          <span>{themeConfig.description}</span>
        </div>
      </div>

      {/* Smartphone Device Frame Container - Solid Color */}
      <div
        className="w-full max-w-[480px] min-h-screen sm:min-h-[820px] sm:max-h-[920px] sm:rounded-[38px] border-0 sm:border-4 relative flex flex-col z-10 overflow-hidden transition-colors duration-200"
        style={{
          backgroundColor: themeConfig.bgFrame,
          color: themeConfig.textMain,
          borderColor: themeConfig.border,
          boxShadow:
            theme === 'dark'
              ? '0 20px 50px rgba(0, 0, 0, 0.8)'
              : '0 20px 40px rgba(38, 70, 83, 0.1)',
        }}
      >
        {/* Dynamic Island / Notch on desktop frame */}
        <div
          className="w-full pt-2 pb-1 hidden sm:flex justify-center items-center sticky top-0 z-40 select-none"
          style={{ backgroundColor: themeConfig.bgFrame }}
        >
          <div
            className="w-24 h-3.5 rounded-full flex items-center justify-between px-2.5 border"
            style={{
              backgroundColor: themeConfig.bgSubtle,
              borderColor: themeConfig.border,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: themeConfig.primary }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: themeConfig.secondary }}
            />
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 flex flex-col relative w-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
