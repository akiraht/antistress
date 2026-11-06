import React from 'react';

interface ComicBubbleProps {
  text: string;
  className?: string;
}

/**
 * Bong bóng hành động truyện tranh (Comic Action Boom Balloon)
 * Lấy cảm hứng từ chữ "BÙM!!!", "Tấn công!" trong ảnh minh họa
 */
export const ComicActionBalloon: React.FC<ComicBubbleProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative inline-block select-none pointer-events-none transform -rotate-3 ${className}`}>
      {/* Tia nổ truyện tranh hình răng cưa */}
      <div className="px-3 py-1.5 bg-[#FFB703] border-[3px] border-[#2D1F17] rounded-xl shadow-[3px_3px_0px_#2D1F17] flex items-center justify-center">
        <span className="text-xs sm:text-sm font-black tracking-wider text-[#991B1B] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] font-sans uppercase">
          {text}
        </span>
      </div>
    </div>
  );
};

/**
 * Đám mây khói hoạt hình (Comic Puff Cloud)
 */
export const ComicPuffCloud: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M20 55 C10 55 5 45 10 35 C10 25 22 20 30 25 C35 12 50 10 60 18 C70 10 85 15 88 28 C98 32 98 48 88 55 C90 65 78 72 70 68 C60 76 42 75 35 68 C28 72 18 68 20 55 Z"
      fill="#F3E8FF"
      stroke="#2D1F17"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <circle cx="35" cy="42" r="4" fill="#D8B4FE" />
    <circle cx="58" cy="38" r="6" fill="#D8B4FE" />
  </svg>
);

