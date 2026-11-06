import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { THEMES, ThemeId } from '../../types/theme';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeList: ThemeId[] = ['comic', 'dark', 'light'];

  const getThemeIcon = (id: ThemeId) => {
    switch (id) {
      case 'comic':
        return <Palette className="w-3.5 h-3.5 text-[#E63946] flex-shrink-0" />;
      case 'dark':
        return <Moon className="w-3.5 h-3.5 text-[#00E5FF] flex-shrink-0" />;
      case 'light':
        return <Sun className="w-3.5 h-3.5 text-[#E76F51] flex-shrink-0" />;
    }
  };

  const getThemeLabel = (id: ThemeId) => {
    switch (id) {
      case 'comic':
        return 'Truyện Tranh';
      case 'dark':
        return 'Tối';
      case 'light':
        return 'Sáng';
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Nút bấm chọn style: Hiển thị Truyện Tranh / Tối / Sáng */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        style={{
          backgroundColor: themeConfig.bgCard,
          borderColor: themeConfig.border,
          color: themeConfig.textMain,
        }}
      >
        {getThemeIcon(theme)}
        {/* Chấm tròn biểu thị màu đại diện */}
        <span
          className="w-2.5 h-2.5 rounded-full border border-black/20"
          style={{ backgroundColor: themeConfig.primary }}
        />
      </button>

      {/* Dropdown Menu lựa chọn Comic / Tối / Sáng */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 rounded-2xl shadow-xl z-50 p-2 border backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 min-w-[140px]"
          style={{
            backgroundColor: themeConfig.bgFrame,
            borderColor: themeConfig.border,
            color: themeConfig.textMain,
          }}
        >
          <div className="flex gap-1.5">
            {themeList.map((id) => {
              const t = THEMES[id];
              const isSelected = theme === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setTheme(id);
                    setIsOpen(false);
                  }}
                  className="transition-all flex items-center gap-2 p-1.5 rounded-xl border cursor-pointer text-left"
                  style={{
                    backgroundColor: isSelected ? themeConfig.bgApp : 'transparent',
                    borderColor: isSelected ? t.primary : 'transparent',
                  }}
                >
                  <div
                    className="p-1.5 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: t.bgCard,
                      color: t.textMain,
                    }}
                  >
                    {getThemeIcon(id)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
