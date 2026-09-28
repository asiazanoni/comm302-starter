import React from 'react';
import { MarketAsset } from '../types/market';
import { CRYPTO_ASSETS, CRYPTO_GAINERS, CRYPTO_LOSERS } from '../data/marketData';

interface CryptoSectionProps {
  onSelectAsset: (asset: MarketAsset) => void;
  onSeeAllCoins: () => void;
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({
  onSelectAsset,
  onSeeAllCoins
}) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-6" id="crypto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          onClick={onSeeAllCoins}
          className="flex items-center gap-1 group cursor-pointer"
        >
          <h2 className="font-['Inter'] text-2xl sm:text-3xl font-bold tracking-tight text-[#181B24] group-hover:text-[#0049DB] transition-colors">
            Crypto
          </h2>
          <span className="material-symbols-outlined text-[24px] text-[#181B24] group-hover:translate-x-1 group-hover:text-[#0049DB] transition-all">
            chevron_right
          </span>
        </div>

        <button
          onClick={onSeeAllCoins}
          className="text-xs sm:text-sm font-semibold text-[#0049DB] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>See all coins</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {CRYPTO_ASSETS.map((coin) => {
          const isPositive = coin.changePercent >= 0;
          return (
            <div
              key={coin.id}
              onClick={() => onSelectAsset(coin)}
              className="p-4 bg-[#F0F3FA] rounded-2xl flex flex-col justify-between hover:bg-[#E0E3EB] transition-all cursor-pointer shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base shadow-xs"
                    style={{
                      backgroundColor: coin.badgeBg || '#181B24',
                      color: coin.badgeColor || '#FFFFFF'
                    }}
                  >
                    {coin.badgeText}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#181B24]">{coin.symbol}</div>
                    <span className="text-xs text-[#5A5E6B]">{coin.name}</span>
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
                  {coin.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="font-['Inter'] font-bold text-xl sm:text-2xl text-[#181B24] tracking-tight font-numeric-table block">
                    ${coin.price.toLocaleString(undefined, {
                      minimumFractionDigits: coin.price < 10 ? 2 : 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                  <div
                    className={`text-xs font-semibold font-numeric-table ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}${coin.change.toFixed(coin.price < 10 ? 3 : 2)}
                  </div>
                </div>

                <div className="w-20 h-8">
                  <svg
                    className={`w-full h-full ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                    viewBox="0 0 100 40"
                    fill="none"
                  >
                    {isPositive ? (
                      <path
                        d="M0 35 L 20 28 L 40 32 L 60 15 L 80 18 L 100 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M0 12 L 30 18 L 60 14 L 85 28 L 100 32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Crypto Movers 2-Column Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crypto Gainers */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-['Inter'] font-bold text-base text-[#181B24]">Crypto gainers</h3>
            <span className="material-symbols-outlined text-[#089981] text-[20px]">
              rocket_launch
            </span>
          </div>

          <div className="space-y-1.5">
            {CRYPTO_GAINERS.map((coin) => (
              <div
                key={coin.id}
                onClick={() =>
                  onSelectAsset({
                    id: coin.id,
                    symbol: coin.symbol,
                    name: coin.code,
                    exchange: 'CRYPTO',
                    category: 'crypto',
                    price: coin.price,
                    currency: 'USD',
                    change: (coin.price * coin.changePercent) / 100,
                    changePercent: coin.changePercent,
                    sparkline: [coin.price * 0.7, coin.price]
                  })
                }
                className="flex items-center justify-between p-2 rounded-xl hover:bg-[#E0E3EB] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#181B24]">{coin.symbol}</span>
                  <span className="text-[11px] text-[#5A5E6B]">{coin.code}</span>
                </div>
                <span className="font-numeric-table text-xs font-bold text-[#089981] bg-[#E6F4F1] px-2 py-0.5 rounded">
                  +{coin.changePercent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Crypto Losers */}
        <div className="bg-[#F0F3FA] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-['Inter'] font-bold text-base text-[#181B24]">Crypto losers</h3>
            <span className="material-symbols-outlined text-[#F23645] text-[20px]">
              trending_down
            </span>
          </div>

          <div className="space-y-1.5">
            {CRYPTO_LOSERS.map((coin) => (
              <div
                key={coin.id}
                onClick={() =>
                  onSelectAsset({
                    id: coin.id,
                    symbol: coin.symbol,
                    name: coin.code,
                    exchange: 'CRYPTO',
                    category: 'crypto',
                    price: coin.price,
                    currency: 'USD',
                    change: (coin.price * coin.changePercent) / 100,
                    changePercent: coin.changePercent,
                    sparkline: [coin.price * 1.2, coin.price]
                  })
                }
                className="flex items-center justify-between p-2 rounded-xl hover:bg-[#E0E3EB] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#181B24]">{coin.symbol}</span>
                  <span className="text-[11px] text-[#5A5E6B]">{coin.code}</span>
                </div>
                <span className="font-numeric-table text-xs font-bold text-[#F23645] bg-[#FDECEE] px-2 py-0.5 rounded">
                  {coin.changePercent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
