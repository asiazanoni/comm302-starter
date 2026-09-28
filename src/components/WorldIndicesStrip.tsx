import React from 'react';
import { MarketAsset } from '../types/market';

interface WorldIndicesStripProps {
  indices: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const WorldIndicesStrip: React.FC<WorldIndicesStripProps> = ({
  indices,
  onSelectAsset
}) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-4">
      <div className="bg-[#F0F3FA] rounded-2xl p-5 sm:p-6">
        {/* Strip Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-['Inter'] text-lg font-bold text-[#181B24]">World indices</h3>
            <span className="material-symbols-outlined text-[#5A5E6B] text-[20px]">public</span>
          </div>
          <span className="text-xs text-[#5A5E6B] font-medium hidden sm:inline">
            Global equity benchmarks
          </span>
        </div>

        {/* 6 Columns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {indices.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectAsset(item)}
                className="p-3 bg-[#FFFFFF] rounded-xl hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-[#E0E3EB]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-[#5A5E6B] uppercase">
                    {item.country}
                  </span>
                  <span
                    className={`text-[11px] font-bold ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="font-bold text-xs sm:text-sm text-[#181B24] truncate group-hover:text-[#0049DB] transition-colors">
                  {item.symbol}
                </div>
                <div className="text-[11px] text-[#5A5E6B] truncate mb-2">{item.name}</div>
                <div className="font-numeric-table font-semibold text-xs sm:text-sm text-[#181B24]">
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
