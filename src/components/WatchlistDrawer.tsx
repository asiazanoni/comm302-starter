import React from 'react';
import { X, Trash2, ArrowUpRight, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: MarketAsset[];
  onRemove: (id: string) => void;
  onSelectAsset: (asset: MarketAsset) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onSelectAsset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col border-l border-[#E0E3EB] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E0E3EB] bg-[#FAF9FF]">
          <div>
            <h3 className="font-bold text-base text-[#181B24]">Your Watchlist</h3>
            <p className="text-xs text-[#5A5E6B]">{watchlist.length} pinned instruments</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5A5E6B] hover:text-[#181B24] hover:bg-[#E0E3EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Watchlist Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {watchlist.length === 0 ? (
            <div className="py-20 text-center text-[#5A5E6B]">
              <p className="text-sm font-semibold">Your watchlist is currently empty</p>
              <p className="text-xs text-[#5A5E6B] mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any index, stock, crypto, or commodity card to save it here for fast tracking.
              </p>
            </div>
          ) : (
            watchlist.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F0F3FA] hover:bg-[#E0E3EB] transition-colors group cursor-pointer"
                  onClick={() => {
                    onSelectAsset(item);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#181B24] shadow-xs">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-[#181B24] truncate">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-[#5A5E6B]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5A5E6B] truncate">{item.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-numeric-table font-semibold text-xs text-[#181B24]">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-[11px] font-bold flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(item.id);
                      }}
                      className="p-1 rounded-md text-[#5A5E6B] hover:text-[#F23645] hover:bg-white transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E0E3EB] bg-[#FAF9FF] flex justify-between items-center text-xs text-[#5A5E6B]">
          <span>Synced locally to browser storage</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#181B24] text-white rounded-full font-semibold hover:bg-black transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
