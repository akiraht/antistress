import React, { useState } from 'react';
import { X, Heart, QrCode, Copy, Check, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const { themeConfig } = useTheme();
  const [copiedBank, setCopiedBank] = useState(false);
  const [activeTab, setActiveTab] = useState<'bank' | 'momo'>('bank');

  if (!isOpen) return null;

  // THÔNG TIN TÙY BIẾN CHO DONATE:
  // Bạn có thể đổi số tài khoản, ngân hàng và tên chủ tài khoản tại đây:
  const DONATE_CONFIG = {
    bank: {
      bankId: 'MB', // MBBank, VCB, TCB, ACB, TPB,...
      bankName: 'MBBank (Quân Đội)',
      accountNo: '6520193198888', // <-- Thay số tài khoản của bạn tại đây
      accountName: 'LUONG HOANG SON', // <-- Tên chủ tài khoản viết hoa chuẩn
      amount: '7000',
      description: 'Ung ho ca phe app',
    },
    momo: {
      phone: '0907255508', // <-- Số MoMo
      name: 'LUONG HOANG SON',
      qrImage: '/images/qrmomo.jpg', // <-- Hình ảnh QR MoMo tải lên
    },
  };

  // URL sinh mã VietQR chuẩn NAPAS tự động (cho ngân hàng)
  const bankQrUrl = `https://img.vietqr.io/image/${DONATE_CONFIG.bank.bankId}-${DONATE_CONFIG.bank.accountNo}-compact2.png?amount=${DONATE_CONFIG.bank.amount}&addInfo=${encodeURIComponent(DONATE_CONFIG.bank.description)}&accountName=${encodeURIComponent(DONATE_CONFIG.bank.accountName)}`;

  // Sử dụng hình ảnh QR chính thức do app MoMo xuất ra
  const momoQrUrl = DONATE_CONFIG.momo.qrImage;
  const momoPayUrl = `https://nhantien.momo.vn/${DONATE_CONFIG.momo.phone}/${DONATE_CONFIG.bank.amount}`;

  const currentQrUrl = activeTab === 'bank' ? bankQrUrl : momoQrUrl;

  const handleCopyAccountNo = async () => {
    const textToCopy = activeTab === 'bank' ? DONATE_CONFIG.bank.accountNo : DONATE_CONFIG.momo.phone;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm rounded-3xl p-5 border-2 shadow-2xl relative animate-in zoom-in-95 duration-200"
        style={{
          backgroundColor: themeConfig.bgFrame,
          borderColor: themeConfig.primary,
          color: themeConfig.textMain,
        }}
      >
        {/* Nút đóng */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full border opacity-75 hover:opacity-100 transition cursor-pointer"
          style={{
            backgroundColor: themeConfig.bgSubtle,
            borderColor: themeConfig.border,
            color: themeConfig.textMuted,
          }}
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tiêu đề modal */}
        <div className="text-center space-y-1 mb-3">
          <div
            className="w-10 h-10 rounded-2xl mx-auto flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: activeTab === 'bank' ? themeConfig.primary : '#D82D8B' }}
          >
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <h3 className="text-base font-black tracking-tight">
            Ủng Hộ Cà Phê Dev ☕
          </h3>
          <p className="text-[11px] font-semibold opacity-75 leading-tight">
            Mỗi ly cà phê nhỏ là động lực lớn để dev tiếp tục phát triển thêm nhiều mini-game xả stress hay ho!
          </p>
        </div>

        {/* 2 Tabs chọn hình thức: Ngân hàng (VietQR) / MoMo */}
        <div
          className="grid grid-cols-2 gap-1 p-1 rounded-xl border mb-3 text-xs font-bold"
          style={{
            backgroundColor: themeConfig.bgSubtle,
            borderColor: themeConfig.border,
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('bank')}
            className={`py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-emerald-500 text-white shadow-sm font-black'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Ngân Hàng
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('momo')}
            className={`py-1.5 rounded-lg transition cursor-pointer ${
              activeTab === 'momo'
                ? 'bg-[#D82D8B] text-white shadow-sm font-black'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Ví MoMo
          </button>
        </div>

        {/* Khung hiển thị mã QR */}
        <div
          className="rounded-2xl p-3 border text-center shadow-inner"
          style={{
            backgroundColor: themeConfig.bgCard,
            borderColor: themeConfig.border,
          }}
        >
          <div className="bg-white p-2 rounded-xl inline-block shadow-sm border border-slate-200">
            <img
              key={activeTab}
              src={currentQrUrl}
              alt={activeTab === 'bank' ? 'Mã QR Ngân Hàng' : 'Mã QR MoMo'}
              className="w-44 h-44 object-contain mx-auto"
              onError={(e) => {
                // Fallback nếu ảnh QR lỗi
                (e.currentTarget as HTMLImageElement).src = '/images/app.png';
              }}
            />
          </div>

          {/* Chi tiết tài khoản theo Tab */}
          {activeTab === 'bank' ? (
            <div className="mt-2.5 text-xs font-semibold space-y-1">
              <div className="flex items-center justify-between px-2">
                <span className="opacity-70">Ngân hàng:</span>
                <span className="font-bold">{DONATE_CONFIG.bank.bankName}</span>
              </div>
              <div className="flex items-center justify-between px-2">
                <span className="opacity-70">Chủ tài khoản:</span>
                <span className="font-bold">{DONATE_CONFIG.bank.accountName}</span>
              </div>
              <div className="flex items-center justify-between px-2 pt-1 border-t border-dashed" style={{ borderColor: themeConfig.border }}>
                <span className="opacity-70">Số tài khoản:</span>
                <span className="font-mono font-black text-sm text-emerald-500">{DONATE_CONFIG.bank.accountNo}</span>
              </div>
            </div>
          ) : (
            <div className="mt-2.5 text-xs font-semibold space-y-1">
              <div className="flex items-center justify-between px-2">
                <span className="opacity-70">Dịch vụ:</span>
                <span className="font-bold text-[#D82D8B]">Ví Điện Tử MoMo</span>
              </div>
              <div className="flex items-center justify-between px-2">
                <span className="opacity-70">Chủ tài khoản:</span>
                <span className="font-bold">{DONATE_CONFIG.momo.name}</span>
              </div>
              <div className="flex items-center justify-between px-2 pt-1 border-t border-dashed" style={{ borderColor: themeConfig.border }}>
                <span className="opacity-70">Số MoMo:</span>
                <span className="font-mono font-black text-sm text-[#D82D8B]">{DONATE_CONFIG.momo.phone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Nút thao tác */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleCopyAccountNo}
            className="flex-1 py-2.5 px-3 rounded-xl font-black text-xs transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm border"
            style={{
              backgroundColor: themeConfig.bgSubtle,
              borderColor: themeConfig.border,
              color: themeConfig.textMain,
            }}
          >
            {copiedBank ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>
              {activeTab === 'bank'
                ? copiedBank
                  ? 'Đã Chép Số TK!'
                  : 'Chép Số Tài Khoản'
                : copiedBank
                ? 'Đã Chép Số MoMo!'
                : 'Chép Số MoMo'}
            </span>
          </button>

          {activeTab === 'momo' ? (
            <a
              href={momoPayUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl font-black text-xs text-white transition active:scale-95 flex items-center justify-center gap-1 cursor-pointer shadow-md bg-[#D82D8B]"
            >
              <span>Mở MoMo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl font-black text-xs text-white transition active:scale-95 cursor-pointer shadow-md"
              style={{ backgroundColor: themeConfig.primary }}
            >
              Đóng
            </button>
          )}
        </div>

        <div className="text-[10px] text-center opacity-60 mt-2 font-medium">
          {activeTab === 'bank'
            ? '💡 Quét mã bằng bất kỳ app ngân hàng nào (VCB, MB, TCB, ACB,...)'
            : '💡 Quét mã bằng App MoMo hoặc Camera điện thoại để mở MoMo'}
        </div>
      </div>
    </div>
  );
};

