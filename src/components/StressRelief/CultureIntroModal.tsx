import React from 'react';
import { BookOpen, ShieldCheck, Smile, Sparkles, ArrowRight, HeartHandshake, Info } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CultureIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const getTodayDateKey = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const CultureIntroModal: React.FC<CultureIntroModalProps> = ({ isOpen, onClose }) => {
  const { themeConfig } = useTheme();

  if (!isOpen) return null;

  const handleStart = () => {
    // Lưu lại ngày đã xem để không mở lại trong ngày trên thiết bị này
    try {
      localStorage.setItem('dtn_culture_intro_date', getTodayDateKey());
    } catch {
      // Ignored for privacy modes
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl border-2 shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden"
        style={{
          backgroundColor: themeConfig.bgFrame,
          borderColor: themeConfig.primary,
          color: themeConfig.textMain,
        }}
      >
        {/* Header Modal */}
        <div
          className="p-4 sm:p-5 border-b flex-shrink-0"
          style={{
            backgroundColor: themeConfig.bgSubtle,
            borderColor: themeConfig.border,
          }}
        >
          <h2 className="text-base sm:text-lg font-black tracking-tight leading-snug">
            Phong Tục "Đánh Tiểu Nhân" & Ý Nghĩa Trị Liệu Áp Lực
          </h2>
          <p className="text-[11px] font-semibold opacity-75 mt-0.5 leading-relaxed">
            Tìm hiểu nguồn gốc truyền thống và mục đích mô phỏng giải tỏa stress của ứng dụng.
          </p>
        </div>

        {/* Nội dung cuộn mượt mà */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 text-xs font-semibold leading-relaxed">
          {/* Khối 1: Nguồn gốc phong tục */}
          <div
            className="p-3.5 rounded-2xl border space-y-2"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div className="flex items-center gap-2 text-xs font-black" style={{ color: themeConfig.primary }}>
              <HistoryIcon className="w-4 h-4 flex-shrink-0" />
              <span>Nguồn Gốc Phong Tục "Đánh Tiểu Nhân" (打小人)</span>
            </div>
            <p className="opacity-90">
              "Đánh tiểu nhân" là một tập tục văn hóa dân gian Á Đông lâu đời, thường diễn ra vào <strong>tiết Kinh Trập</strong> (khoảng tháng 3 âm lịch) — thời điểm sâu bọ thức giấc và người xưa tin rằng vận xui, thị phi cũng dễ phát sinh.
            </p>
            <p className="opacity-90">
              Người dân dùng giày dép gõ vào hình nhân giấy tượng trưng cho tai ương, miệng tiếng thị phi để <strong>xua đuổi vận hạn</strong>, hóa giải những điều ấm ức trong lòng, từ đó cầu mong công việc hanh thông, quý nhân phù trợ và cuộc sống an lành.
            </p>
          </div>

          {/* Khối 2: Góc nhìn tâm lý học & Xả stress */}
          <div
            className="p-3.5 rounded-2xl border space-y-2"
            style={{
              backgroundColor: themeConfig.bgCard,
              borderColor: themeConfig.border,
            }}
          >
            <div className="flex items-center gap-2 text-xs font-black" style={{ color: themeConfig.secondary }}>
              <HeartHandshake className="w-4 h-4 flex-shrink-0" />
              <span>Liệu Pháp Giải Tỏa Cảm Xúc (Catharsis)</span>
            </div>
            <p className="opacity-90">
              Dưới góc nhìn tâm lý học hiện đại, đây là một hình thức <strong>Catharsis</strong> — giải phóng những năng lượng tiêu cực, bức xúc và uất ức bị dồn nén qua hành động mang tính biểu tượng, giúp tinh thần nhẹ nhõm hơn mà không gây tổn hại đến ai.
            </p>
          </div>

          {/* Khối 3: Tuyên bố mô phỏng & Cam kết lành mạnh */}
          <div
            className="p-3.5 rounded-2xl border space-y-2"
            style={{
              backgroundColor: themeConfig.bgSubtle,
              borderColor: themeConfig.border,
            }}
          >
            <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Cam Kết Mô Phỏng Lành Mạnh &amp; Văn Minh</span>
            </div>
            <ul className="space-y-1.5 opacity-90 pl-1">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Chỉ mô phỏng giải trí:</strong> Ứng dụng đóng vai trò như một "phòng xả stress ảo" giúp bạn trút bỏ căng thẳng sau giờ làm việc mệt mỏi.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Không bạo lực &amp; không mê tín:</strong> Tuyệt đối không cổ xúy bạo lực ngoài đời thực hay các hủ tục trù ếm mê tín dị đoan.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Bảo mật danh tính:</strong> Tên đối tượng bực bội luôn được băm mã hóa bảo mật, tôn trọng quyền riêng tư.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer với Nút Bắt Đầu */}
        <div
          className="p-4 sm:p-5 border-t flex-shrink-0 space-y-2 text-center"
          style={{
            backgroundColor: themeConfig.bgSubtle,
            borderColor: themeConfig.border,
          }}
        >
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-3 px-5 rounded-2xl font-black text-sm transition active:scale-95 text-white shadow-lg cursor-pointer flex items-center justify-center gap-2"
            style={{ backgroundColor: themeConfig.primary }}
          >
            <Sparkles className="w-4 h-4" />
            <span>BẮT ĐẦU NGAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Icon trợ giúp phụ
const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>
);

