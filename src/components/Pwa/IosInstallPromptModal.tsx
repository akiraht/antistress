import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const IosInstallPromptModal: React.FC = () => {
  const { themeConfig } = useTheme();
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    // Chỉ hiển thị trên iOS (iPhone/iPad/iPod) và khi chưa cài đặt dưới dạng Standalone PWA
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    
    // Kiểm tra xem đã mở ở chế độ standalone (đã add to home screen) chưa
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    // Kiểm tra nếu user đã đóng thông báo trước đó trong vòng 3 ngày
    const dismissedAt = localStorage.getItem('dtn_ios_prompt_dismissed');
    const isRecentlyDismissed =
      dismissedAt && Date.now() - parseInt(dismissedAt, 10) < 3 * 24 * 60 * 60 * 1000;

    if (isIos && !isStandalone && !isRecentlyDismissed) {
      // Trì hoãn 1.5s để người dùng không bị ngợp khi vừa vào web
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('dtn_ios_prompt_dismissed', Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm rounded-3xl p-5 border-2 shadow-2xl relative animate-in slide-in-from-bottom-6 duration-300"
        style={{
          backgroundColor: themeConfig.bgFrame,
          borderColor: themeConfig.primary,
          color: themeConfig.textMain,
        }}
      >
        {/* Nút đóng */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full border opacity-75 hover:opacity-100 transition"
          style={{
            backgroundColor: themeConfig.bgSubtle,
            borderColor: themeConfig.border,
            color: themeConfig.textMuted,
          }}
          aria-label="Đóng hướng dẫn"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header modal */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src="/images/app.png"
            alt="App Icon"
            className="w-12 h-12 rounded-2xl shadow-md border"
            style={{ borderColor: themeConfig.border }}
          />
          <div>
            <h3 className="text-sm font-black tracking-tight leading-tight">
              Cài Đặt App Trên iPhone
            </h3>
            <p className="text-[11px] font-semibold opacity-75 leading-tight mt-0.5">
              Thêm vào Màn hình chính để dùng mượt hơn!
            </p>
          </div>
        </div>

        {/* Các bước hướng dẫn */}
        <div
          className="rounded-2xl p-3 border space-y-2.5 text-xs font-semibold"
          style={{
            backgroundColor: themeConfig.bgCard,
            borderColor: themeConfig.border,
          }}
        >
          <div className="flex items-start gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 text-white"
              style={{ backgroundColor: themeConfig.primary }}
            >
              1
            </div>
            <div className="leading-snug pt-0.5">
              Nhấn vào nút <strong className="inline-flex items-center gap-1 text-[#00E5FF] bg-black/40 px-1.5 py-0.5 rounded border border-white/20"><Share className="w-3.5 h-3.5" /> Chia sẻ</strong> ở thanh dưới trình duyệt Safari.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 text-white"
              style={{ backgroundColor: themeConfig.secondary }}
            >
              2
            </div>
            <div className="leading-snug pt-0.5">
              Cuộn xuống và chọn <strong className="inline-flex items-center gap-1 text-amber-300 bg-black/40 px-1.5 py-0.5 rounded border border-white/20"><PlusSquare className="w-3.5 h-3.5" /> Thêm vào MH chính</strong> (Add to Home Screen).
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0 text-white"
              style={{ backgroundColor: themeConfig.highlight, color: '#000000' }}
            >
              3
            </div>
            <div className="leading-snug pt-0.5">
              Nhấn nút <strong>Thêm (Add)</strong> ở góc trên bên phải để hoàn tất!
            </div>
          </div>
        </div>

        {/* Nút xác nhận đã hiểu */}
        <button
          type="button"
          onClick={handleDismiss}
          className="w-full mt-3.5 py-2.5 px-4 rounded-xl font-black text-xs transition active:scale-95 text-white shadow-md cursor-pointer"
          style={{ backgroundColor: themeConfig.primary }}
        >
          Đã Hiểu • Trải Nghiệm Ngay
        </button>
      </div>
    </div>
  );
};

