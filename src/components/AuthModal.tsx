import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#5A5E6B] hover:text-[#181B24] hover:bg-[#F0F3FA] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded bg-[#181B24] flex items-center justify-center">
            <span className="text-sm font-bold text-white">TV</span>
          </div>
          <span className="font-bold text-base text-[#181B24]">Join TradingView</span>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center animate-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-full bg-[#E6F4F1] text-[#089981] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-[#181B24]">Welcome aboard!</h4>
            <p className="text-xs text-[#5A5E6B] mt-1">
              Your personalized charts, alerts, and watchlists are ready.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="font-bold text-xl text-[#181B24] tracking-tight">
              Love the markets?
            </h3>
            <p className="text-xs text-[#5A5E6B] mt-1 mb-6">
              Track your favorite assets, sync customized alerts across devices, and test strategies in real time.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#181B24] mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  placeholder="trader@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F0F3FA] border border-[#E0E3EB] rounded-xl text-xs text-[#181B24] placeholder-[#5A5E6B] focus:outline-none focus:ring-2 focus:ring-[#0049DB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#2962FF] to-[#7B1FA2] text-white text-xs font-bold shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
              >
                Continue with Email
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E0E3EB]"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-[#5A5E6B] font-semibold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(true);
                  setTimeout(() => {
                    setIsSubmitted(false);
                    onClose();
                  }, 1200);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-[#E0E3EB] rounded-xl text-xs font-semibold text-[#181B24] hover:bg-[#F0F3FA] transition-colors cursor-pointer"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(true);
                  setTimeout(() => {
                    setIsSubmitted(false);
                    onClose();
                  }, 1200);
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-[#E0E3EB] rounded-xl text-xs font-semibold text-[#181B24] hover:bg-[#F0F3FA] transition-colors cursor-pointer"
              >
                <span>Apple</span>
              </button>
            </div>

            <p className="text-[11px] text-[#5A5E6B] text-center mt-5">
              By continuing, you agree to TradingView's Terms of Service and Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
