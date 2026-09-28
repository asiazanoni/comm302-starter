import React, { useState } from 'react';
import { MarketAsset } from '../types/market';
import {
  HIGHEST_VOLUME_STOCKS,
  GAINERS_REGULAR,
  GAINERS_PREMARKET,
  LOSERS_REGULAR,
  LOSERS_PREMARKET,
  MOST_VOLATILE
} from '../data/marketData';

interface USStocksSectionProps {
  onSelectAsset: (asset: MarketAsset) => void;
  onOpenQuickTicker: (symbol: string) => void;
}

export const USStocksSection: React.FC<USStocksSectionProps> = ({
  onSelectAsset,
  onOpenQuickTicker
}) => {
  const [gainersMode, setGainersMode] = useState<'regular' | 'premarket'>('regular');
  const [losersMode, setLosersMode] = useState<'regular' | 'premarket'>('regular');

  const currentGainers = gainersMode === 'regular' ? GAINERS_REGULAR : GAINERS_PREMARKET;
  const currentLosers = losersMode === 'regular' ? LOSERS_REGULAR : LOSERS_PREMARKET;

  const quickTickers = [
    { label: 'NVIDIA', symbol: 'NVDA' },
    { label: 'Apple', symbol: 'AAPL' },
    { label: 'Amazon', symbol: 'AMZN' },
    { label: 'Alphabet', symbol: 'GOOG' },
    { label: 'Tesla', symbol: 'TSLA' },
    { label: 'Microsoft', symbol: 'MSFT' }
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-6" id="us-stocks">
      {/* Header and Quick Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div
          onClick={() => onOpenQuickTicker('NVDA')}
          className="flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-['Inter'] text-2xl sm:text-3xl font-bold tracking-tight text-[#181B24] group-hover:text-[#0049DB] transition-colors">
            US stocks
          </h2>
          <span className="material-symbols-outlined text-[24px] text-[#181B24] group-hover:translate-x-1 group-hover:text-[#0049DB] transition-all">
            chevron_right
          </span>
        </div>

        {/* Quick Tickers Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quickTickers.map((t) => (
            <button
              key={t.symbol}
              onClick={() => onOpenQuickTicker(t.symbol)}
              className="px-3 py-1 rounded-full bg-[#F0F3FA] text-[#181B24] text-xs font-semibold hover:bg-[#E0E3EB] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Columns Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1: Highest Volume */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-['Inter'] font-bold text-base text-[#181B24]">Highest volume</h3>
              <span className="material-symbols-outlined text-[#5A5E6B] text-[20px]">
                bar_chart
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {HIGHEST_VOLUME_STOCKS.map((stock) => {
                const isPositive = stock.changePercent >= 0;
                return (
                  <div
                    key={stock.id}
                    onClick={() => onSelectAsset(stock)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#E0E3EB] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-2xs"
                        style={{
                          backgroundColor: stock.badgeBg || '#FFFFFF',
                          color: stock.badgeColor || '#0049DB'
                        }}
                      >
                        {stock.badgeText || stock.symbol}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-[#181B24]">{stock.symbol}</div>
                        <div className="text-[11px] text-[#5A5E6B] truncate">{stock.name}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-numeric-table font-semibold text-xs text-[#181B24]">
                        {stock.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] font-medium font-numeric-table ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onOpenQuickTicker('NVDA')}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/80 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>See all actively traded</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Column 2: Stock Gainers */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Inter'] font-bold text-base text-[#181B24]">Stock gainers</h3>
              <span className="material-symbols-outlined text-[#089981] text-[20px]">
                trending_up
              </span>
            </div>

            {/* Toggle: Regular vs Pre-market */}
            <div className="flex items-center gap-1 mb-3">
              <button
                onClick={() => setGainersMode('regular')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  gainersMode === 'regular'
                    ? 'bg-[#181B24] text-white'
                    : 'text-[#5A5E6B] hover:text-[#181B24]'
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setGainersMode('premarket')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  gainersMode === 'premarket'
                    ? 'bg-[#181B24] text-white'
                    : 'text-[#5A5E6B] hover:text-[#181B24]'
                }`}
              >
                Pre-market
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {currentGainers.map((stock) => (
                <div
                  key={stock.id}
                  onClick={() => onSelectAsset(stock)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#E0E3EB] transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#181B24]">{stock.symbol}</div>
                    <div className="text-[11px] text-[#5A5E6B] truncate">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-numeric-table font-semibold text-xs text-[#181B24]">
                      {stock.price.toFixed(2)}
                    </div>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-[#E6F4F1] text-[#089981] text-[11px] font-bold font-numeric-table">
                      +{stock.changePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onOpenQuickTicker('COIN')}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/80 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>See all daily gainers</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Column 3: Stock Losers */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Inter'] font-bold text-base text-[#181B24]">Stock losers</h3>
              <span className="material-symbols-outlined text-[#F23645] text-[20px]">
                trending_down
              </span>
            </div>

            {/* Toggle: Regular vs Pre-market */}
            <div className="flex items-center gap-1 mb-3">
              <button
                onClick={() => setLosersMode('regular')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  losersMode === 'regular'
                    ? 'bg-[#181B24] text-white'
                    : 'text-[#5A5E6B] hover:text-[#181B24]'
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setLosersMode('premarket')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  losersMode === 'premarket'
                    ? 'bg-[#181B24] text-white'
                    : 'text-[#5A5E6B] hover:text-[#181B24]'
                }`}
              >
                Pre-market
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {currentLosers.map((stock) => (
                <div
                  key={stock.id}
                  onClick={() => onSelectAsset(stock)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#E0E3EB] transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#181B24]">{stock.symbol}</div>
                    <div className="text-[11px] text-[#5A5E6B] truncate">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-numeric-table font-semibold text-xs text-[#181B24]">
                      {stock.price.toFixed(2)}
                    </div>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-[#FDECEE] text-[#F23645] text-[11px] font-bold font-numeric-table">
                      {stock.changePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onOpenQuickTicker('SNDK')}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/80 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>See all daily losers</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Column 4: Most Volatile */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-['Inter'] font-bold text-base text-[#181B24]">Most volatile</h3>
              <span className="material-symbols-outlined text-[#5A5E6B] text-[20px]">
                show_chart
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {MOST_VOLATILE.map((stock) => {
                const isPositive = stock.changePercent >= 0;
                return (
                  <div
                    key={stock.id}
                    onClick={() => onSelectAsset(stock)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#E0E3EB] transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-[#181B24]">{stock.symbol}</div>
                      <div className="text-[11px] text-[#5A5E6B] truncate">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-numeric-table font-semibold text-xs text-[#181B24]">
                        {stock.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] font-semibold font-numeric-table ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        ±{Math.abs(stock.changePercent).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onOpenQuickTicker('AXG')}
            className="mt-4 pt-2 border-t border-[#E0E3EB]/80 text-xs font-semibold text-[#0049DB] hover:underline flex items-center justify-between cursor-pointer"
          >
            <span>See all volatile stocks</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};
