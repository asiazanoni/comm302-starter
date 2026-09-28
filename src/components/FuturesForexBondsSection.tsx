import React from 'react';
import { MarketAsset } from '../types/market';
import { FUTURES_METALS, CURRENCIES_FOREX, SOVEREIGN_YIELDS } from '../data/marketData';

interface FuturesForexBondsSectionProps {
  onSelectAsset: (asset: MarketAsset) => void;
  onOpenMacroModal: () => void;
}

export const FuturesForexBondsSection: React.FC<FuturesForexBondsSectionProps> = ({
  onSelectAsset,
  onOpenMacroModal
}) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-6" id="futures">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Col 1: Futures & Metals */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 group cursor-pointer">
                <h3 className="font-['Inter'] font-bold text-base text-[#181B24] group-hover:text-[#0049DB] transition-colors">
                  Futures & Metals
                </h3>
                <span className="material-symbols-outlined text-[20px] text-[#181B24]">
                  chevron_right
                </span>
              </div>
              <span className="material-symbols-outlined text-[#5A5E6B]">grain</span>
            </div>

            <div className="space-y-2.5">
              {FUTURES_METALS.map((item) => {
                const isPositive = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAsset(item)}
                    className="flex items-center justify-between p-2.5 bg-[#FFFFFF] rounded-xl hover:shadow-xs transition-all cursor-pointer border border-transparent hover:border-[#E0E3EB]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                        style={{
                          backgroundColor: item.badgeBg || '#F0F3FA',
                          color: item.badgeColor || '#181B24'
                        }}
                      >
                        {item.badgeText}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#181B24]">{item.symbol}</div>
                        <span className="text-[11px] text-[#5A5E6B]">{item.name}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-numeric-table font-bold text-xs sm:text-sm text-[#181B24]">
                        {item.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </div>
                      <span
                        className={`text-[11px] font-semibold font-numeric-table ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onSelectAsset(FUTURES_METALS[0])}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/70 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>See all commodities</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Col 2: Currencies & Forex */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 sm:p-6 flex flex-col justify-between" id="forex">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 group cursor-pointer">
                <h3 className="font-['Inter'] font-bold text-base text-[#181B24] group-hover:text-[#0049DB] transition-colors">
                  Currencies
                </h3>
                <span className="material-symbols-outlined text-[20px] text-[#181B24]">
                  chevron_right
                </span>
              </div>
              <span className="material-symbols-outlined text-[#5A5E6B]">currency_exchange</span>
            </div>

            <div className="space-y-2.5">
              {CURRENCIES_FOREX.map((item) => {
                const isPositive = item.changePercent >= 0;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAsset(item)}
                    className="flex items-center justify-between p-2.5 bg-[#FFFFFF] rounded-xl hover:shadow-xs transition-all cursor-pointer border border-transparent hover:border-[#E0E3EB]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                        style={{
                          backgroundColor: item.badgeBg || '#F0F3FA',
                          color: item.badgeColor || '#181B24'
                        }}
                      >
                        {item.badgeText}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#181B24]">{item.symbol}</div>
                        <span className="text-[11px] text-[#5A5E6B]">{item.name}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-numeric-table font-bold text-xs sm:text-sm text-[#181B24]">
                        {item.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4
                        })}
                      </div>
                      <span
                        className={`text-[11px] font-semibold font-numeric-table ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onSelectAsset(CURRENCIES_FOREX[0])}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/70 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>See all major pairs</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Col 3: 10Y Sovereign Yields */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 sm:p-6 flex flex-col justify-between" id="bonds">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 group cursor-pointer">
                <h3 className="font-['Inter'] font-bold text-base text-[#181B24] group-hover:text-[#0049DB] transition-colors">
                  10Y Sovereign Yields
                </h3>
                <span className="material-symbols-outlined text-[20px] text-[#181B24]">
                  chevron_right
                </span>
              </div>
              <span className="material-symbols-outlined text-[#5A5E6B]">account_balance</span>
            </div>

            <div className="space-y-2.5">
              {SOVEREIGN_YIELDS.map((item) => (
                <div
                  key={item.id}
                  onClick={onOpenMacroModal}
                  className="flex items-center justify-between p-2.5 bg-[#FFFFFF] rounded-xl hover:shadow-xs transition-all cursor-pointer border border-transparent hover:border-[#E0E3EB]"
                >
                  <div>
                    <div className="font-bold text-xs text-[#181B24]">{item.symbol}</div>
                    <span className="text-[11px] text-[#5A5E6B]">{item.code}</span>
                  </div>

                  <div className="text-right">
                    <div className="font-numeric-table font-bold text-xs sm:text-sm text-[#181B24]">
                      {item.yield}
                    </div>
                    <span className="text-[11px] font-semibold text-[#F23645] font-numeric-table">
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenMacroModal}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/70 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>Customize yield curves</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};
