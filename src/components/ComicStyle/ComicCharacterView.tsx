import React, { useMemo } from 'react';
import { CharacterStyleId, ComboLevelKey } from '../../types/game';
import { COMIC_CHARACTER_MAP } from './ComicCharacters';
import { ComicActionBalloon } from './ComicDecorations';

export interface ComicCharacterViewProps {
  encodedName: string;
  currentCombo: number;
  hitPulseKey: number;
  isCompleted: boolean;
  characterStyle?: CharacterStyleId;
  impactOffset?: { x: number; y: number };
}

/**
 * Component hiển thị nhân vật độc lập theo Phong cách Truyện Tranh Cổ Phong
 * Được đóng gói trọn vẹn, không phụ thuộc vào file ảnh bên ngoài.
 */
export const ComicCharacterView: React.FC<ComicCharacterViewProps> = ({
  encodedName,
  currentCombo,
  hitPulseKey,
  isCompleted,
  characterStyle = 'office_suit',
  impactOffset = { x: 0, y: 0 },
}) => {
  const isReacting = hitPulseKey > 0 && currentCombo > 0;
  // Bị đập tơi bời khi combo tăng hoặc vừa trúng đòn
  const isHurt = isCompleted || currentCombo >= 5 || (isReacting && currentCombo >= 2);

  // Hiệu ứng giật nảy comic physics
  const recoilStyle = useMemo(() => {
    if (!isReacting) return { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' };
    const clampX = Math.max(-22, Math.min(22, -impactOffset.x * 0.16));
    const clampY = Math.max(-18, Math.min(18, -impactOffset.y * 0.14));
    const tilt = clampX * 0.9;
    const squishX = Math.min(1.24, 1 + currentCombo * 0.007);
    const squishY = Math.max(0.76, 2 - squishX);

    return {
      transform: `translate(${clampX}px, ${clampY}px) rotate(${tilt}deg) scale(${squishX}, ${squishY})`,
      transition: 'transform 75ms cubic-bezier(0.16, 1, 0.3, 1)',
    };
  }, [hitPulseKey, isReacting, impactOffset, currentCombo]);

  const showHeadBump = currentCombo >= 10 || isCompleted;
  const showOrbitStars = currentCombo >= 18 || isCompleted;
  const showSurrenderFlag = currentCombo >= 28 || isCompleted;

  // Lấy Component SVG nhân vật theo ID
  const SvgComponent = COMIC_CHARACTER_MAP[characterStyle] || COMIC_CHARACTER_MAP.office_suit;

  // Câu khẩu hiệu comic ngẫu nhiên khi combo cao
  const actionText = useMemo(() => {
    if (currentCombo >= 35) return 'BÙM CHÁT!!!';
    if (currentCombo >= 25) return 'BÙM!!!';
    if (currentCombo >= 15) return 'BỐP!';
    if (currentCombo >= 8) return 'CHÁT!';
    return '';
  }, [currentCombo]);

  return (
    <div
      key={`comic-puppet-${hitPulseKey}-${characterStyle}`}
      style={recoilStyle}
      className="relative w-48 h-56 sm:w-56 sm:h-64 flex flex-col items-center justify-center select-none pointer-events-none will-change-transform"
    >
      {/* 1. LÁ CỜ TRUYỆN TRANH "XIN THA!" */}
      {showSurrenderFlag && (
        <div className="absolute -top-7 -left-4 z-30 animate-bounce flex items-center">
          <div className="w-1.5 h-22 bg-[#78350F] rounded-full border border-[#2D1F17]" />
          <div className="bg-white border-[2.5px] border-[#DC2626] px-2 py-0.5 rounded-lg shadow-[3px_3px_0px_#2D1F17] -ml-1 -mt-12 transform -rotate-12">
            <span className="text-[11px] font-black text-[#DC2626] tracking-wider">XIN THA!</span>
          </div>
        </div>
      )}

      {/* 2. KHẨU HIỆU HÀNH ĐỘNG TRUYỆN TRANH: BÙM!!! CHÁT! BỐP! */}
      {isReacting && actionText && (
        <div className="absolute -top-3 right-0 z-40 animate-in zoom-in-75 duration-100">
          <ComicActionBalloon text={actionText} />
        </div>
      )}

      {/* 3. CỤC U NỔ ĐOM ĐÓM LỬA TRÊN ĐẦU */}
      {showHeadBump && !showSurrenderFlag && (
        <div className="absolute top-1 right-8 z-30 animate-pulse">
          <div className="w-7 h-6 rounded-full bg-[#EF4444] border-2 border-[#7F1D1D] shadow-[2px_2px_0px_#2D1F17] relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white absolute top-1 left-1.5" />
            <span className="text-[10px] text-amber-200 font-black">💢</span>
          </div>
        </div>
      )}

      {/* 4. SAO VÀ BONG BÓNG XOAY VÒNG */}
      {showOrbitStars && (
        <div className="absolute -top-1 inset-x-0 flex justify-center z-30">
          <div className="animate-spin text-lg space-x-3">
            <span>💫</span>
            <span>⭐</span>
          </div>
        </div>
      )}

      {/* 5. KHUNG RENDER SVG NHÂN VẬT VECTOR NÉT MỰC ĐẬM */}
      <div className="relative w-40 h-44 sm:w-44 sm:h-48 flex items-center justify-center will-change-transform">
        <SvgComponent isHurt={isHurt} className="w-full h-full filter drop-shadow-[0_12px_14px_rgba(45,31,23,0.3)] transition-all duration-100" />
      </div>

      {/* 6. NAME TAG PHONG CÁCH MỘC BẢN / TRUYỆN TRANH */}
      <div className="mt-1 px-3 py-1 rounded-lg bg-[#3D2B1F] border-2 border-[#FBBF24] text-[#FDE68A] font-sans text-[11px] font-black tracking-wider shadow-[2px_2px_0px_#1C120C] max-w-[190px] truncate text-center z-20">
        {encodedName || 'TIỂU NHÂN'}
      </div>
    </div>
  );
};

