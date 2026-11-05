import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, MoreVertical, ExternalLink, X, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePwaInstall } from './usePwaInstall';

interface InstallModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isBlockedByIntro?: boolean;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen: controlledIsOpen,
  onClose,
  isBlockedByIntro = false,
}) => {
  const { themeConfig } = useTheme();
  const { canInstall, isStandalone, isIos, isAndroid, isInAppBrowser, promptInstall } = usePwaInstall();
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [installSuccess, setInstallSuccess] = useState<boolean>(false);

  const isControlled = controlledIsOpen !== undefined;
  const isVisible = isControlled ? controlledIsOpen : internalOpen;

  useEffect(() => {
    // Nếu đã ở chế độ standalone (đã cài) hoặc đang mở màn hình giới thiệu văn hóa thì không tự động mở
    if (isStandalone || isBlockedByIntro) return;

    // Kiểm tra nếu đã đóng trong vòng 2 ngày
    const dismissedAt = localStorage.getItem('dtn_pwa_install_dismissed');
    const isRecentlyDismissed =
      dismissedAt && Date.now() - parseInt(dismissedAt, 10) < 2 * 24 * 60 * 60 * 1000;

    if (!isRecentlyDismissed && !isControlled) {
      // Trì hoãn 3 giây sau khi người dùng vào app
      const timer = setTimeout(() => {
        setInternalOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isStandalone, isControlled, isBlockedByIntro]);

  const handleDismiss = () => {
    if (isControlled && onClose) {
      onClose();
    } else {
      setInternalOpen(false);
      localStorage.setItem('dtn_pwa_install_dismissed', Date.now().toString());
    }
  };

  const handleNativeInstall = async () => {
    const success = await promptInstall();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        handleDismiss();
      }, 2000);
    }
  };

  if (!isVisible || isStandalone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
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
          className="absolute top-3 right-3 p-1.5 rounded-full border opacity-75 hover:opacity-100 transition cursor-pointer"
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
        <div className="flex items-center gap-3 mb-3.5">
          <img
            src="/images/app.png"
            alt="App Icon"
            className="w-12 h-12 rounded-2xl shadow-md border object-cover"
            style={{ borderColor: themeConfig.border }}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-black tracking-tight leading-tight">
                Cài Đặt Đánh Tiểu Nhân
              </h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PWA
              </span>
            </div>
            <p className="text-[11px] font-semibold opacity-80 leading-tight mt-0.5">
              Toàn màn hình • Chơi mượt mà • Không giật lag
            </p>
          </div>
        </div>

        {/* Thông báo nếu đã cài thành công */}
        {installSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-xs font-black text-emerald-300">Đã kích hoạt cài đặt thành công!</p>
            <p className="text-[11px] opacity-80">Ứng dụng đang được thêm vào màn hình chính của bạn.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Cảnh báo Trình duyệt In-App (Zalo / FB / Messenger) */}
            {isInAppBrowser && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] font-semibold text-amber-300 flex items-start gap-2">
                <ExternalLink className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                <span>
                  Bạn đang xem trong Zalo/Facebook. Hãy bấm menu <strong>(...)</strong> góc trên và chọn <strong>"Mở bằng trình duyệt" (Chrome / Safari)</strong> để cài app.
                </span>
              </div>
            )}

            {/* Nút bấm cài đặt nhanh nếu Chrome/Android hỗ trợ beforeinstallprompt */}
            {canInstall && (
              <button
                type="button"
                onClick={handleNativeInstall}
                className="w-full py-3 px-4 rounded-2xl font-black text-xs transition active:scale-95 text-white shadow-lg cursor-pointer flex items-center justify-center gap-2"
                style={{ backgroundColor: themeConfig.primary }}
              >
                <Download className="w-4 h-4" />
                CÀI ĐẶT ỨNG DỤNG NGAY
              </button>
            )}

            {/* Hướng dẫn cài đặt thủ công theo từng hệ điều hành */}
            <div
              className="rounded-2xl p-3 border space-y-2 text-xs font-semibold"
              style={{
                backgroundColor: themeConfig.bgCard,
                borderColor: themeConfig.border,
              }}
            >
              <div className="text-[11px] font-black uppercase tracking-wider opacity-70 mb-1 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                {isIos ? 'Hướng dẫn cài trên iPhone (Safari)' : 'Hướng dẫn cài trên Android (Chrome)'}
              </div>

              {isIos ? (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: themeConfig.primary }}>1</span>
                    <span className="leading-tight pt-0.5">
                      Bấm nút <strong className="inline-flex items-center gap-0.5 text-[#00E5FF]"><Share className="w-3.5 h-3.5" /> Chia sẻ</strong> ở thanh dưới Safari.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: themeConfig.secondary }}>2</span>
                    <span className="leading-tight pt-0.5">
                      Cuộn xuống chọn <strong className="inline-flex items-center gap-0.5 text-amber-300"><PlusSquare className="w-3.5 h-3.5" /> Thêm vào MH chính</strong>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-black flex-shrink-0 mt-0.5" style={{ backgroundColor: themeConfig.highlight }}>3</span>
                    <span className="leading-tight pt-0.5">
                      Bấm <strong>Thêm (Add)</strong> ở góc trên bên phải là xong!
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: themeConfig.primary }}>1</span>
                    <span className="leading-tight pt-0.5">
                      Bấm nút menu <strong className="inline-flex items-center gap-0.5 text-[#00E5FF]"><MoreVertical className="w-3.5 h-3.5" /> 3 chấm</strong> ở góc trên bên phải Chrome.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: themeConfig.secondary }}>2</span>
                    <span className="leading-tight pt-0.5">
                      Chọn dòng <strong className="inline-flex items-center gap-0.5 text-emerald-400"><Download className="w-3.5 h-3.5" /> Cài đặt ứng dụng</strong> (hoặc <strong>Thêm vào Màn hình chính</strong>).
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] text-black flex-shrink-0 mt-0.5" style={{ backgroundColor: themeConfig.highlight }}>3</span>
                    <span className="leading-tight pt-0.5">
                      Xác nhận <strong>Cài đặt</strong> để đưa icon ra màn hình điện thoại!
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Lợi ích khi cài app */}
            <div className="flex items-center justify-between text-[10px] opacity-75 font-semibold px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Dung lượng siêu nhẹ (&lt; 1MB)
              </span>
              <span>⚡ Mở nhanh như app thật</span>
            </div>

            {/* Nút đóng / trải nghiệm sau */}
            <button
              type="button"
              onClick={handleDismiss}
              className="w-full py-2 px-3 rounded-xl font-bold text-xs opacity-75 hover:opacity-100 transition cursor-pointer text-center"
            >
              Để Sau • Trải Nghiệm Tiếp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

