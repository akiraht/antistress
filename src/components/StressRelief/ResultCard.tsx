import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Share2,
  RotateCcw,
  Smile,
  Zap,
  Award,
  ExternalLink,
  Heart,
} from 'lucide-react';
import { StressResultData } from '../../types/game';
import { CHARACTER_STYLES } from '../../constants/stressRelief';
import { soundManager } from '../../utils/soundSynth';
import { useTheme } from '../../contexts/ThemeContext';
import { DonateModal } from './DonateModal';

interface ResultCardProps {
  data: StressResultData;
  onReset: () => void;
}

type ShareOption = 'battle_trophy' | 'relax_certificate';

// Font chuẩn hỗ trợ trọn vẹn tiếng Việt có dấu trong Canvas
const CANVAS_FONT = '"Be Vietnam Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export const ResultCard: React.FC<ResultCardProps> = ({ data, onReset }) => {
  const { theme, themeConfig } = useTheme();
  const [selectedOption, setSelectedOption] = useState<ShareOption>('battle_trophy');
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string>('');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const styleConfig =
    CHARACTER_STYLES.find((s) => s.id === data.characterStyle) || CHARACTER_STYLES[0];

  // Sinh ảnh bằng Canvas - MÀU ĐƠN SẮC HOÀN TOÀN (KHÔNG DÙNG GRADIENT) & FONT TIẾNG VIỆT CHUẨN
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 640;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    const isDark = theme === 'dark';

    const renderCard = (avatarImg?: HTMLImageElement) => {
      ctx.clearRect(0, 0, width, height);

      if (selectedOption === 'battle_trophy') {
        // ================= OPTION 1: CHIẾN TÍCH ĐẬP TƠI BỜI (MÀU ĐƠN SẮC) =================
        if (isDark) {
          // --- CRAZY ARCADE: Nền đơn sắc Tím Đen Cyber ---
          ctx.fillStyle = '#090516';
          ctx.fillRect(0, 0, width, height);

          // Lưới grid đơn sắc
          ctx.strokeStyle = '#1D123E';
          ctx.lineWidth = 1;
          for (let x = 32; x < width; x += 32) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 32; y < height; y += 32) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          // Viền đơn sắc Hồng Neon & Xanh Cyan
          ctx.strokeStyle = '#FF2A6D';
          ctx.lineWidth = 6;
          ctx.strokeRect(20, 20, width - 40, height - 40);

          ctx.strokeStyle = '#00E5FF';
          ctx.lineWidth = 2;
          ctx.strokeRect(28, 28, width - 56, height - 56);

          // Header Tag: Đơn sắc Hồng Neon
          ctx.fillStyle = '#FF2A6D';
          ctx.fillRect(width / 2 - 160, 44, 320, 38);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `900 15px ${CANVAS_FONT}`;
          ctx.textAlign = 'center';
          ctx.fillText('🕹️ CHIẾN TÍCH ĐẬP BẸP TIỂU NHÂN ⚡', width / 2, 68);

          // Tên người chơi
          ctx.fillStyle = '#00E5FF';
          ctx.font = `900 22px ${CANVAS_FONT}`;
          ctx.fillText(`Player: ${data.nickname}`, width / 2, 116);

          const cx = width / 2;
          const cy = 250;

          // Shadow nhân vật
          ctx.fillStyle = '#130B2A';
          ctx.beginPath();
          ctx.ellipse(cx, cy + 105, 90, 18, 0, 0, Math.PI * 2);
          ctx.fill();

          // 1. Vẽ Avatar nhân vật
          if (avatarImg && avatarImg.complete) {
            ctx.drawImage(avatarImg, cx - 85, cy - 95, 170, 204);
          }

          // 2. Overlay comic bầm dập
          ctx.strokeStyle = '#00E5FF';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx - 70, cy + 60);
          ctx.lineTo(cx - 85, cy - 60);
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#FF2A6D';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx - 85, cy - 58);
          ctx.lineTo(cx - 30, cy - 48);
          ctx.lineTo(cx - 35, cy - 15);
          ctx.lineTo(cx - 83, cy - 25);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FF2A6D';
          ctx.font = `900 11px ${CANVAS_FONT}`;
          ctx.fillText('XIN THA!', cx - 58, cy - 32);

          // Băng gạc đơn sắc
          ctx.fillStyle = '#1D123E';
          ctx.strokeStyle = '#FF2A6D';
          ctx.lineWidth = 2;
          ctx.fillRect(cx - 38, cy - 65, 26, 9);
          ctx.strokeRect(cx - 38, cy - 65, 26, 9);
          ctx.fillRect(cx - 30, cy - 73, 9, 25);
          ctx.strokeRect(cx - 30, cy - 73, 9, 25);

          // Cục u đơn sắc
          ctx.fillStyle = '#FF2A6D';
          ctx.beginPath();
          ctx.ellipse(cx + 38, cy - 68, 14, 11, 0, 0, Math.PI * 2);
          ctx.fill();

          // Mắt chữ X Neon
          ctx.strokeStyle = '#00E5FF';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx - 26, cy - 44);
          ctx.lineTo(cx - 12, cy - 30);
          ctx.moveTo(cx - 12, cy - 44);
          ctx.lineTo(cx - 26, cy - 30);
          ctx.moveTo(cx + 12, cy - 44);
          ctx.lineTo(cx + 26, cy - 30);
          ctx.moveTo(cx + 26, cy - 44);
          ctx.lineTo(cx + 12, cy - 30);
          ctx.stroke();

          ctx.fillStyle = '#A296C8';
          ctx.font = `bold 13px ${CANVAS_FONT}`;
          ctx.fillText(`[ ${styleConfig.name} Bị Đập Tơi Bời ]`, cx, cy + 122);

          // Box thống kê to: Nền đơn sắc Tím #130B2A viền Cyan
          ctx.fillStyle = '#130B2A';
          ctx.strokeStyle = '#00E5FF';
          ctx.lineWidth = 2.5;
          ctx.fillRect(50, 440, width - 100, 200);
          ctx.strokeRect(50, 440, width - 100, 200);

          ctx.fillStyle = '#FFE600';
          ctx.font = `900 50px ${CANVAS_FONT}`;
          ctx.fillText(`${data.totalHits} CÚ ĐẬP`, width / 2, 515);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold 18px ${CANVAS_FONT}`;
          ctx.fillText(`Bảo bối: ${data.toolName} • Combo max: x${data.bestCombo}`, width / 2, 565);

          ctx.fillStyle = '#00E5FF';
          ctx.font = `bold 15px ${CANVAS_FONT}`;
          ctx.fillText('✓ 100% Khí giận đã bốc hơi thành mây khói!', width / 2, 605);

          // Con dấu đơn sắc
          ctx.save();
          ctx.translate(width - 110, 690);
          ctx.rotate(-0.12);
          ctx.strokeStyle = '#FF2A6D';
          ctx.lineWidth = 3.5;
          ctx.strokeRect(-45, -30, 90, 60);
          ctx.fillStyle = '#FF2A6D';
          ctx.font = `900 13px ${CANVAS_FONT}`;
          ctx.fillText('ĐÃ HẠ GỤC', 0, -5);
          ctx.font = `bold 11px ${CANVAS_FONT}`;
          ctx.fillText('HẢ HÊ', 0, 15);
          ctx.restore();

          ctx.fillStyle = '#A296C8';
          ctx.font = `12px ${CANVAS_FONT}`;
          ctx.fillText('Crazy Arcade Stress Relief • danhtieunhan.vn', width / 2, 755);

        } else {
          // --- SARCASTIC OFFICE: Nền đơn sắc Kem Giấy Văn Phòng ---
          ctx.fillStyle = '#F8F4E9';
          ctx.fillRect(0, 0, width, height);

          // Viền đơn sắc Cam Đất & Xanh Than
          ctx.strokeStyle = '#E76F51';
          ctx.lineWidth = 6;
          ctx.strokeRect(20, 20, width - 40, height - 40);

          ctx.strokeStyle = '#D8CFBE';
          ctx.lineWidth = 2;
          ctx.strokeRect(28, 28, width - 56, height - 56);

          // Header Tag: Đơn sắc Cam đất
          ctx.fillStyle = '#E76F51';
          ctx.fillRect(width / 2 - 150, 44, 300, 38);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `900 15px ${CANVAS_FONT}`;
          ctx.textAlign = 'center';
          ctx.fillText('☕ CHIẾN TÍCH XẢ GIẬN VĂN PHÒNG ☕', width / 2, 68);

          // Tên người chơi
          ctx.fillStyle = '#264653';
          ctx.font = `900 22px ${CANVAS_FONT}`;
          ctx.fillText(`Chiến Thần: ${data.nickname}`, width / 2, 116);

          const cx = width / 2;
          const cy = 250;

          // Shadow
          ctx.fillStyle = '#EAE5D9';
          ctx.beginPath();
          ctx.ellipse(cx, cy + 105, 90, 18, 0, 0, Math.PI * 2);
          ctx.fill();

          if (avatarImg && avatarImg.complete) {
            ctx.drawImage(avatarImg, cx - 85, cy - 95, 170, 204);
          }

          // Cờ xin hàng
          ctx.strokeStyle = '#264653';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx - 70, cy + 60);
          ctx.lineTo(cx - 85, cy - 60);
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#264653';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx - 85, cy - 58);
          ctx.lineTo(cx - 30, cy - 48);
          ctx.lineTo(cx - 35, cy - 15);
          ctx.lineTo(cx - 83, cy - 25);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#E76F51';
          ctx.font = `900 11px ${CANVAS_FONT}`;
          ctx.fillText('XIN THA!', cx - 58, cy - 32);

          // Băng dán
          ctx.fillStyle = '#EFE9DC';
          ctx.strokeStyle = '#E76F51';
          ctx.lineWidth = 2;
          ctx.fillRect(cx - 38, cy - 65, 26, 9);
          ctx.strokeRect(cx - 38, cy - 65, 26, 9);
          ctx.fillRect(cx - 30, cy - 73, 9, 25);
          ctx.strokeRect(cx - 30, cy - 73, 9, 25);

          // Cục u
          ctx.fillStyle = '#E76F51';
          ctx.beginPath();
          ctx.ellipse(cx + 38, cy - 68, 14, 11, 0, 0, Math.PI * 2);
          ctx.fill();

          // Mắt chữ X
          ctx.strokeStyle = '#264653';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx - 26, cy - 44);
          ctx.lineTo(cx - 12, cy - 30);
          ctx.moveTo(cx - 12, cy - 44);
          ctx.lineTo(cx - 26, cy - 30);
          ctx.moveTo(cx + 12, cy - 44);
          ctx.lineTo(cx + 26, cy - 30);
          ctx.moveTo(cx + 26, cy - 44);
          ctx.lineTo(cx + 12, cy - 30);
          ctx.stroke();

          ctx.fillStyle = '#264653';
          ctx.font = `bold 13px ${CANVAS_FONT}`;
          ctx.fillText(`[ ${styleConfig.name} Bị Đập Tơi Bời ]`, cx, cy + 122);

          // Box stats: Nền trắng đơn sắc viền Cam đất
          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#E76F51';
          ctx.lineWidth = 2.5;
          ctx.fillRect(50, 440, width - 100, 200);
          ctx.strokeRect(50, 440, width - 100, 200);

          ctx.fillStyle = '#E76F51';
          ctx.font = `900 50px ${CANVAS_FONT}`;
          ctx.fillText(`${data.totalHits} CÚ ĐẬP`, width / 2, 515);

          ctx.fillStyle = '#264653';
          ctx.font = `bold 18px ${CANVAS_FONT}`;
          ctx.fillText(`Bảo bối: ${data.toolName} • Combo max: x${data.bestCombo}`, width / 2, 565);

          ctx.fillStyle = '#2A9D8F';
          ctx.font = `bold 15px ${CANVAS_FONT}`;
          ctx.fillText('✓ 100% Khí giận văn phòng đã tiêu tan!', width / 2, 605);

          // Con dấu đơn sắc
          ctx.save();
          ctx.translate(width - 110, 690);
          ctx.rotate(-0.12);
          ctx.strokeStyle = '#E76F51';
          ctx.lineWidth = 3.5;
          ctx.strokeRect(-45, -30, 90, 60);
          ctx.fillStyle = '#E76F51';
          ctx.font = `900 13px ${CANVAS_FONT}`;
          ctx.fillText('ĐÃ HẠ GỤC', 0, -5);
          ctx.font = `bold 11px ${CANVAS_FONT}`;
          ctx.fillText('HẢ HÊ', 0, 15);
          ctx.restore();

          ctx.fillStyle = '#6B7F88';
          ctx.font = `12px ${CANVAS_FONT}`;
          ctx.fillText('Sarcastic Office Stress Relief • danhtieunhan.vn', width / 2, 755);
        }

      } else {
        // ================= OPTION 2: CHỨNG CHỈ THƯ THÁI (MÀU ĐƠN SẮC) =================
        if (isDark) {
          // --- CRAZY ARCADE CHỨNG CHỈ ĐƠN SẮC ---
          ctx.fillStyle = '#090516';
          ctx.fillRect(0, 0, width, height);

          ctx.strokeStyle = '#00E5FF';
          ctx.lineWidth = 5;
          ctx.strokeRect(20, 20, width - 40, height - 40);

          ctx.strokeStyle = '#8E44FF';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(28, 28, width - 56, height - 56);

          ctx.fillStyle = '#00E5FF';
          ctx.font = `900 14px ${CANVAS_FONT}`;
          ctx.textAlign = 'center';
          ctx.fillText('CHỨNG CHỈ THƯ THÁI & CHỮA LÀNH TÂM HỒN', width / 2, 75);

          ctx.fillStyle = '#FFE600';
          ctx.font = `900 28px ${CANVAS_FONT}`;
          ctx.fillText('SỚ BÌNH AN ĐẠI CÁT', width / 2, 115);

          ctx.strokeStyle = '#3F257D';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(90, 135);
          ctx.lineTo(width - 90, 135);
          ctx.stroke();

          ctx.fillStyle = '#A296C8';
          ctx.font = `15px ${CANVAS_FONT}`;
          ctx.fillText('Chứng nhận người chơi:', width / 2, 175);

          ctx.fillStyle = '#FF2A6D';
          ctx.font = `900 24px ${CANVAS_FONT}`;
          ctx.fillText(data.nickname, width / 2, 210);

          ctx.fillStyle = '#A296C8';
          ctx.font = `15px ${CANVAS_FONT}`;
          ctx.fillText(`Mã đối tượng: ${data.encodedName || 'TN-#9981'}`, width / 2, 245);
          ctx.fillText(`Đã trút sạch áp lực qua ${data.totalHits} lượt vung ${data.toolName}!`, width / 2, 275);

          // Box quẻ đơn sắc
          ctx.fillStyle = '#1D123E';
          ctx.strokeStyle = '#00E5FF';
          ctx.lineWidth = 2.5;
          ctx.fillRect(45, 315, width - 90, 260);
          ctx.strokeRect(45, 315, width - 90, 260);

          ctx.fillStyle = '#00E5FF';
          ctx.font = `900 15px ${CANVAS_FONT}`;
          ctx.fillText(`✨ ${data.fortune.grade} ✨`, width / 2, 355);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `900 20px ${CANVAS_FONT}`;
          ctx.fillText(data.fortune.title, width / 2, 395);

          ctx.fillStyle = '#E2D9F3';
          ctx.font = `italic 14px ${CANVAS_FONT}`;
          const words = data.fortune.message.split(' ');
          let line = '';
          let y = 435;
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > width - 140 && n > 0) {
              ctx.fillText(line, width / 2, y);
              line = words[n] + ' ';
              y += 24;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, width / 2, y);

          ctx.fillStyle = '#FFE600';
          ctx.font = `bold 13px ${CANVAS_FONT}`;
          ctx.fillText(`💡 ${data.fortune.advice}`, width / 2, 530);

          // Con dấu
          ctx.save();
          ctx.translate(width / 2, 650);
          ctx.strokeStyle = '#FF2A6D';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 42, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#FF2A6D';
          ctx.font = `900 13px ${CANVAS_FONT}`;
          ctx.fillText('TÂM AN', 0, -6);
          ctx.font = `bold 11px ${CANVAS_FONT}`;
          ctx.fillText('VẠN SỰ AN', 0, 14);
          ctx.restore();

          ctx.fillStyle = '#A296C8';
          ctx.font = `12px ${CANVAS_FONT}`;
          ctx.fillText(`Viên mãn lúc: ${data.completedAt}`, width / 2, 735);
          ctx.fillText('Đánh Tiểu Nhân Online • Giải Tỏa Stress Văn Minh', width / 2, 755);

        } else {
          // --- SARCASTIC OFFICE CHỨNG CHỈ ĐƠN SẮC ---
          ctx.fillStyle = '#F8F4E9';
          ctx.fillRect(0, 0, width, height);

          ctx.strokeStyle = '#264653';
          ctx.lineWidth = 6;
          ctx.strokeRect(20, 20, width - 40, height - 40);

          ctx.strokeStyle = '#D8CFBE';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(28, 28, width - 56, height - 56);

          ctx.fillStyle = '#264653';
          ctx.font = `bold 13px ${CANVAS_FONT}`;
          ctx.textAlign = 'center';
          ctx.fillText('CHỨNG CHỈ THƯ THÁI & CHỮA LÀNH TÂM HỒN', width / 2, 75);

          ctx.fillStyle = '#E76F51';
          ctx.font = `900 28px ${CANVAS_FONT}`;
          ctx.fillText('SỚ BÌNH AN ĐẠI CÁT', width / 2, 115);

          ctx.strokeStyle = '#D8CFBE';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(90, 135);
          ctx.lineTo(width - 90, 135);
          ctx.stroke();

          ctx.fillStyle = '#6B7F88';
          ctx.font = `15px ${CANVAS_FONT}`;
          ctx.fillText('Chứng nhận người chơi:', width / 2, 175);

          ctx.fillStyle = '#264653';
          ctx.font = `900 24px ${CANVAS_FONT}`;
          ctx.fillText(data.nickname, width / 2, 210);

          ctx.fillStyle = '#6B7F88';
          ctx.font = `15px ${CANVAS_FONT}`;
          ctx.fillText(`Mã đối tượng: ${data.encodedName || 'TN-#9981'}`, width / 2, 245);
          ctx.fillText(`Đã trút sạch áp lực qua ${data.totalHits} lượt vung ${data.toolName}!`, width / 2, 275);

          ctx.fillStyle = '#FFFFFF';
          ctx.strokeStyle = '#2A9D8F';
          ctx.lineWidth = 2.5;
          ctx.fillRect(45, 315, width - 90, 260);
          ctx.strokeRect(45, 315, width - 90, 260);

          ctx.fillStyle = '#2A9D8F';
          ctx.font = `900 15px ${CANVAS_FONT}`;
          ctx.fillText(`✨ ${data.fortune.grade} ✨`, width / 2, 355);

          ctx.fillStyle = '#264653';
          ctx.font = `900 20px ${CANVAS_FONT}`;
          ctx.fillText(data.fortune.title, width / 2, 395);

          ctx.fillStyle = '#4A5B64';
          ctx.font = `italic 14px ${CANVAS_FONT}`;
          const words = data.fortune.message.split(' ');
          let line = '';
          let y = 435;
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > width - 140 && n > 0) {
              ctx.fillText(line, width / 2, y);
              line = words[n] + ' ';
              y += 24;
            } else {
              line = testLine;
            }
          }
          ctx.fillText(line, width / 2, y);

          ctx.fillStyle = '#D97706';
          ctx.font = `bold 13px ${CANVAS_FONT}`;
          ctx.fillText(`💡 ${data.fortune.advice}`, width / 2, 530);

          // Con dấu
          ctx.save();
          ctx.translate(width / 2, 650);
          ctx.strokeStyle = '#E76F51';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 42, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#E76F51';
          ctx.font = `900 13px ${CANVAS_FONT}`;
          ctx.fillText('TÂM AN', 0, -6);
          ctx.font = `bold 11px ${CANVAS_FONT}`;
          ctx.fillText('VẠN SỰ AN', 0, 14);
          ctx.restore();

          ctx.fillStyle = '#6B7F88';
          ctx.font = `12px ${CANVAS_FONT}`;
          ctx.fillText(`Viên mãn lúc: ${data.completedAt}`, width / 2, 735);
          ctx.fillText('Đánh Tiểu Nhân Online • Giải Tỏa Stress Văn Minh', width / 2, 755);
        }
      }

      try {
        setGeneratedImgUrl(canvas.toDataURL('image/png'));
      } catch {
        // Safe catch
      }
    };

    // Đợi font Be Vietnam Pro nạp xong trước khi vẽ lên canvas
    const drawWithReadyFonts = (avatarImg?: HTMLImageElement) => {
      if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          renderCard(avatarImg);
        });
      } else {
        renderCard(avatarImg);
      }
    };

    if (selectedOption === 'battle_trophy') {
      const avatarImg = new Image();
      avatarImg.crossOrigin = 'anonymous';
      avatarImg.onload = () => drawWithReadyFonts(avatarImg);
      avatarImg.onerror = () => {
        // Fallback sang file SVG thường nếu file hurt chưa load
        const fallbackImg = new Image();
        fallbackImg.onload = () => drawWithReadyFonts(fallbackImg);
        fallbackImg.src = `/images/avt/${data.characterStyle || 'office_suit'}.svg`;
      };
      // Tải hình ảnh nhân vật bị đập tơi bời suit_hurt.svg
      avatarImg.src = `/images/avt/${data.characterStyle || 'office_suit'}/suit_hurt.svg`;
    } else {
      drawWithReadyFonts();
    }
  }, [selectedOption, data, styleConfig, theme]);

  const shareText = `🎉 TÔI VỪA XẢ SẠCH 100% STRESS!
Người chơi: ${data.nickname}
Đã vung ${data.totalHits} cú đập tơi bời bằng ${data.toolName}!
Mã giải tỏa: ${data.encodedName || 'TN-#9981'}
Thông điệp hôm nay: ${data.fortune.title} (${data.fortune.tag})
👉 Xả stress cùng tôi tại: ${typeof window !== 'undefined' ? window.location.href : 'https://danhtieunhan.vn'}`;

  const handleDownloadImage = () => {
    if (!generatedImgUrl) return;
    const a = document.createElement('a');
    a.href = generatedImgUrl;
    a.download = `${
      selectedOption === 'battle_trophy'
        ? `chien-tich-dap-${data.characterStyle}`
        : 'chung-chi-thu-thai'
    }-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    soundManager.playRewardChime();
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        if (canvasRef.current && navigator.canShare) {
          canvasRef.current.toBlob(async (blob) => {
            if (blob) {
              const file = new File([blob], 'xastress.png', { type: 'image/png' });
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                  files: [file],
                  title: 'Chứng Nhận Xả Sạch Stress',
                  text: shareText,
                });
                return;
              }
            }
            await navigator.share({
              title: 'Chứng Nhận Xả Sạch Stress',
              text: shareText,
              url: window.location.href,
            });
          });
        } else {
          await navigator.share({
            title: 'Chứng Nhận Xả Sạch Stress',
            text: shareText,
            url: window.location.href,
          });
        }
        return;
      } catch {
        // Fallback
      }
    }

    // Fallback copy clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      setCopiedNotice('Đã copy nội dung chia sẻ!');
      setTimeout(() => setCopiedNotice(null), 2500);
    }
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  const handleShareInstagram = async () => {
    // Instagram không hỗ trợ trực tiếp share intent URL web, ta copy nội dung vào clipboard và mở trang/app Instagram
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
    }
    setCopiedNotice('Đã copy lời chia sẻ! Đang mở Instagram...');
    setTimeout(() => setCopiedNotice(null), 3000);
    window.open('https://www.instagram.com/', '_blank');
  };

  const handleShareX = () => {
    const text = encodeURIComponent(shareText);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=600,height=400');
  };

  const handleShareZalo = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://zalo.me/share?url=${url}`, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 text-center">
      {/* Hidden high-res canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Thông báo toast khi copy */}
      {copiedNotice && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg animate-in fade-in slide-in-from-top duration-200">
          {copiedNotice}
        </div>
      )}

      {/* Modal Donate */}
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />

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
          <Smile className="w-4 h-4" />
          <span>XẢ SẠCH 100% STRESS • CHIA SẺ NIỀM VUI</span>
        </div>
        <h2
          className="text-xl sm:text-2xl font-black tracking-[-0.03em] leading-tight"
          style={{ color: themeConfig.textMain }}
        >
          Khoe Thành Tích Với Bạn Bè
        </h2>
        <p
          className="text-xs max-w-sm mx-auto leading-relaxed"
          style={{ color: themeConfig.textMuted }}
        >
          Chọn 1 trong 2 hình thức khoe chiến tích xịn sò để gửi vào nhóm chat Zalo, Facebook hoặc đăng story:
        </p>
      </div>

      {/* 2 Tabs chọn Option khoe - Solid Colors */}
      <div
        className="my-2 grid grid-cols-2 gap-2 p-1.5 rounded-2xl border"
        style={{
          backgroundColor: themeConfig.bgSubtle,
          borderColor: themeConfig.border,
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedOption('battle_trophy')}
          className="py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          style={{
            backgroundColor:
              selectedOption === 'battle_trophy' ? themeConfig.primary : 'transparent',
            color: selectedOption === 'battle_trophy' ? '#FFFFFF' : themeConfig.textMuted,
          }}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>1. Đập Tơi Bời ({styleConfig.name})</span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedOption('relax_certificate')}
          className="py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          style={{
            backgroundColor:
              selectedOption === 'relax_certificate' ? themeConfig.secondary : 'transparent',
            color: selectedOption === 'relax_certificate' ? '#FFFFFF' : themeConfig.textMuted,
          }}
        >
          <Award className="w-3.5 h-3.5" />
          <span>2. Chứng Chỉ Thư Thái</span>
        </button>
      </div>

      {/* Image Preview Box - Solid Color */}
      <div className="my-2 relative w-full flex flex-col items-center">
        {generatedImgUrl ? (
          <div
            className="relative group rounded-2xl overflow-hidden border-2 shadow-md max-w-[320px] mx-auto"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <img
              src={generatedImgUrl}
              alt="Hình ảnh chiến tích chia sẻ"
              className="w-full h-auto object-contain max-h-[380px] rounded-2xl"
            />
            <div className="absolute top-2.5 right-2.5">
              <span
                className="px-2 py-1 rounded-lg text-[10px] font-black border shadow-sm"
                style={{
                  backgroundColor: themeConfig.bgCard,
                  color: themeConfig.primary,
                  borderColor: themeConfig.border,
                }}
              >
                Ảnh 640x800 HD
              </span>
            </div>
          </div>
        ) : (
          <div
            className="w-full h-64 rounded-2xl flex items-center justify-center text-xs border"
            style={{
              backgroundColor: themeConfig.bgCard,
              color: themeConfig.textMuted,
              borderColor: themeConfig.border,
            }}
          >
            Đang tạo ảnh chia sẻ...
          </div>
        )}
      </div>

      {/* Action Buttons - Solid Colors */}
      <div className="space-y-2 mt-1">
        {/* Hàng 1 (3 nút): Tải ảnh, Chia sẻ nhanh, Ủng hộ */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={handleDownloadImage}
            className="py-2.5 px-2 rounded-2xl font-black text-xs tracking-tight shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0"
            style={{
              backgroundColor: themeConfig.highlight,
              color: theme === 'dark' ? '#090516' : '#264653',
            }}
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Tải Ảnh</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="py-2.5 px-2 rounded-2xl font-black text-xs tracking-tight shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0"
            style={{
              backgroundColor: themeConfig.secondary,
              color: '#FFFFFF',
            }}
          >
            <Share2 className="w-3.5 h-3.5 shrink-0 text-white" />
            <span className="truncate">Chia Sẻ</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDonateOpen(true)}
            className="py-2.5 px-2 rounded-2xl font-black text-xs tracking-tight shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0"
            style={{
              backgroundColor: '#E11D48',
              color: '#FFFFFF',
            }}
            title="Ủng hộ tác giả một ly cà phê"
          >
            <Heart className="w-3.5 h-3.5 shrink-0 fill-white text-white" />
            <span className="truncate">Ủng Hộ ☕</span>
          </button>
        </div>

        {/* Hàng 2 (4 nút mạng xã hội): Facebook, Instagram, X (Twitter), Zalo ở cuối hàng */}
        <div className="grid grid-cols-4 gap-1.5">
          {/* 1. Facebook */}
          <button
            type="button"
            onClick={handleShareFacebook}
            className="py-2 px-1.5 rounded-xl border font-bold text-[11px] transition flex items-center justify-center gap-1 cursor-pointer"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: '#1877F2',
              color: '#1877F2',
            }}
          >
            <span className="truncate">Facebook</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </button>

          {/* 2. Instagram */}
          <button
            type="button"
            onClick={handleShareInstagram}
            className="py-2 px-1.5 rounded-xl border font-bold text-[11px] transition flex items-center justify-center gap-1 cursor-pointer"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: '#E1306C',
              color: '#E1306C',
            }}
            title="Copy nội dung & Mở Instagram"
          >
            <span className="truncate">Instagram</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </button>

          {/* 3. X (Twitter) */}
          <button
            type="button"
            onClick={handleShareX}
            className="py-2 px-1.5 rounded-xl border font-bold text-[11px] transition flex items-center justify-center gap-1 cursor-pointer"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: theme === 'dark' ? '#E7E9EA' : '#0F1419',
              color: theme === 'dark' ? '#E7E9EA' : '#0F1419',
            }}
          >
            <span className="truncate font-black">X</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </button>

          {/* 4. Zalo (về cuối hàng) */}
          <button
            type="button"
            onClick={handleShareZalo}
            className="py-2 px-1.5 rounded-xl border font-bold text-[11px] transition flex items-center justify-center gap-1 cursor-pointer"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: '#0068FF',
              color: '#0068FF',
            }}
          >
            <span className="truncate">Zalo</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </button>
        </div>

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs border flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer mt-1 shadow-xs"
          style={{
            backgroundColor: themeConfig.bgCard,
            borderColor: themeConfig.border,
            color: themeConfig.textMuted,
          }}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Tiếp Tục Xả Nỗi Bực Bội Khác</span>
        </button>
      </div>
    </div>
  );
};
