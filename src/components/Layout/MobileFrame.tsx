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
        {/* Inner Content Area */}
        <div className="flex-1 flex flex-col relative w-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
