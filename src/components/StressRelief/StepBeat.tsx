import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Flame, Trophy, Volume2, VolumeX, ArrowRight, Smile, Timer } from 'lucide-react';
import { ToolConfig, HitEffect, ComboTierInfo, CharacterStyleId, WeaponSlamEffect } from '../../types/game';
import { HITTING_TOOLS, COMIC_HIT_WORDS, getComboTier } from '../../constants/tools';
import { FUN_BEAT_SLOGANS } from '../../constants/stressRelief';
import { Character2D } from '../Character2D';
import { WeaponSvg } from '../WeaponSvg';
import { soundManager } from '../../utils/soundSynth';
import { useTheme } from '../../contexts/ThemeContext';

interface StepBeatProps {
  encodedName: string;
  characterStyle: CharacterStyleId;
  selectedTool: ToolConfig;
  onSelectTool: (tool: ToolConfig) => void;
  onComplete: (stats: { totalHits: number; bestCombo: number }) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const ROUND_TIME_LIMIT_SEC = 10;

export const StepBeat: React.FC<StepBeatProps> = ({
  encodedName,
  characterStyle,
  selectedTool,
  onSelectTool,
  onComplete,
  isMuted,
  onToggleMute,
}) => {
  const { theme, themeConfig } = useTheme();
  const [totalHits, setTotalHits] = useState<number>(0);
  const [currentCombo, setCurrentCombo] = useState<number>(0);
  const [bestCombo, setBestCombo] = useState<number>(0);
  const [activeEffects, setActiveEffects] = useState<HitEffect[]>([]);
  const [weaponSlams, setWeaponSlams] = useState<WeaponSlamEffect[]>([]);
  const [hitPulseKey, setHitPulseKey] = useState<number>(0);
  const [sloganIdx, setSloganIdx] = useState<number>(0);
  const [impactOffset, setImpactOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 10-second timer state
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(ROUND_TIME_LIMIT_SEC);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const comboTimerRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  const tierInfo: ComboTierInfo = getComboTier(currentCombo);

  // Auto reset combo on inactivity (1.6s window)
  const resetComboTimer = useCallback(() => {
    if (comboTimerRef.current) window.clearTimeout(comboTimerRef.current);
    comboTimerRef.current = window.setTimeout(() => {
      setCurrentCombo(0);
    }, 1600);
  }, []);

  // Countdown timer logic (10s)
  useEffect(() => {
    if (isTimerRunning && !isTimeUp) {
      const startTime = Date.now();
      const initialTime = timeLeftSec;

      timerIntervalRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const remaining = Math.max(0, initialTime - elapsed);
        setTimeLeftSec(Number(remaining.toFixed(1)));

        if (remaining <= 0) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setIsTimeUp(true);
          setIsTimerRunning(false);
          soundManager.playRewardChime();
        }
      }, 100);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, isTimeUp]);

  useEffect(() => {
    return () => {
      if (comboTimerRef.current) window.clearTimeout(comboTimerRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // ONLY Touch / Click (Spacebar removed completely)
  const handleHit = (clientX?: number, clientY?: number) => {
    if (isTimeUp) return;

    // Start 10s timer on very first hit
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const nextHits = totalHits + 1;
    const nextCombo = currentCombo + 1;
    setTotalHits(nextHits);
    setCurrentCombo(nextCombo);

    if (nextCombo > bestCombo) {
      setBestCombo(nextCombo);
    }

    resetComboTimer();
    setHitPulseKey((prev) => prev + 1);

    // Rotate slogan every 5 hits
    if (nextHits % 5 === 0) {
      setSloganIdx((prev) => (prev + 1) % FUN_BEAT_SLOGANS.length);
    }

    // Play hit sound using selected tool
    soundManager.playHitSound(selectedTool.id, tierInfo.multiplier);

    // Calculate effect positions
    let spawnX = 160;
    let spawnY = 130;

    if (clientX !== undefined && clientY !== undefined && arenaRef.current) {
      const rect = arenaRef.current.getBoundingClientRect();
      spawnX = clientX - rect.left;
      spawnY = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const offsetX = Math.max(-28, Math.min(28, (spawnX - centerX) * 0.18));
      const offsetY = Math.max(-18, Math.min(18, (spawnY - centerY) * 0.18));
      setImpactOffset({ x: offsetX, y: offsetY });
    }

    // 1. ADD WEAPON SLAM ANIMATION
    const newSlamId = `${Date.now()}-slam-${Math.random()}`;
    const newSlam: WeaponSlamEffect = {
      id: newSlamId,
      x: spawnX,
      y: spawnY,
      toolId: selectedTool.id,
    };
    setWeaponSlams((prev) => [...prev.slice(-4), newSlam]);

    window.setTimeout(() => {
      setWeaponSlams((prev) => prev.filter((s) => s.id !== newSlamId));
    }, 280);

    // 2. ADD FLOATING COMIC WORD EFFECT
    const word = COMIC_HIT_WORDS[Math.floor(Math.random() * COMIC_HIT_WORDS.length)];
    const colors =
      theme === 'dark'
        ? ['#FF2A6D', '#00E5FF', '#FFE600', '#8E44FF']
        : ['#E76F51', '#2A9D8F', '#E9C46A', '#264653'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const particles = Array.from({ length: 6 }).map((_, i) => ({
      angle: (i * 60) + Math.random() * 20,
      distance: 28 + Math.random() * 25,
      size: 4 + Math.random() * 5,
      color: chosenColor,
      shape: Math.random() > 0.5 ? 'circle' as const : 'star' as const,
    }));

    const newEffectId = `${Date.now()}-${Math.random()}`;
    const newEffect: HitEffect = {
      id: newEffectId,
      x: spawnX,
      y: spawnY,
      word,
      color: chosenColor,
      scale: 1 + Math.min(nextCombo * 0.04, 0.5),
      rotation: (Math.random() - 0.5) * 36,
      particles,
    };

    setActiveEffects((prev) => [...prev.slice(-6), newEffect]);

    window.setTimeout(() => {
      setActiveEffects((prev) => prev.filter((eff) => eff.id !== newEffectId));
    }, 450);
  };

  const handleFinish = () => {
    soundManager.playRewardChime();
    onComplete({
      totalHits,
      bestCombo,
    });
  };

  const currentSlogan = FUN_BEAT_SLOGANS[sloganIdx];
  const timeProgressPercent = Math.max(0, (timeLeftSec / ROUND_TIME_LIMIT_SEC) * 100);

  return (
    <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-5 select-none">
      {/* Top Banner: 10s Timer + Sound Toggle + Slogan */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* 10s Countdown Badge - Solid Color */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm transition-all"
            style={{
              backgroundColor: themeConfig.bgSubtle,
              borderColor: isTimeUp ? themeConfig.primary : themeConfig.secondary,
              color: isTimeUp ? themeConfig.primary : themeConfig.secondary,
            }}
          >
            <Timer className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-xs font-black tabular-nums">
              {isTimeUp
                ? 'HẾT GIỜ (10s)!'
                : isTimerRunning
                ? `Thời gian: ${timeLeftSec.toFixed(1)}s`
                : '10s (Chạm để đập)'}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-1.5 rounded-xl border transition active:scale-95 cursor-pointer shadow-sm"
            style={{
              backgroundColor: themeConfig.bgSubtle,
              borderColor: themeConfig.border,
              color: isMuted ? themeConfig.primary : themeConfig.secondary,
            }}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* 10s Time Progress Bar - Solid Color */}
        <div
          className="w-full h-2 rounded-full overflow-hidden mb-2"
          style={{ backgroundColor: themeConfig.bgSubtle }}
        >
          <div
            className="h-full transition-all duration-100"
            style={{
              width: `${timeProgressPercent}%`,
              backgroundColor: timeLeftSec <= 3 ? themeConfig.primary : themeConfig.highlight,
            }}
          />
        </div>

        {/* Slogan Card - Solid Color */}
        <div
          className="border-2 rounded-2xl p-2.5 text-center mb-2 shadow-sm"
          style={{
            backgroundColor: themeConfig.bgCard,
            borderColor: themeConfig.border,
          }}
        >
          <div
            className="text-xs font-black tracking-tight flex items-center justify-center gap-1.5"
            style={{ color: themeConfig.primary }}
          >
            <Smile className="w-3.5 h-3.5" style={{ color: themeConfig.highlight }} />
            <span>{currentSlogan.title}</span>
          </div>
          <div
            className="text-[11px] font-semibold mt-0.5 leading-relaxed"
            style={{ color: themeConfig.textMain }}
          >
            &quot;{currentSlogan.slogan}&quot;
          </div>
        </div>

        {/* Stats Grid - Solid Color Cards */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div
            className="border-2 rounded-2xl p-2 shadow-xs"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div className="text-[10px] font-black uppercase tracking-wider" style={{ color: themeConfig.textMuted }}>
              Lượt Đập
            </div>
            <div
              className="text-xl font-black tabular-nums tracking-tight"
              style={{ color: themeConfig.highlight }}
            >
              {totalHits}
            </div>
          </div>

          <div
            className="border-2 rounded-2xl p-2 shadow-xs"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div
              className="text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1"
              style={{ color: themeConfig.primary }}
            >
              <Flame className="w-3 h-3" />
              <span>Combo</span>
            </div>
            <div
              className="text-xl font-black tabular-nums tracking-tight"
              style={{ color: themeConfig.primary }}
            >
              {currentCombo}{' '}
              <span className="text-xs font-black" style={{ color: themeConfig.highlight }}>
                x{tierInfo.multiplier}
              </span>
            </div>
          </div>

          <div
            className="border-2 rounded-2xl p-2 shadow-xs"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div
              className="text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1"
              style={{ color: themeConfig.secondary }}
            >
              <Trophy className="w-3 h-3" />
              <span>Kỷ Lục</span>
            </div>
            <div
              className="text-xl font-black tabular-nums tracking-tight"
              style={{ color: themeConfig.secondary }}
            >
              {bestCombo}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Arena - Solid Flat Color, No Gradients */}
      <div
        ref={arenaRef}
        onPointerDown={(e) => handleHit(e.clientX, e.clientY)}
        className="relative my-2 w-full h-64 sm:h-72 border-3 rounded-3xl flex items-center justify-center overflow-hidden cursor-pointer select-none active:scale-[0.99] transition shadow-inner outline-none"
        style={{
          backgroundColor: themeConfig.bgChar,
          borderColor: themeConfig.border,
        }}
      >
        {/* 2D Character with reactive physics & chosen style */}
        <Character2D
          encodedName={encodedName}
          characterStyle={characterStyle}
          comboLevel={tierInfo.level}
          currentCombo={currentCombo}
          hitPulseKey={hitPulseKey}
          isCompleted={isTimeUp}
          impactOffset={impactOffset}
        />

        {/* WEAPON SLAM VISUAL EFFECT */}
        {weaponSlams.map((slam) => (
          <div
            key={slam.id}
            style={{
              position: 'absolute',
              left: slam.x,
              top: slam.y,
              zIndex: 35,
            }}
            className="animate-weapon-slam w-20 h-20 -ml-10 -mt-10 flex items-center justify-center filter drop-shadow-md"
          >
            <WeaponSvg toolId={slam.toolId} className="w-16 h-16 transform -rotate-12" />
          </div>
        ))}

        {/* Floating Comic Text Explosions */}
        {activeEffects.map((eff) => (
          <div
            key={eff.id}
            style={{
              position: 'absolute',
              left: eff.x,
              top: eff.y,
              transform: `translate(-50%, -50%) rotate(${eff.rotation}deg) scale(${eff.scale})`,
              pointerEvents: 'none',
              zIndex: 40,
            }}
            className="animate-comic-pop"
          >
            <span
              className="text-2xl sm:text-3xl font-black tracking-wider drop-shadow-md"
              style={{
                color: eff.color,
                WebkitTextStroke: theme === 'dark' ? '1.5px #0D0722' : '1.5px #FFFFFF',
              }}
            >
              {eff.word}
            </span>

            {eff.particles.map((p, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transform: `translate(${Math.cos((p.angle * Math.PI) / 180) * p.distance}px, ${
                    Math.sin((p.angle * Math.PI) / 180) * p.distance
                  }px)`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  borderRadius: p.shape === 'circle' ? '50%' : '3px',
                }}
              />
            ))}
          </div>
        ))}

        {/* Time's Up Overlay Notification - Solid Color */}
        {isTimeUp && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4 z-50 animate-scale-up text-center border-4 rounded-3xl m-2"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.primary,
            }}
          >
            <span className="text-4xl mb-1">🎉</span>
            <div
              className="text-lg font-black uppercase tracking-tight"
              style={{ color: themeConfig.primary }}
            >
              Hết 10 Giây Xả Giận!
            </div>
            <div
              className="text-xs font-bold mt-1"
              style={{ color: themeConfig.textMain }}
            >
              Bạn đã tung ra{' '}
              <span className="font-black text-sm" style={{ color: themeConfig.highlight }}>
                {totalHits} cú đập
              </span>{' '}
              hả hê tơi bời!
            </div>
            <button
              type="button"
              onClick={handleFinish}
              className="mt-3 py-2.5 px-5 rounded-2xl font-black text-xs shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer border-0"
              style={{
                backgroundColor: themeConfig.primary,
                color: '#FFFFFF',
              }}
            >
              Mở Bánh May Mắn Ngay 🥠
            </button>
          </div>
        )}

        {/* Hint Pill - Touch & Click Only */}
        {!isTimeUp && (
          <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none">
            <span
              className="px-3.5 py-1.5 rounded-full text-[11px] font-black border-2 shadow-sm"
              style={{
                backgroundColor: themeConfig.bgCard,
                color: themeConfig.primary,
                borderColor: themeConfig.border,
              }}
            >
              {!isTimerRunning
                ? '👉 Chạm vào màn hình để bắt đầu 10s đập!'
                : '👉 Chạm hoặc click chuột liên hồi để đập!'}
            </span>
          </div>
        )}
      </div>

      {/* Tool switcher and completion button */}
      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-1.5">
          {HITTING_TOOLS.slice(0, 4).map((tool) => {
            const isSelected = selectedTool.id === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => onSelectTool(tool)}
                className="p-1.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? themeConfig.bgSubtle
                    : themeConfig.bgCard,
                  borderColor: isSelected ? themeConfig.primary : themeConfig.border,
                  color: isSelected ? themeConfig.primary : themeConfig.textMuted,
                }}
              >
                <WeaponSvg toolId={tool.id} className="w-7 h-7" />
                <span className="text-[10px] font-black truncate w-full text-center">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Button CTA - Solid Color */}
        <button
          type="button"
          onClick={handleFinish}
          className="w-full mt-2 py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
          style={{
            backgroundColor: themeConfig.primary,
            color: '#FFFFFF',
          }}
        >
          <span>
            {isTimeUp
              ? 'Tiến Vào Mở Quẻ May Mắn'
              : `Đã Đủ Hả Dạ (${totalHits} Phát) • Xem Quẻ May Mắn`}
          </span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
