import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId, ThemeColors, THEMES } from '../types/theme';

interface ThemeContextType {
  theme: ThemeId;
  themeConfig: ThemeColors;
  setTheme: (theme: ThemeId) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'dtn_app_theme';
const DEFAULT_THEME: ThemeId = 'dark';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'crazy_arcade') {
          return 'dark';
        }
        if (saved === 'light' || saved === 'sarcastic_office') {
          return 'light';
        }
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_THEME;
  });

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // Safe catch
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme: ThemeId = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  // Cập nhật attribute data-theme trên html và body
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const value = {
    theme,
    themeConfig: THEMES[theme],
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
