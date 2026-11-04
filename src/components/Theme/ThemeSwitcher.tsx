import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Check, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { THEMES, ThemeId } from '../../types/theme';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, themeConfig, toggleTheme } = useTheme();
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

  const themeList: ThemeId[] = ['dark', 'light'];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Nút bấm chọn style: Hiển thị Tối hoặc Sáng */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title={`Đang dùng giao diện ${theme === 'dark' ? 'Tối' : 'Sáng'}. Nhấn để đổi.`}
        className="px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        style={{
          backgroundColor: themeConfig.bgCard,
          borderColor: themeConfig.border,
          color: themeConfig.textMain,
        }}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-[#00E5FF] flex-shrink-0" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#E76F51] flex-shrink-0" />
        )}
        <span className="text-[11px] font-black">
          {theme === 'dark' ? 'Tối' : 'Sáng'}
        </span>
        {/* Chấm tròn biểu thị màu đại diện */}
        <span
          className="w-2.5 h-2.5 rounded-full border border-black/20"
          style={{ backgroundColor: themeConfig.primary }}
        />
      </button>

      {/* Dropdown Menu lựa chọn Tối / Sáng */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 rounded-2xl shadow-xl z-50 p-2 border backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
          style={{
            backgroundColor: themeConfig.bgFrame,
            borderColor: themeConfig.border,
            color: themeConfig.textMain,
          }}
        >
          <div className="flex gap-2 mt-1">
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
                  className="transition-all flex items-center justify-between cursor-pointer"
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
                    {id === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
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
