import React from 'react';
import { TODAY_EARNINGS } from '../data/marketData';

interface EarningsStripProps {
  onOpenCalendar: () => void;
  onSelectTicker: (symbol: string) => void;
}

export const EarningsStrip: React.FC<EarningsStripProps> = ({
  onOpenCalendar,
  onSelectTicker
}) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-2">
      <div className="p-4 bg-[#F0F3FA] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Label */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="material-symbols-outlined text-[#0049DB] text-[22px]">
            calendar_month
          </span>
          <div className="font-['Inter'] font-bold text-xs sm:text-sm text-[#181B24]">
            Today's Earnings
          </div>
        </div>

        {/* Horizontal Tickers */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full pb-1 scrollbar-none">
          {TODAY_EARNINGS.map((item) => {
            const isEstPositive = item.estimate.startsWith('$');
            const isEstNegative = item.estimate.startsWith('-$');
            return (
              <div
                key={item.id}
                onClick={() => onSelectTicker(item.symbol)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] rounded-full flex-shrink-0 hover:shadow-xs transition-shadow cursor-pointer border border-transparent hover:border-[#E0E3EB]"
              >
                <span className="font-bold text-xs text-[#181B24]">{item.symbol}</span>
                <span className="text-[11px] text-[#5A5E6B]">{item.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold font-numeric-table ${
                    isEstPositive
                      ? 'bg-[#E6F4F1] text-[#089981]'
                      : isEstNegative
                      ? 'bg-[#FDECEE] text-[#F23645]'
                      : 'bg-[#F0F3FA] text-[#5A5E6B]'
                  }`}
                >
                  Est: {item.estimate}
                </span>
              </div>
            );
          })}
        </div>

        {/* View Calendar Action */}
        <button
          onClick={onOpenCalendar}
          className="text-xs font-semibold text-[#0049DB] hover:underline flex items-center gap-1 flex-shrink-0 cursor-pointer"
        >
          <span>Calendar</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
