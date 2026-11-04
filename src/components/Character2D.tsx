import React, { useMemo } from 'react';
import { ComboLevelKey, CharacterStyleId } from '../types/game';

interface Character2DProps {
  encodedName: string;
  comboLevel: ComboLevelKey;
  currentCombo: number;
  hitPulseKey: number;
  isCompleted: boolean;
  characterStyle?: CharacterStyleId;
  impactOffset?: { x: number; y: number };
}

export const Character2D: React.FC<Character2DProps> = ({
  encodedName,
  currentCombo,
  hitPulseKey,
  isCompleted,
  characterStyle = 'office_suit',
  impactOffset = { x: 0, y: 0 },
}) => {
  const isReacting = hitPulseKey > 0 && currentCombo > 0;

  // Khi bị đập liên tục (combo >= 6) hoặc khi vừa trúng đòn hoặc đã hoàn thành => Chuyển sang ảnh suit_hurt.svg
  const isHurt = isCompleted || currentCombo >= 6 || (isReacting && currentCombo >= 3);

  // Recoil physics vector khi chịu lực đập
  const recoilStyle = useMemo(() => {
    if (!isReacting) return { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' };
    const clampX = Math.max(-20, Math.min(20, -impactOffset.x * 0.15));
    const clampY = Math.max(-16, Math.min(16, -impactOffset.y * 0.12));
    const tilt = clampX * 0.85;
    const squishX = Math.min(1.22, 1 + currentCombo * 0.006);
    const squishY = Math.max(0.78, 2 - squishX);

    return {
      transform: `translate(${clampX}px, ${clampY}px) rotate(${tilt}deg) scale(${squishX}, ${squishY})`,
      transition: 'transform 80ms cubic-bezier(0.16, 1, 0.3, 1)',
    };
  }, [hitPulseKey, isReacting, impactOffset, currentCombo]);

  const showBandage = currentCombo >= 5 || isCompleted;
  const showHeadBump = currentCombo >= 12 || isCompleted;
  const showOrbitStars = currentCombo >= 20 || isCompleted;
  const showSurrenderFlag = currentCombo >= 30 || isCompleted;

  // Đường dẫn avatar theo thư mục: avt/[ten_nhan_vat]/suit.svg hoặc suit_hurt.svg
  const charKey = characterStyle || 'office_suit';
  const normalAvatarPath = `/images/avt/${charKey}/suit.svg`;
  const hurtAvatarPath = `/images/avt/${charKey}/suit_hurt.svg`;

  return (
    <div
      key={`char-puppet-${hitPulseKey}-${characterStyle}`}
      style={recoilStyle}
      className="relative w-48 h-56 sm:w-56 sm:h-64 flex flex-col items-center justify-center select-none pointer-events-none will-change-transform"
    >
      {/* 1. LÁ CỜ XIN HÀNG (Khi đạt combo 30+ hoặc hoàn tất) */}
      {showSurrenderFlag && (
        <div className="absolute -top-6 -left-3 z-30 animate-bounce flex items-center">
          <div className="w-1 h-20 bg-amber-900 rounded-full" />
          <div className="bg-white border-2 border-red-500 px-2 py-0.5 rounded shadow-md -ml-0.5 -mt-10 transform -rotate-6">
            <span className="text-[11px] font-black text-red-600">XIN THA!</span>
          </div>
        </div>
      )}

      {/* 2. CỤC U NẢY LỬA TRÊN ĐẦU (Combo 12+) */}
      {showHeadBump && (
        <div className="absolute top-2 right-8 z-30 animate-pulse">
          <div className="w-6 h-5 rounded-full bg-red-500 border-2 border-red-800 shadow-md relative">
            <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
          </div>
        </div>
      )}

      {/* 3. NGÔI SAO CHÓNG MẶT QUAY QUANH ĐẦU (Combo 20+) */}
      {showOrbitStars && (
        <div className="absolute top-0 inset-x-0 flex justify-center z-30">
          <div className="animate-spin text-lg space-x-4">
            <span>💫</span>
            <span>⭐</span>
          </div>
        </div>
      )}

      {/* 4. HÌNH ẢNH NHÂN VẬT: TỰ ĐỘNG CHUYỂN GIỮA SUIT.SVG VÀ SUIT_HURT.SVG */}
      <div className="relative w-40 h-44 sm:w-44 sm:h-48 flex items-center justify-center will-change-transform">
        <img
          key={isHurt ? `${charKey}-hurt` : `${charKey}-normal`}
          src={isHurt ? hurtAvatarPath : normalAvatarPath}
          alt={characterStyle}
          className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.4)] transition-all duration-100"
          onError={(e) => {
            // Fallback sang file gốc nếu thư mục chưa nạp kịp
            const target = e.currentTarget as HTMLImageElement;
            if (!target.src.includes('.svg')) {
              target.src = `/images/avt/${charKey}.svg`;
            }
          }}
        />

        {/* BĂNG GẠC BẦM DẬP BỔ TRỢ (Combo 5+) */}
        {showBandage && (
          <div className="absolute top-12 left-10 z-20 transform -rotate-12 animate-pulse">
            <div className="relative w-7 h-7">
              <div className="absolute inset-x-0 top-2.5 h-2.5 bg-red-400 border border-red-700 rounded-xs" />
              <div className="absolute inset-y-0 left-2.5 w-2.5 bg-red-400 border border-red-700 rounded-xs" />
            </div>
          </div>
        )}
      </div>

      {/* 5. NAME TAG ĐỐI TƯỢNG (ĐÃ MÃ HÓA) */}
      <div className="mt-1 px-3 py-1 rounded-lg bg-black/85 border-2 border-amber-400 text-amber-300 font-mono text-[11px] font-black tracking-wider shadow-md max-w-[190px] truncate text-center z-20">
        {encodedName || 'TIỂU NHÂN'}
      </div>
    </div>
  );
};
