import React, { useState } from 'react';
import { Sparkles, Smile, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FortuneCookie } from '../../types/game';
import { OPTIMISTIC_FORTUNES } from '../../constants/stressRelief';
import { soundManager } from '../../utils/soundSynth';
import { useTheme } from '../../contexts/ThemeContext';

interface StepFortuneProps {
  onComplete: (fortune: FortuneCookie) => void;
}

export const StepFortune: React.FC<StepFortuneProps> = ({ onComplete }) => {
  const { themeConfig } = useTheme();
  const [isOpening, setIsOpening] = useState(false);
  const [fortune, setFortune] = useState<FortuneCookie | null>(null);

  const handleOpenCookie = () => {
    setIsOpening(true);
    soundManager.playWhooshSound();

    setTimeout(() => {
      const selected = OPTIMISTIC_FORTUNES[Math.floor(Math.random() * OPTIMISTIC_FORTUNES.length)];
      setFortune(selected);
      setIsOpening(false);
      soundManager.playRewardChime();
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-5 text-center">
      {/* Header section - Solid Colors */}
      <div className="space-y-1">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border"
          style={{
            backgroundColor: themeConfig.bgSubtle,
            borderColor: themeConfig.primary,
            color: themeConfig.primary,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>BƯỚC 3: MỞ QUẺ MAY MẮN CHỮA LÀNH</span>
        </div>
        <h2
          className="text-xl sm:text-2xl font-black tracking-[-0.03em] leading-tight"
          style={{ color: themeConfig.textMain }}
        >
          Thổi Bay Tiêu Cực<br />Nạp Lại Năng Lượng
        </h2>
        <p
          className="text-xs max-w-sm mx-auto leading-relaxed font-medium"
          style={{ color: themeConfig.textMuted }}
        >
          Đập xong rồi thì mỉm cười và đón nhận một thông điệp lạc quan, nạp lại 100% năng lượng vui tươi nhé!
        </p>
      </div>

      {/* Interactive Fortune Cookie Stage - Solid Color */}
      <div className="mb-3 mt-6 flex flex-col items-center justify-center">
        {!fortune ? (
          <div
            className="relative w-56 h-56 rounded-3xl border-3 p-4 flex flex-col items-center justify-center transition-all shadow-md"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div
              className={`text-6xl my-auto select-none cursor-pointer transition-transform duration-300 ${
                isOpening ? 'scale-125 animate-bounce' : 'hover:scale-110 active:scale-95'
              }`}
              onClick={handleOpenCookie}
            >
              🥠
            </div>
            <div
              className="text-xs font-black tracking-tight"
              style={{ color: themeConfig.highlight }}
            >
              {isOpening ? 'Đang Mở Thông Điệp...' : 'BÁNH MAY MẮN LẠC QUAN'}
            </div>
            <div
              className="text-[10px] mt-0.5 font-bold"
              style={{ color: themeConfig.textMuted }}
            >
              Chạm để nhận lời nhắn tích cực hôm nay
            </div>
          </div>
        ) : (
          <div
            className="relative w-full max-w-sm rounded-3xl border-3 p-4 sm:p-5 text-left space-y-3 animate-scale-up shadow-md"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.primary,
            }}
          >
            <div
              className="flex items-center justify-between border-b-2 pb-2.5"
              style={{ borderColor: themeConfig.border }}
            >
              <span
                className="text-xs font-black uppercase flex items-center gap-1.5"
                style={{ color: themeConfig.primary }}
              >
                <Smile className="w-4 h-4" style={{ color: themeConfig.highlight }} />
                <span>{fortune.grade}</span>
              </span>
              <span
                className="px-2.5 py-0.5 rounded-full font-black text-[10px] border"
                style={{
                  backgroundColor: themeConfig.bgSubtle,
                  borderColor: themeConfig.secondary,
                  color: themeConfig.secondary,
                }}
              >
                CHỮA LÀNH TÂM HỒN
              </span>
            </div>

            <div
              className="text-base font-black tracking-tight"
              style={{ color: themeConfig.textMain }}
            >
              {fortune.title}
            </div>

            <div
              className="rounded-2xl p-3 border-2 text-xs leading-relaxed font-semibold"
              style={{
                backgroundColor: themeConfig.bgSubtle,
                borderColor: themeConfig.border,
                color: themeConfig.textMain,
              }}
            >
              &quot;{fortune.message}&quot;
            </div>

            <div
              className="border rounded-xl p-2.5 text-[11px] leading-relaxed"
              style={{
                backgroundColor: themeConfig.bgSubtle,
                borderColor: themeConfig.secondary,
                color: themeConfig.textMain,
              }}
            >
              <span className="font-black mr-1" style={{ color: themeConfig.secondary }}>
                💡 Lời khuyên chill:
              </span>
              {fortune.advice}
            </div>

            <div className="pt-0.5">
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-black border"
                style={{
                  backgroundColor: themeConfig.bgSubtle,
                  borderColor: themeConfig.primary,
                  color: themeConfig.primary,
                }}
              >
                {fortune.tag}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action CTA - Solid Color */}
      <div className="space-y-2.5 mt-auto">
        {!fortune ? (
          <button
            type="button"
            disabled={isOpening}
            onClick={handleOpenCookie}
            className="w-full py-3.5 px-4 rounded-2xl font-black text-sm tracking-wide shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
            style={{
              backgroundColor: themeConfig.primary,
              color: '#FFFFFF',
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>{isOpening ? 'Đang Mở Ra Nụ Cười...' : 'Bẻ Bánh May Mắn • Nhận Quẻ Tươi Vui'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onComplete(fortune)}
            className="w-full py-3.5 px-4 rounded-2xl font-black text-sm tracking-wide shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
            style={{
              backgroundColor: themeConfig.secondary,
              color: '#FFFFFF',
            }}
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>Hoàn Tất Xả Stress • Khoe Thành Tích Ngay</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        )}

        <div className="text-[11px] font-semibold" style={{ color: themeConfig.textMuted }}>
          {fortune ? '✓ Năng lượng tích cực đã đầy ắp!' : ''}
        </div>
      </div>
    </div>
  );
};
