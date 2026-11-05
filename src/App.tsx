import React, { useState } from 'react';
import './App.css';
import { AppStepId, PlayerProfile, StressResultData, ToolConfig, UserAccount, FortuneCookie } from './types/game';
import { HITTING_TOOLS } from './constants/tools';
import { soundManager } from './utils/soundSynth';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout components
import { MobileFrame } from './components/Layout/MobileFrame';
import { Header } from './components/Layout/Header';

// 3 Bước xả stress tinh gọn & vui nhộn (không mê tín, đúng pháp luật)
import { StepSetup } from './components/StressRelief/StepSetup';
import { StepBeat } from './components/StressRelief/StepBeat';
import { StepFortune } from './components/StressRelief/StepFortune';
import { ResultCard } from './components/StressRelief/ResultCard';

// Component Nạp VIP (đã tách riêng, tạm thời ẩn đi)
import { VipUpgradeModal } from './components/VipUpgradeModal';
// Modal cài đặt PWA đa nền tảng (Android, iOS, Desktop)
import { InstallModal } from './components/Pwa/InstallModal';
import { usePwaInstall } from './components/Pwa/usePwaInstall';

const MainApp: React.FC = () => {
  // Quản lý bước xả stress
  const [currentStep, setCurrentStep] = useState<AppStepId>('setup');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  // Hook PWA
  const { isStandalone } = usePwaInstall();

  // VIP Modal state (tách component riêng, tạm thời ẩn đi)
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

  // Chọn bảo bối xả stress (4 công cụ đầu tiên mở khóa sẵn)
  const [selectedTool, setSelectedTool] = useState<ToolConfig>(HITTING_TOOLS[0]);

  // Thông tin người chơi, style nhân vật & nỗi bực bội
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>({
    nickname: 'Chiến Thần Xả Stress',
    targetStress: 'Đồng Nghiệp Thảo Mai',
    encodedTarget: 'TN-#9981•C4B2',
    characterStyle: 'office_suit',
  });

  // Thống kê lượt đập
  const [battleStats, setBattleStats] = useState<{ totalHits: number; bestCombo: number }>({
    totalHits: 0,
    bestCombo: 0,
  });

  // Dữ liệu chứng nhận kết quả
  const [resultData, setResultData] = useState<StressResultData | null>(null);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  // Bước 1: Setup xong -> sang Bước 2 đập tơi bời
  const handleSetupSubmit = (profile: PlayerProfile) => {
    setPlayerProfile(profile);
    setCurrentStep('beat');
  };

  // Bước 2: Đập xong 10s -> sang Bước 3 mở quẻ may mắn
  const handleBeatComplete = (stats: { totalHits: number; bestCombo: number }) => {
    setBattleStats(stats);
    setCurrentStep('fortune');
  };

  // Bước 3: Mở bánh may mắn xong -> xuất bản chứng nhận & share
  const handleFortuneComplete = (fortune: FortuneCookie) => {
    const now = new Date();
    const formattedDate = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ngày ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    setResultData({
      nickname: playerProfile.nickname,
      targetStress: playerProfile.targetStress,
      encodedName: playerProfile.encodedTarget,
      characterStyle: playerProfile.characterStyle,
      toolName: selectedTool.name,
      toolId: selectedTool.id,
      totalHits: battleStats.totalHits,
      bestCombo: battleStats.bestCombo,
      fortune,
      completedAt: formattedDate,
    });
    setIsCompleted(true);
  };

  // Reset để xả bực bội khác
  const handleReset = () => {
    setIsCompleted(false);
    setCurrentStep('setup');
    setResultData(null);
  };

  return (
    <MobileFrame>
      {/* Header cố định */}
      <Header
        currentStep={currentStep}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onStepClick={(step) => !isCompleted && setCurrentStep(step)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        isStandalone={isStandalone}
      />

      {/* Nội dung chính */}
      <main className="flex-1 flex flex-col w-full">
        {isCompleted && resultData ? (
          <ResultCard data={resultData} onReset={handleReset} />
        ) : (
          <>
            {currentStep === 'setup' && (
              <StepSetup
                initialProfile={playerProfile}
                selectedTool={selectedTool}
                onSelectTool={setSelectedTool}
                onSubmit={handleSetupSubmit}
              />
            )}

            {currentStep === 'beat' && (
              <StepBeat
                encodedName={playerProfile.encodedTarget}
                characterStyle={playerProfile.characterStyle}
                selectedTool={selectedTool}
                onSelectTool={setSelectedTool}
                onComplete={handleBeatComplete}
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
              />
            )}

            {currentStep === 'fortune' && (
              <StepFortune onComplete={handleFortuneComplete} />
            )}
          </>
        )}
      </main>

      {/* Component Nạp VIP độc lập (tạm thời ẩn đi, có thể kích hoạt khi cần) */}
      <VipUpgradeModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        userAccount={userAccount}
        onActivateDemoVip={() => {
          setUserAccount({
            email: 'demo@danhtieunhan.vn',
            displayName: 'VIP Member',
            isVip: true,
            vipPlanName: 'VIP 7k/tháng',
            vipExpiresAt: null,
          });
        }}
      />

      {/* Modal cài đặt PWA (Android, iOS, Desktop) */}
      <InstallModal
        isOpen={isInstallModalOpen ? true : undefined}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </MobileFrame>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

export default App;
