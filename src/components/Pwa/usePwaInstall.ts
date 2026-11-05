import { useState, useEffect, useCallback } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Giữ deferredPrompt ở cấp module để không bị mất khi component re-render
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;

export const usePwaInstall = () => {
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const android = /android/.test(ua);
    const inApp = /fbav|fban|messenger|zalo|tiktok|instagram|line|threads/i.test(ua);

    setIsIos(ios);
    setIsAndroid(android);
    setIsInAppBrowser(inApp);

    // Kiểm tra xem đã mở ở chế độ Standalone (đã cài PWA vào máy) chưa
    const standaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(standaloneMode);

    // Bắt sự kiện beforeinstallprompt (Chrome / Android / Chromium / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      globalDeferredPrompt = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      globalDeferredPrompt = null;
      setCanInstall(false);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (globalDeferredPrompt) {
      setCanInstall(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!globalDeferredPrompt) {
      return false;
    }

    try {
      await globalDeferredPrompt.prompt();
      const choice = await globalDeferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        globalDeferredPrompt = null;
        setCanInstall(false);
        setIsStandalone(true);
        return true;
      }
    } catch (err) {
      console.warn('Lỗi khi kích hoạt cài đặt PWA:', err);
    }
    return false;
  }, []);

  return {
    canInstall,
    isStandalone,
    isIos,
    isAndroid,
    isInAppBrowser,
    promptInstall,
  };
};

