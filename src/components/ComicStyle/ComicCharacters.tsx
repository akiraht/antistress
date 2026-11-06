import React from 'react';
import { CharacterStyleId } from '../../types/game';

interface ComicSvgProps {
  isHurt?: boolean;
  className?: string;
}

/**
 * 1. classic_puppet: Hình Nhân Bùa Chú Dân Gian (Folk Talisman Puppet)
 * Phong cách truyện tranh: Nét mực đậm, má bánh bao phúng phính, mắt tròn xoe ngộ nghĩnh
 */
export const ComicFolkPuppetSvg: React.FC<ComicSvgProps> = ({ isHurt = false, className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bóng đổ comic */}
    <ellipse cx="100" cy="225" rx="55" ry="10" fill="#2E1C12" opacity="0.25" />

    {/* Thân hình nhân vải thô vàng rơm viền mực đậm */}
    <path
      d="M62 110 C50 155 52 195 62 215 L138 215 C148 195 150 155 138 110 Z"
      fill="#FDE68A"
      stroke="#2D1F17"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    {/* Áo yếm đỏ dân gian viền vàng */}
    <path
      d="M72 115 Q100 135 128 115 L134 185 Q100 195 66 185 Z"
      fill="#EF4444"
      stroke="#2D1F17"
      strokeWidth="3.5"
    />
    {/* Họa tiết đồng tiền cổ giữa ngực */}
    <circle cx="100" cy="150" r="14" fill="#FBBF24" stroke="#2D1F17" strokeWidth="2.5" />
    <rect x="94" y="144" width="12" height="12" fill="#EF4444" stroke="#2D1F17" strokeWidth="2" />

    {/* Tay hình nhân */}
    <path d="M62 125 C35 140 32 170 48 185" stroke="#2D1F17" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M138 125 C165 140 168 170 152 185" stroke="#2D1F17" strokeWidth="8" strokeLinecap="round" fill="none" />

    {/* Đầu tròn xoe má phúng phính */}
    <circle cx="100" cy="72" r="44" fill="#FEF08A" stroke="#2D1F17" strokeWidth="4.5" />

    {/* Hai búi tóc củ tỏi ngộ nghĩnh hai bên */}
    <circle cx="58" cy="40" r="15" fill="#2D1F17" />
    <circle cx="142" cy="40" r="15" fill="#2D1F17" />
    <path d="M58 48 C72 32 128 32 142 48" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />

    {/* Má hồng bánh bao */}
    <ellipse cx="74" cy="84" rx="10" ry="7" fill={isHurt ? '#DC2626' : '#F87171'} opacity="0.75" />
    <ellipse cx="126" cy="84" rx="10" ry="7" fill={isHurt ? '#DC2626' : '#F87171'} opacity="0.75" />

    {!isHurt ? (
      <>
        {/* Mắt to tròn long lanh ngơ ngác */}
        <ellipse cx="82" cy="68" rx="8" ry="10" fill="#FFFFFF" stroke="#2D1F17" strokeWidth="3" />
        <circle cx="84" cy="67" r="4.5" fill="#2D1F17" />
        <circle cx="86" cy="65" r="1.5" fill="#FFFFFF" />

        <ellipse cx="118" cy="68" rx="8" ry="10" fill="#FFFFFF" stroke="#2D1F17" strokeWidth="3" />
        <circle cx="116" cy="67" r="4.5" fill="#2D1F17" />
        <circle cx="118" cy="65" r="1.5" fill="#FFFFFF" />

        {/* Lông mày dấu ngã tò mò */}
        <path d="M74 54 Q84 50 90 56" stroke="#2D1F17" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M126 54 Q116 50 110 56" stroke="#2D1F17" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Miệng cười toe toét ngây thơ */}
        <path d="M90 88 Q100 102 110 88" stroke="#2D1F17" strokeWidth="3.5" strokeLinecap="round" fill="#EF4444" />
      </>
    ) : (
      <>
        {/* Mắt chữ X bầm dập */}
        <line x1="74" y1="62" x2="90" y2="76" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
        <line x1="90" y1="62" x2="74" y2="76" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />

        <line x1="110" y1="62" x2="126" y2="76" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
        <line x1="126" y1="62" x2="110" y2="76" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />

        {/* Miệng mếu há hốc răng sứt */}
        <path d="M86 92 Q100 116 114 92 Z" fill="#7F1D1D" stroke="#2D1F17" strokeWidth="3" />
        <rect x="94" y="93" width="4" height="4" fill="#FFFFFF" />

        {/* Giọt nước mắt truyện tranh bắn tung */}
        <path d="M64 74 C58 72 55 64 62 60 C68 64 68 70 64 74 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        <path d="M136 74 C142 72 145 64 138 60 C132 64 132 70 136 74 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      </>
    )}
  </svg>
);

/**
 * 2. office_suit: Quan Huyện Hách Dịch (Arrogant Mandarin / Thảo Mai Tranh Công)
 * Đặc trưng: Mũ cánh chuồn, ria mép vểnh, mặt tròn xoe hợm hĩnh
 */
export const ComicMandarinSvg: React.FC<ComicSvgProps> = ({ isHurt = false, className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="100" cy="225" rx="55" ry="10" fill="#2E1C12" opacity="0.25" />

    {/* Áo gấm xanh lục viền vàng hoàng gia */}
    <path
      d="M58 115 C48 160 52 195 62 215 L138 215 C148 195 152 160 142 115 Z"
      fill="#10B981"
      stroke="#2D1F17"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    {/* Đai quan to bản màu đỏ & vàng */}
    <rect x="62" y="160" width="76" height="16" fill="#EF4444" stroke="#2D1F17" strokeWidth="3" rx="3" />
    <circle cx="100" cy="168" r="6" fill="#FBBF24" stroke="#2D1F17" strokeWidth="2" />

    {/* Cổ áo giao lĩnh màu cam */}
    <polygon points="80,115 100,140 120,115 108,115 100,128 92,115" fill="#F97316" stroke="#2D1F17" strokeWidth="3" />

    {/* Đầu tròn mập mạp */}
    <circle cx="100" cy="74" r="42" fill="#FED7AA" stroke="#2D1F17" strokeWidth="4.5" />

    {/* MŨ QUAN CÁNH CHUỒN ĐẶC TRƯNG TRUYỆN TRANH DÂN GIAN */}
    <path d="M72 48 C72 30 128 30 128 48 Z" fill="#1E293B" stroke="#2D1F17" strokeWidth="3.5" />
    {/* Cánh chuồn bên trái */}
    <path
      d={isHurt ? "M72 42 C50 48 30 58 24 72" : "M72 42 C45 36 25 45 20 48 C25 55 45 48 72 46"}
      fill="#1E293B"
      stroke="#2D1F17"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Cánh chuồn bên phải */}
    <path
      d={isHurt ? "M128 42 C150 36 170 30 176 18" : "M128 42 C155 36 175 45 180 48 C175 55 155 48 128 46"}
      fill="#1E293B"
      stroke="#2D1F17"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {!isHurt ? (
      <>
        {/* Mắt một mí liếc xéo nham hiểm */}
        <path d="M78 68 Q88 62 94 70" stroke="#2D1F17" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="86" cy="69" r="2.5" fill="#2D1F17" />

        <path d="M122 68 Q112 62 106 70" stroke="#2D1F17" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="114" cy="69" r="2.5" fill="#2D1F17" />

        {/* Lông mày sâu róm hếch ngược */}
        <path d="M74 58 L92 62" stroke="#2D1F17" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M126 58 L108 62" stroke="#2D1F17" strokeWidth="4.5" strokeLinecap="round" />

        {/* RIA MÉP CON KIẾN VỂNH CAO HÀI HƯỚC */}
        <path d="M100 84 Q82 82 74 76 Q84 88 100 86 Q116 88 126 76 Q118 82 100 84 Z" fill="#2D1F17" />

        {/* Miệng cười khẩy hống hách */}
        <path d="M92 94 Q100 100 108 94" stroke="#2D1F17" strokeWidth="3" strokeLinecap="round" fill="none" />
      </>
    ) : (
      <>
        {/* Cục u nảy lửa trên đầu */}
        <ellipse cx="120" cy="34" rx="12" ry="8" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
        <path d="M120 24 L124 16 L128 22" stroke="#F59E0B" strokeWidth="2" fill="none" />

        {/* Mắt xoay mòng mòng chóng mặt */}
        <path d="M86 68 A 6 6 0 1 0 86 64 A 3 3 0 1 0 86 66" stroke="#2D1F17" strokeWidth="3" fill="none" />
        <path d="M114 68 A 6 6 0 1 0 114 64 A 3 3 0 1 0 114 66" stroke="#2D1F17" strokeWidth="3" fill="none" />

        {/* Má sưng vù tím tái */}
        <ellipse cx="74" cy="85" rx="14" ry="10" fill="#A855F7" opacity="0.65" />

        {/* Ria mép rũ rượi cháy khét */}
        <path d="M100 84 Q82 92 76 98 M100 84 Q118 92 124 98" stroke="#2D1F17" strokeWidth="3.5" strokeLinecap="round" />

        {/* Miệng há to méo mó khóc thét */}
        <path d="M88 94 Q100 118 112 94 Z" fill="#991B1B" stroke="#2D1F17" strokeWidth="3" />
        <rect x="96" y="95" width="5" height="5" fill="#FFFFFF" />
      </>
    )}
  </svg>
);

/**
 * 3. hipster_badboy: Công Tử Lạc Phố (Chiến Thần Thị Phi / Thư Sinh Hợm Hĩnh)
 * Đặc trưng: Búi tóc cổ phong, quạt giấy, kính tròn cổ, vẻ mặt drama thích hóng hớt
 */
export const ComicScholarSvg: React.FC<ComicSvgProps> = ({ isHurt = false, className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="100" cy="225" rx="55" ry="10" fill="#2E1C12" opacity="0.25" />

    {/* Áo dài gấm tím than cách điệu */}
    <path
      d="M60 112 C50 155 52 195 62 215 L138 215 C148 195 150 155 140 112 Z"
      fill="#8B5CF6"
      stroke="#2D1F17"
      strokeWidth="4.5"
    />
    {/* Vạt áo chéo màu vàng nhạt */}
    <path d="M84 112 L112 165 L104 215" stroke="#FDE047" strokeWidth="3.5" fill="none" />

    {/* Quạt giấy cầm tay */}
    <g transform={isHurt ? "rotate(40, 150, 160)" : "rotate(-10, 150, 160)"}>
      <path d="M135 155 L165 130 C175 145 175 165 160 175 Z" fill="#FCD34D" stroke="#2D1F17" strokeWidth="3" />
      <line x1="135" y1="155" x2="168" y2="152" stroke="#B45309" strokeWidth="1.5" />
    </g>

    {/* Đầu tròn trắng trẻo công tử */}
    <circle cx="100" cy="72" r="42" fill="#FEF3C7" stroke="#2D1F17" strokeWidth="4.5" />

    {/* Tóc búi cao cài trâm tre */}
    <path d="M68 60 C65 30 135 30 132 60 C118 42 82 42 68 60 Z" fill="#1C1917" stroke="#2D1F17" strokeWidth="3" />
    <circle cx="100" cy="30" r="10" fill="#1C1917" />
    <line x1="82" y1="26" x2="118" y2="34" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />

    {!isHurt ? (
      <>
        {/* Kính tròn đen gọng vàng cổ điển cực ngầu */}
        <circle cx="84" cy="70" r="11" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
        <circle cx="116" cy="70" r="11" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
        <line x1="95" y1="70" x2="105" y2="70" stroke="#F59E0B" strokeWidth="3" />
        <line x1="78" y1="64" x2="88" y2="74" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <line x1="110" y1="64" x2="120" y2="74" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Nụ cười nhếch mép buôn chuyện */}
        <path d="M92 92 Q105 98 112 90" stroke="#2D1F17" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </>
    ) : (
      <>
        {/* Kính nứt toác, tròng mắt ốc vặn */}
        <circle cx="84" cy="70" r="11" fill="#FFFFFF" stroke="#2D1F17" strokeWidth="2.5" />
        <line x1="78" y1="64" x2="90" y2="76" stroke="#2D1F17" strokeWidth="2" />
        <line x1="88" y1="65" x2="80" y2="75" stroke="#2D1F17" strokeWidth="2" />

        <circle cx="116" cy="70" r="11" fill="#FFFFFF" stroke="#2D1F17" strokeWidth="2.5" />
        <path d="M116 70 A 5 5 0 1 0 116 66 A 2.5 2.5 0 1 0 116 68" stroke="#DC2626" strokeWidth="2" fill="none" />

        {/* Băng gạc dán chéo mũi */}
        <rect x="92" y="74" width="16" height="7" rx="2" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />

        {/* Miệng méo xệch rơi lệ */}
        <path d="M88 95 Q100 85 112 95" stroke="#2D1F17" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="125" cy="80" r="3.5" fill="#38BDF8" />
      </>
    )}
  </svg>
);

/**
 * 4. boss_demanding: Phú Ông Hứa Lèo (Trùm Hứa Thưởng Xong Quên)
 * Đặc trưng: Bụng bự tròn quay, ria mép ngắn củn, tay ôm túi tiền, mặt tham lam
 */
export const ComicLandlordSvg: React.FC<ComicSvgProps> = ({ isHurt = false, className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="100" cy="225" rx="60" ry="10" fill="#2E1C12" opacity="0.25" />

    {/* Bụng bự tròn trùng trục áo nâu đỏ */}
    <ellipse cx="100" cy="170" rx="46" ry="42" fill="#991B1B" stroke="#2D1F17" strokeWidth="4.5" />

    {/* Túi tiền vàng đeo kè kè bên hông */}
    <path
      d={isHurt ? "M120 155 Q135 150 145 165 Q150 190 130 195 Q115 190 120 155 Z" : "M125 150 Q140 145 150 160 Q155 185 135 190 Q120 185 125 150 Z"}
      fill="#FBBF24"
      stroke="#2D1F17"
      strokeWidth="3.5"
    />
    <text x="135" y="176" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="900">₫</text>

    {/* Đầu tròn núng nính hai cằm */}
    <circle cx="100" cy="74" r="44" fill="#FED7AA" stroke="#2D1F17" strokeWidth="4.5" />
    <path d="M80 106 Q100 116 120 106" stroke="#2D1F17" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Khăn xếp quấn đầu màu tím hoa cà */}
    <ellipse cx="100" cy="42" rx="38" ry="14" fill="#7C3AED" stroke="#2D1F17" strokeWidth="3.5" />
    <line x1="70" y1="42" x2="130" y2="42" stroke="#C4B5FD" strokeWidth="2.5" />

    {!isHurt ? (
      <>
        {/* Mắt ti hí híp lại cười hiểm độc */}
        <path d="M78 68 Q88 60 94 68" stroke="#2D1F17" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M122 68 Q112 60 106 68" stroke="#2D1F17" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Chòm râu dê dưới cằm */}
        <polygon points="96,108 104,108 100,122" fill="#2D1F17" />

        {/* Nụ cười ngoác tận mang tai khoe răng vàng */}
        <path d="M82 86 Q100 106 118 86 Z" fill="#450A0A" stroke="#2D1F17" strokeWidth="3" />
        <rect x="94" y="87" width="6" height="6" fill="#FBBF24" stroke="#78350F" strokeWidth="1" />
      </>
    ) : (
      <>
        {/* Răng rụng sún răng, mồm há to thất thanh */}
        <path d="M84 88 Q100 114 116 88 Z" fill="#7F1D1D" stroke="#2D1F17" strokeWidth="3" />
        <circle cx="100" cy="85" r="3" fill="#FBBF24" /> {/* Răng vàng bay lơ lửng */}

        {/* Mắt nổ đom đóm hình hoa sen */}
        <line x1="76" y1="64" x2="92" y2="74" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="92" y1="64" x2="76" y2="74" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />

        <line x1="108" y1="64" x2="124" y2="74" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="124" y1="64" x2="108" y2="74" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />

        {/* Lá cờ xin tha nhỏ cắm trên đầu */}
        <line x1="130" y1="35" x2="130" y2="10" stroke="#78350F" strokeWidth="2.5" />
        <polygon points="130,10 150,16 130,22" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
      </>
    )}
  </svg>
);

/**
 * 5. lazy_coworker: Trạng Lười Đùn Việc (Thánh Ngủ Gật Né Task)
 * Đặc trưng: Mũ vải chùm kín tai, bóng nước mũi khổng lồ phập phồng, mặt thảnh thơi ngủ khì
 */
export const ComicLazySvg: React.FC<ComicSvgProps> = ({ isHurt = false, className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="100" cy="225" rx="55" ry="10" fill="#2E1C12" opacity="0.25" />

    {/* Thân người chùng xuống lười biếng áo xám tro */}
    <path
      d="M58 120 C50 160 52 195 62 215 L138 215 C148 195 150 160 142 120 Z"
      fill="#64748B"
      stroke="#2D1F17"
      strokeWidth="4.5"
    />
    {/* Tay ôm gối cỏ mềm */}
    <ellipse cx="100" cy="180" rx="30" ry="18" fill="#A7F3D0" stroke="#2D1F17" strokeWidth="3" />

    {/* Đầu hơi nghiêng ngả gật gù */}
    <circle cx="100" cy="74" r="42" fill="#FEF08A" stroke="#2D1F17" strokeWidth="4.5" />

    {/* Mũ tai bèo vải thô chùm sụp xuống */}
    <path d="M60 54 C70 30 130 30 140 54 L148 64 C100 58 100 58 52 64 Z" fill="#0D9488" stroke="#2D1F17" strokeWidth="3.5" />

    {!isHurt ? (
      <>
        {/* Mắt nhắm tịt đường cong ngủ say sưa */}
        <path d="M76 74 Q86 82 94 74" stroke="#2D1F17" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M106 74 Q114 82 124 74" stroke="#2D1F17" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* BONG BÓNG NƯỚC MŨI PHẬP PHỒNG CỰC KỲ HÀI HƯỚC */}
        <circle cx="112" cy="84" r="14" fill="#67E8F9" opacity="0.85" stroke="#06B6D4" strokeWidth="2" />
        <ellipse cx="109" cy="79" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.9" />

        {/* Chữ khò khò Zzz bay lên */}
        <text x="135" y="48" fill="#0D9488" fontSize="14" fontWeight="900">Z</text>
        <text x="145" y="36" fill="#0D9488" fontSize="11" fontWeight="900">z</text>
        <text x="153" y="26" fill="#0D9488" fontSize="9" fontWeight="900">z</text>
      </>
    ) : (
      <>
        {/* Bong bóng vỡ toang bùm! */}
        <path d="M102 78 L108 72 M120 78 L126 72 M114 94 L114 100" stroke="#0891B2" strokeWidth="3" strokeLinecap="round" />

        {/* Mắt trợn tròn mở to thất thần kinh hoàng */}
        <circle cx="84" cy="72" r="9" fill="#FFFFFF" stroke="#2D1F17" strokeWidth="3" />
        <circle cx="84" cy="72" r="3.5" fill="#EF4444" />

        <circle cx="116" cy="72" r="9" fill="#FFFFFF" stroke="#2D1F17" strokeWidth="3" />
        <circle cx="116" cy="72" r="3.5" fill="#EF4444" />

        {/* Miệng há to ngáp ngủ bị đập bất ngờ */}
        <ellipse cx="100" cy="94" rx="8" ry="12" fill="#450A0A" stroke="#2D1F17" strokeWidth="3" />
      </>
    )}
  </svg>
);

/**
 * 6. toxic_ex: Tiểu Thư Tráo Trở (Bạc Tình Lật Mặt / Ghosting)
 * Đặc trưng: Cài hoa sen, khăn mỏ quạ, ánh mắt liếc sắc lẹm, môi đỏ chúm chím
 */
export const ComicDramaSvg: React.FC<ComicSvgProps> = ({ isHurt = false, className = 'w-full h-full' }) => (
  <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="100" cy="225" rx="55" ry="10" fill="#2E1C12" opacity="0.25" />

    {/* Áo tứ thân hồng cánh sen yểu điệu */}
    <path
      d="M60 115 C52 160 52 195 62 215 L138 215 C148 195 148 160 140 115 Z"
      fill="#EC4899"
      stroke="#2D1F17"
      strokeWidth="4.5"
    />
    <path d="M84 115 L100 150 L116 115" fill="#FDE047" stroke="#2D1F17" strokeWidth="2.5" />

    {/* Khăn lụa cầm tay */}
    <path d="M138 140 Q155 130 160 155 Q150 170 140 155 Z" fill="#F472B6" stroke="#2D1F17" strokeWidth="2.5" />

    {/* Đầu tròn xinh xẻo */}
    <circle cx="100" cy="72" r="42" fill="#FFF1F2" stroke="#2D1F17" strokeWidth="4.5" />

    {/* Khăn mỏ quạ đen tuyền truyền thống */}
    <polygon points="60,60 100,28 140,60 128,42 100,34 72,42" fill="#1C1917" stroke="#2D1F17" strokeWidth="3.5" />
    {/* Bông hoa sen cài tai */}
    <circle cx="62" cy="50" r="7" fill="#F43F5E" />
    <circle cx="62" cy="50" r="3" fill="#FBBF24" />

    {!isHurt ? (
      <>
        {/* Mắt phượng liếc xéo kênh kiệu */}
        <path d="M76 68 Q86 60 94 66" stroke="#2D1F17" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="88" cy="67" r="2.5" fill="#2D1F17" />

        <path d="M124 68 Q114 60 106 66" stroke="#2D1F17" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="112" cy="67" r="2.5" fill="#2D1F17" />

        {/* Lông mày lá liễu thanh mảnh */}
        <path d="M74 58 Q84 52 94 58" stroke="#2D1F17" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M126 58 Q116 52 106 58" stroke="#2D1F17" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Môi đỏ chúm chím tim đào kiêu kỳ */}
        <circle cx="100" cy="88" r="4.5" fill="#E11D48" />
        {/* Nốt ruồi duyên giả tạo */}
        <circle cx="112" cy="86" r="1.5" fill="#2D1F17" />
      </>
    ) : (
      <>
        {/* Mascara và son lem luốc tơi bời */}
        <path d="M84 75 L80 88 M88 75 L86 90" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M116 75 L120 88 M112 75 L114 90" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />

        {/* Mắt chữ X toé lửa hờn dỗi */}
        <line x1="76" y1="62" x2="90" y2="74" stroke="#BE123C" strokeWidth="4" strokeLinecap="round" />
        <line x1="90" y1="62" x2="76" y2="74" stroke="#BE123C" strokeWidth="4" strokeLinecap="round" />

        <line x1="110" y1="62" x2="124" y2="74" stroke="#BE123C" strokeWidth="4" strokeLinecap="round" />
        <line x1="124" y1="62" x2="110" y2="74" stroke="#BE123C" strokeWidth="4" strokeLinecap="round" />

        {/* Miệng mếu máo khóc lóc */}
        <path d="M90 92 Q100 84 110 92" stroke="#BE123C" strokeWidth="4" strokeLinecap="round" fill="none" />
        <ellipse cx="68" cy="80" rx="10" ry="7" fill="#F43F5E" opacity="0.6" />
        <ellipse cx="132" cy="80" rx="10" ry="7" fill="#F43F5E" opacity="0.6" />
      </>
    )}
  </svg>
);

/**
 * Bản đồ ánh xạ Style ID sang Component SVG truyện tranh tương ứng
 */
export const COMIC_CHARACTER_MAP: Record<
  CharacterStyleId,
  React.FC<ComicSvgProps>
> = {
  classic_puppet: ComicFolkPuppetSvg,
  office_suit: ComicMandarinSvg,
  hipster_badboy: ComicScholarSvg,
  boss_demanding: ComicLandlordSvg,
  lazy_coworker: ComicLazySvg,
  toxic_ex: ComicDramaSvg,
};

