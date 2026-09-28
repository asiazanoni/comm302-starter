import React from 'react';
import { MarketAsset } from '../types/market';

interface IndicesSectionProps {
  indices: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onSeeAll: () => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  onSelectAsset,
  onSeeAll
}) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-6" id="indices">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          onClick={onSeeAll}
          className="flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-['Inter'] text-2xl sm:text-3xl font-bold tracking-tight text-[#181B24] group-hover:text-[#0049DB] transition-colors">
            Indices
          </h2>
          <span className="material-symbols-outlined text-[24px] text-[#181B24] group-hover:translate-x-1 group-hover:text-[#0049DB] transition-all">
            chevron_right
          </span>
        </div>

        <button
          onClick={onSeeAll}
          className="text-xs sm:text-sm font-semibold text-[#0049DB] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>See all major indices</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((item) => {
          const isPositive = item.changePercent >= 0;
          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset(item)}
              className="p-4 bg-[#F0F3FA] rounded-2xl flex flex-col justify-between hover:bg-[#E0E3EB] transition-all cursor-pointer group shadow-xs hover:shadow-sm"
            >
              {/* Card Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs"
                    style={{
                      backgroundColor: item.badgeBg || '#181B24',
                      color: item.badgeColor || '#FFFFFF'
                    }}
                  >
                    {item.badgeText || item.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-['Inter'] font-bold text-sm text-[#181B24]">
                        {item.symbol}
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-[#5A5E6B] opacity-0 group-hover:opacity-100 transition-opacity">
                        open_in_new
                      </span>
                    </div>
                    <span className="text-xs text-[#5A5E6B] block truncate max-w-[120px]">
                      {item.exchange}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    isPositive
                      ? 'bg-[#E6F4F1] text-[#089981]'
                      : 'bg-[#FDECEE] text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* Card Mid: Price & Sparkline */}
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="font-['Inter'] font-bold text-xl sm:text-2xl text-[#181B24] tracking-tight font-numeric-table block">
                    {item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                  <div
                    className={`text-xs font-semibold font-numeric-table ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {item.change.toFixed(2)}
                  </div>
                </div>

                {/* Vector Sparkline Curve */}
                <div className="w-24 h-10">
                  <svg
                    className={`w-full h-full ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                    viewBox="0 0 100 40"
                    fill="none"
                  >
                    {isPositive ? (
                      <>
                        <path
                          d="M0 32 Q 20 28, 40 18 T 75 14 T 100 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 32 Q 20 28, 40 18 T 75 14 T 100 6 L 100 40 L 0 40 Z"
                          fill="currentColor"
                          fillOpacity="0.08"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M0 10 Q 30 14, 55 25 T 80 20 T 100 34"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 10 Q 30 14, 55 25 T 80 20 T 100 34 L 100 40 L 0 40 Z"
                          fill="currentColor"
                          fillOpacity="0.08"
                        />
                      </>
                    )}
                  </svg>
                </div>
              </div>

              {/* Card Bottom: Range L / H */}
              <div className="mt-3 pt-2 border-t border-[#E0E3EB]/60 flex justify-between text-[11px] text-[#5A5E6B] font-numeric-table">
                <span>
                  L:{' '}
                  {item.low?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
                <span>
                  H:{' '}
                  {item.high?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
