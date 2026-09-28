import React from 'react';
import { MarketAsset } from '../types/market';
import { MOST_TRADED_ETFS, MACRO_HEATMAP } from '../data/marketData';

interface ETFsAndHeatmapSectionProps {
  onSelectAsset: (asset: MarketAsset) => void;
  onOpenMacroModal: () => void;
}

export const ETFsAndHeatmapSection: React.FC<ETFsAndHeatmapSectionProps> = ({
  onSelectAsset,
  onOpenMacroModal
}) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-6" id="etfs">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Col 1: Most Traded ETFs */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                onClick={() => onSelectAsset(MOST_TRADED_ETFS[0])}
                className="flex items-center gap-1 group cursor-pointer"
              >
                <h3 className="font-['Inter'] font-bold text-base text-[#181B24] group-hover:text-[#0049DB] transition-colors">
                  Most traded ETFs
                </h3>
                <span className="material-symbols-outlined text-[20px] text-[#181B24]">
                  chevron_right
                </span>
              </div>
              <span className="material-symbols-outlined text-[#5A5E6B]">
                candlestick_chart
              </span>
            </div>

            <div className="space-y-2">
              {MOST_TRADED_ETFS.map((etf) => {
                const isPositive = etf.changePercent >= 0;
                return (
                  <div
                    key={etf.id}
                    onClick={() => onSelectAsset(etf)}
                    className="flex items-center justify-between p-3 bg-[#FFFFFF] rounded-xl hover:shadow-xs transition-all cursor-pointer border border-transparent hover:border-[#E0E3EB]"
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#181B24]">{etf.symbol}</div>
                      <span className="text-[11px] text-[#5A5E6B]">{etf.name}</span>
                    </div>

                    <div className="text-right">
                      <div className="font-numeric-table font-bold text-xs sm:text-sm text-[#181B24]">
                        ${etf.price.toFixed(2)}
                      </div>
                      <span
                        className={`text-[11px] font-semibold font-numeric-table ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {etf.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Col 2: Economic Indicators Heatmap */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 sm:p-6 flex flex-col justify-between" id="economy">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div
                onClick={onOpenMacroModal}
                className="flex items-center gap-1 group cursor-pointer"
              >
                <h3 className="font-['Inter'] font-bold text-base text-[#181B24] group-hover:text-[#0049DB] transition-colors">
                  Economic indicators heatmap
                </h3>
                <span className="material-symbols-outlined text-[20px] text-[#181B24]">
                  chevron_right
                </span>
              </div>
              <span className="material-symbols-outlined text-[#5A5E6B]">analytics</span>
            </div>

            {/* Matrix Heatmap */}
            <div className="grid grid-cols-4 gap-2 text-xs text-center font-numeric-table">
              {/* Table Headers */}
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-[#5A5E6B] text-[11px]">
                Country
              </div>
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-[#5A5E6B] text-[11px]">
                GDP YoY
              </div>
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-[#5A5E6B] text-[11px]">
                Inflation
              </div>
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-[#5A5E6B] text-[11px]">
                Rate
              </div>

              {/* USA */}
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-left text-[#181B24]">
                USA
              </div>
              <div className="p-2 bg-[#E6F4F1] text-[#089981] rounded-lg font-semibold">
                +2.8%
              </div>
              <div className="p-2 bg-[#E0E3EB] text-[#181B24] rounded-lg font-semibold">
                2.4%
              </div>
              <div className="p-2 bg-[#F0F3FA] rounded-lg font-bold text-[#181B24] border border-[#E0E3EB]/50">
                4.75%
              </div>

              {/* EU */}
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-left text-[#181B24]">
                EU
              </div>
              <div className="p-2 bg-[#E6F4F1] text-[#089981] rounded-lg font-semibold">
                +0.9%
              </div>
              <div className="p-2 bg-[#E6F4F1] text-[#089981] rounded-lg font-semibold">
                1.7%
              </div>
              <div className="p-2 bg-[#F0F3FA] rounded-lg font-bold text-[#181B24] border border-[#E0E3EB]/50">
                3.25%
              </div>

              {/* Japan */}
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-left text-[#181B24]">
                Japan
              </div>
              <div className="p-2 bg-[#FDECEE] text-[#F23645] rounded-lg font-semibold">
                -0.8%
              </div>
              <div className="p-2 bg-[#E0E3EB] text-[#181B24] rounded-lg font-semibold">
                2.5%
              </div>
              <div className="p-2 bg-[#F0F3FA] rounded-lg font-bold text-[#181B24] border border-[#E0E3EB]/50">
                0.25%
              </div>

              {/* China */}
              <div className="p-2 bg-[#FFFFFF] rounded-lg font-bold text-left text-[#181B24]">
                China
              </div>
              <div className="p-2 bg-[#E6F4F1] text-[#089981] rounded-lg font-semibold">
                +4.6%
              </div>
              <div className="p-2 bg-[#E6F4F1] text-[#089981] rounded-lg font-semibold">
                0.4%
              </div>
              <div className="p-2 bg-[#F0F3FA] rounded-lg font-bold text-[#181B24] border border-[#E0E3EB]/50">
                3.10%
              </div>
            </div>
          </div>

          <button
            onClick={onOpenMacroModal}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/70 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>Explore global macro maps</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};
