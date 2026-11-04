const fs = require('fs');
const path = require('path');

const avtDir = path.join(__dirname, 'public', 'images', 'avt');
const characters = [
  'office_suit',
  'hipster_badboy',
  'boss_demanding',
  'classic_puppet',
  'lazy_coworker',
  'toxic_ex'
];

characters.forEach(char => {
  const charDir = path.join(avtDir, char);
  if (!fs.existsSync(charDir)) {
    fs.mkdirSync(charDir, { recursive: true });
  }

  const oldSvgPath = path.join(avtDir, char + '.svg');
  let svgContent = '';
  if (fs.existsSync(oldSvgPath)) {
    svgContent = fs.readFileSync(oldSvgPath, 'utf8');
  }

  // 1. Trạng thái bình thường
  fs.writeFileSync(path.join(charDir, 'suit.svg'), svgContent);

  // 2. Trạng thái bị đập tơi bời (Biến dạng mắt miệng)
  const hurtEyesAndMouth = `
  <!-- ================= BIẾN DẠNG MẮT VÀ MIỆNG BỊ ĐẬP TƠI BỜI ================= -->
  <!-- Má trái sưng tím bầm -->
  <ellipse cx="78" cy="82" rx="14" ry="10" fill="#EF4444" opacity="0.6" />
  <circle cx="75" cy="80" r="6" fill="#991B1B" opacity="0.4" />

  <!-- Băng gạc dán chéo má phải -->
  <g transform="rotate(15, 125, 78)">
    <rect x="115" y="75" width="20" height="8" rx="2" fill="#FCA5A5" stroke="#DC2626" stroke-width="1.5" />
    <rect x="121" y="69" width="8" height="20" rx="2" fill="#FCA5A5" stroke="#DC2626" stroke-width="1.5" />
  </g>

  <!-- Mắt trái: Chữ X bầm dập -->
  <line x1="80" y1="66" x2="94" y2="80" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round" />
  <line x1="94" y1="66" x2="80" y2="80" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round" />

  <!-- Mắt phải: Chữ X bầm dập -->
  <line x1="108" y1="66" x2="122" y2="80" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round" />
  <line x1="122" y1="66" x2="108" y2="80" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round" />

  <!-- Miệng méo xệch há hốc đau đớn + răng sứt -->
  <path d="M86 92 Q 100 115 116 95 Q 100 102 86 92 Z" fill="#991B1B" stroke="#450A0A" stroke-width="3" />
  <rect x="92" y="92" width="5" height="5" fill="#FFFFFF" />
  <rect x="103" y="94" width="5" height="5" fill="#FFFFFF" />

  <!-- Nước mắt cá sấu bắn ra -->
  <circle cx="70" cy="68" r="4" fill="#38BDF8" />
  <circle cx="130" cy="68" r="4" fill="#38BDF8" />
`;

  let hurtSvg = svgContent;
  if (hurtSvg.includes('</svg>')) {
    hurtSvg = hurtSvg.replace('</svg>', hurtEyesAndMouth + '\n</svg>');
  }

  fs.writeFileSync(path.join(charDir, 'suit_hurt.svg'), hurtSvg);
  console.log(`Created: ${char}/suit.svg and ${char}/suit_hurt.svg`);
});

