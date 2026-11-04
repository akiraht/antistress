import React, { useState } from 'react';
import { Crown, X, CheckCircle2, QrCode, Lock } from 'lucide-react';
import { UserAccount } from '../types/game';

interface VipUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
  userAccount: UserAccount | null;
  onActivateDemoVip?: () => void;
}

export const VipUpgradeModal: React.FC<VipUpgradeModalProps> = ({
  isOpen,
  onClose,
  reason = '',
  userAccount,
  onActivateDemoVip,
}) => {
  const [authEmailInput, setAuthEmailInput] = useState('');
  const [authNameInput, setAuthNameInput] = useState('');
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  if (!isOpen) return null;

  const isVip = userAccount?.isVip ?? false;

  const handleActivate = () => {
    if (onActivateDemoVip) {
      onActivateDemoVip();
    }
    setIsSuccessToast(true);
    setTimeout(() => {
      setIsSuccessToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-md bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-5 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-300">
                GÓI VIP CÔNG CỤ ĐẶC BIỆT
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold">
                Nâng cấp mở khóa 8 vũ khí & đặc quyền
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {reason && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-400/15 border border-amber-400/50 text-amber-200 text-xs font-bold flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{reason}</span>
          </div>
        )}

        {isSuccessToast && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Kích hoạt VIP thành công! Toàn bộ 8 vũ khí đã mở khóa.</span>
          </div>
        )}

        {/* Thông tin nạp */}
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <div className="text-xs font-extrabold uppercase text-amber-400">
              Quyền lợi Gói VIP 7.000đ / tháng
            </div>
            <ul className="text-xs text-slate-200 space-y-1.5 font-semibold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mở khóa trọn bộ 8 công cụ độc quyền cực thấm</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mở rộng thời gian xả giận lên 30 giây</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Nhận quẻ Thượng Thượng Quẻ & Chứng nhận vàng</span>
              </li>
            </ul>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Email đăng ký nhận VIP
            </label>
            <input
              type="email"
              value={authEmailInput}
              onChange={(e) => setAuthEmailInput(e.target.value)}
              placeholder="VD: ban@gmail.com"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* QR Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center">
            <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl shadow-inner flex flex-col items-center justify-center mb-2">
              <QrCode className="w-24 h-24 text-slate-950" />
              <span className="text-[10px] text-slate-600 font-bold font-mono">VIETQR • 7.000đ</span>
            </div>
            <div className="text-xs font-bold text-slate-300">Quét mã chuyển khoản tức thì</div>
            <div className="text-[11px] text-amber-400 font-mono mt-0.5">Nội dung: DTN VIP 7K</div>
          </div>

          <button
            type="button"
            onClick={handleActivate}
            className="w-full py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md hover:brightness-110 transition active:scale-95 cursor-pointer"
          >
            {isVip ? 'Đang Là VIP (Nhấn để gia hạn demo)' : 'Kích Hoạt Thử VIP Ngay (Demo)'}
          </button>
        </div>
      </div>
    </div>
  );
};

