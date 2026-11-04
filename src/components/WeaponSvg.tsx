import React from 'react';
import { ToolId } from '../types/game';

interface WeaponSvgProps {
  toolId: ToolId;
  className?: string;
}

export const WeaponSvg: React.FC<WeaponSvgProps> = ({ toolId, className = 'w-10 h-10' }) => {
  switch (toolId) {
    case 'honeycomb_slipper':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="52" rx="26" ry="42" fill="#EAB308" stroke="#78350F" strokeWidth="4" />
          <path d="M28 50 C28 25 72 25 72 50 C72 65 28 65 28 50 Z" fill="#CA8A04" opacity="0.4" />
          <path d="M26 42 C40 30 60 30 74 42" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          {[
            [40, 32], [50, 30], [60, 32],
            [35, 45], [45, 43], [55, 43], [65, 45],
            [36, 58], [46, 56], [54, 56], [64, 58],
            [40, 70], [50, 68], [60, 70],
            [45, 80], [55, 80]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.8" fill="#78350F" />
          ))}
        </svg>
      );
    case 'feather_duster':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <line x1="78" y1="82" x2="38" y2="42" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="32" cy="36" rx="16" ry="24" transform="rotate(-45 32 36)" fill="#EA580C" />
          <ellipse cx="26" cy="30" rx="13" ry="20" transform="rotate(-35 26 30)" fill="#F97316" />
          <ellipse cx="38" cy="42" rx="14" ry="22" transform="rotate(-55 38 42)" fill="#FBBF24" />
          <path d="M18 20 Q 30 15 42 28" stroke="#FEF08A" strokeWidth="3" fill="none" />
        </svg>
      );
    case 'frying_pan':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <line x1="68" y1="72" x2="88" y2="92" stroke="#0F172A" strokeWidth="9" strokeLinecap="round" />
          <line x1="68" y1="72" x2="88" y2="92" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <circle cx="44" cy="48" r="28" fill="#1E293B" stroke="#0F172A" strokeWidth="5" />
          <circle cx="44" cy="48" r="22" fill="#334155" />
          <ellipse cx="44" cy="44" rx="16" ry="10" fill="#475569" opacity="0.6" />
        </svg>
      );
    case 'rubber_hammer':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <line x1="65" y1="70" x2="85" y2="90" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <rect x="24" y="24" width="38" height="24" rx="6" transform="rotate(-45 43 36)" fill="#E11D48" stroke="#881337" strokeWidth="4" />
          <ellipse cx="30" cy="23" rx="7" ry="12" transform="rotate(-45 30 23)" fill="#FB7185" />
        </svg>
      );
    case 'fly_swatter':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <line x1="65" y1="75" x2="85" y2="95" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
          <rect x="25" y="20" width="36" height="42" rx="6" fill="#10B981" stroke="#064E3B" strokeWidth="3" />
          <line x1="30" y1="20" x2="30" y2="62" stroke="#064E3B" strokeWidth="1.5" />
          <line x1="43" y1="20" x2="43" y2="62" stroke="#064E3B" strokeWidth="1.5" />
          <line x1="56" y1="20" x2="56" y2="62" stroke="#064E3B" strokeWidth="1.5" />
          <line x1="25" y1="34" x2="61" y2="34" stroke="#064E3B" strokeWidth="1.5" />
          <line x1="25" y1="48" x2="61" y2="48" stroke="#064E3B" strokeWidth="1.5" />
        </svg>
      );
    case 'baseball_bat':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <line x1="82" y1="84" x2="22" y2="24" stroke="#B45309" strokeWidth="11" strokeLinecap="round" />
          <line x1="82" y1="84" x2="68" y2="70" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
          <line x1="75" y1="77" x2="73" y2="75" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'durian_shell':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <ellipse cx="50" cy="54" rx="30" ry="36" fill="#65A30D" stroke="#365314" strokeWidth="4" />
          <path d="M50 18 L50 26" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          <polygon points="50,26 44,38 56,38" fill="#4D7C0F" />
          <polygon points="32,44 22,50 34,56" fill="#4D7C0F" />
          <polygon points="68,44 78,50 66,56" fill="#4D7C0F" />
          <polygon points="50,76 44,88 56,88" fill="#4D7C0F" />
        </svg>
      );
    case 'mech_keyboard':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect x="18" y="28" width="64" height="44" rx="8" fill="#1E1B4B" stroke="#4338CA" strokeWidth="3" />
          <rect x="23" y="34" width="10" height="8" rx="2" fill="#EC4899" />
          <rect x="36" y="34" width="10" height="8" rx="2" fill="#8B5CF6" />
          <rect x="49" y="34" width="10" height="8" rx="2" fill="#3B82F6" />
          <rect x="62" y="34" width="14" height="8" rx="2" fill="#10B981" />
          <rect x="23" y="46" width="12" height="8" rx="2" fill="#F59E0B" />
          <rect x="38" y="46" width="24" height="8" rx="2" fill="#EC4899" />
          <rect x="65" y="46" width="11" height="8" rx="2" fill="#6366F1" />
        </svg>
      );
    default:
      return null;
  }
};

