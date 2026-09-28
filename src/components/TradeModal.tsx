import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface TradeModalProps {
  asset: MarketAsset | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({ asset, isOpen, onClose }) => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [shares, setShares] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(asset ? asset.price : 100);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !asset) return null;

  const effectivePrice = orderType === 'market' ? asset.price : limitPrice;
  const estimatedTotal = shares * effectivePrice;
  const simulatedBuyingPower = 125480.00;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E0E3EB] bg-[#FAF9FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F0F3FA] flex items-center justify-center font-bold text-sm text-[#181B24]">
              {asset.badgeText || asset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-[#181B24]">{asset.symbol}</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#E0E3EB] text-[#5A5E6B]">
                  {asset.exchange}
                </span>
              </div>
              <p className="text-xs text-[#5A5E6B] font-medium">{asset.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5A5E6B] hover:text-[#181B24] hover:bg-[#E0E3EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-14 h-14 text-[#089981] mb-3 animate-bounce" />
            <h4 className="font-bold text-lg text-[#181B24]">Order Executed!</h4>
            <p className="text-xs text-[#5A5E6B] mt-1 max-w-xs">
              Filled {shares} shares of {asset.symbol} at ${effectivePrice.toFixed(2)} (${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
            </p>
            <div className="mt-4 px-3 py-1 bg-[#E6F4F1] text-[#089981] rounded-full text-xs font-semibold">
              Paper Trading Account #8291
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-5 space-y-4">
            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#F0F3FA] rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setSide('buy')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  side === 'buy'
                    ? 'bg-[#089981] text-white shadow-xs'
                    : 'text-[#5A5E6B] hover:text-[#181B24]'
                }`}
              >
                BUY {asset.symbol}
              </button>
              <button
                type="button"
                onClick={() => setSide('sell')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  side === 'sell'
                    ? 'bg-[#F23645] text-white shadow-xs'
                    : 'text-[#5A5E6B] hover:text-[#181B24]'
                }`}
              >
                SELL {asset.symbol}
              </button>
            </div>

            {/* Order Type */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5A5E6B] font-medium">Order Type</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setOrderType('market')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    orderType === 'market'
                      ? 'bg-[#181B24] text-white'
                      : 'bg-[#F0F3FA] text-[#5A5E6B] hover:text-[#181B24]'
                  }`}
                >
                  Market
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('limit')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    orderType === 'limit'
                      ? 'bg-[#181B24] text-white'
                      : 'bg-[#F0F3FA] text-[#5A5E6B] hover:text-[#181B24]'
                  }`}
                >
                  Limit
                </button>
              </div>
            </div>

            {/* Shares input */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <label className="text-[#5A5E6B] font-medium">Shares Quantity</label>
                <span className="text-[#5A5E6B] text-[11px]">Avail: {simulatedBuyingPower > 0 ? 'Plenty' : '0'}</span>
              </div>
              <div className="flex items-center bg-[#F0F3FA] border border-[#E0E3EB] rounded-xl px-3 py-2">
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={shares}
                  onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-transparent text-sm font-bold text-[#181B24] focus:outline-none font-numeric-table"
                />
                <div className="flex gap-1">
                  {[5, 10, 50, 100].map((quick) => (
                    <button
                      key={quick}
                      type="button"
                      onClick={() => setShares(quick)}
                      className="px-2 py-0.5 text-[10px] font-semibold bg-white rounded border border-[#E0E3EB] text-[#5A5E6B] hover:text-[#181B24]"
                    >
                      {quick}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Limit price input if limit order */}
            {orderType === 'limit' && (
              <div>
                <label className="text-[#5A5E6B] font-medium text-xs block mb-1">Limit Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(parseFloat(e.target.value) || asset.price)}
                  className="w-full bg-[#F0F3FA] border border-[#E0E3EB] rounded-xl px-3 py-2 text-sm font-bold text-[#181B24] focus:outline-none font-numeric-table"
                />
              </div>
            )}

            {/* Price calculation overview */}
            <div className="bg-[#FAF9FF] border border-[#E0E3EB] rounded-xl p-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5A5E6B]">
                <span>Market Price</span>
                <span className="font-numeric-table font-semibold text-[#181B24]">
                  ${asset.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#5A5E6B]">
                <span>Estimated Cost</span>
                <span className="font-numeric-table font-bold text-[#181B24]">
                  ${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-[#5A5E6B] pt-1 border-t border-[#E0E3EB]">
                <span>Demo Buying Power</span>
                <span className="font-numeric-table text-[#089981] font-semibold">
                  ${simulatedBuyingPower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className={`w-full py-3 rounded-full text-white text-xs font-bold shadow-sm transition-all cursor-pointer ${
                side === 'buy'
                  ? 'bg-[#089981] hover:bg-[#077d69]'
                  : 'bg-[#F23645] hover:bg-[#d62837]'
              }`}
            >
              Confirm {side.toUpperCase()} {shares} Shares
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
