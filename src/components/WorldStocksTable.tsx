import React from 'react';
import { MarketAsset } from '../types/market';
import { WORLD_BIGGEST_COMPANIES } from '../data/marketData';

interface WorldStocksTableProps {
  onSelectAsset: (asset: MarketAsset) => void;
  onTradeAsset: (asset: MarketAsset) => void;
  onSeeAll: () => void;
}

export const WorldStocksTable: React.FC<WorldStocksTableProps> = ({
  onSelectAsset,
  onTradeAsset,
  onSeeAll
}) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-6" id="world-stocks">
      {/* Table Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div
            onClick={onSeeAll}
            className="flex items-center gap-1 group cursor-pointer"
          >
            <h2 className="font-['Inter'] text-2xl sm:text-3xl font-bold tracking-tight text-[#181B24] group-hover:text-[#0049DB] transition-colors">
              World stocks
            </h2>
            <span className="material-symbols-outlined text-[24px] text-[#181B24] group-hover:translate-x-1 group-hover:text-[#0049DB] transition-all">
              chevron_right
            </span>
          </div>
          <p className="text-xs text-[#5A5E6B] mt-0.5">
            Largest market capitalization global corporations
          </p>
        </div>

        <button
          onClick={onSeeAll}
          className="text-xs sm:text-sm font-semibold text-[#0049DB] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>See all world major companies</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="w-full bg-[#FFFFFF] rounded-2xl shadow-xs overflow-hidden border border-[#E0E3EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F0F3FA] text-[#5A5E6B] text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6"># Company</th>
                <th className="py-3 px-4 sm:px-6 text-right">Price</th>
                <th className="py-3 px-4 sm:px-6 text-right">24h Change</th>
                <th className="py-3 px-4 sm:px-6 text-right">Market Cap</th>
                <th className="py-3 px-4 sm:px-6 text-center hidden md:table-cell">Country</th>
                <th className="py-3 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {WORLD_BIGGEST_COMPANIES.map((company, index) => {
                const isPositive = company.changePercent >= 0;
                return (
                  <tr
                    key={company.id}
                    onClick={() => onSelectAsset(company)}
                    className="hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                  >
                    {/* Index + Logo + Name */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="font-numeric-table text-xs text-[#5A5E6B] w-4">
                          {index + 1}
                        </span>
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-2xs flex-shrink-0"
                          style={{
                            backgroundColor: company.badgeBg || '#F0F3FA',
                            color: company.badgeColor || '#181B24'
                          }}
                        >
                          {company.badgeText || company.symbol[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="font-['Inter'] font-bold text-xs sm:text-sm text-[#181B24] flex items-center gap-1.5 flex-wrap">
                            <span>{company.name}</span>
                            <span className="px-1.5 py-0.2 rounded bg-[#F0F3FA] text-[#5A5E6B] text-[11px] font-semibold">
                              {company.symbol}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#5A5E6B] block truncate">
                            {company.exchange}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 sm:px-6 text-right font-numeric-table font-semibold text-xs sm:text-sm text-[#181B24]">
                      {company.currency === 'NT$' ? 'NT$' : '$'}
                      {company.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>

                    {/* 24h Change */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold font-numeric-table ${
                          isPositive
                            ? 'bg-[#E6F4F1] text-[#089981]'
                            : 'bg-[#FDECEE] text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {company.changePercent.toFixed(2)}%
                      </span>
                    </td>

                    {/* Market Cap */}
                    <td className="py-3.5 px-4 sm:px-6 text-right font-numeric-table font-bold text-xs sm:text-sm text-[#181B24]">
                      {company.marketCap}
                    </td>

                    {/* Country */}
                    <td className="py-3.5 px-4 sm:px-6 text-center hidden md:table-cell">
                      <span className="text-xs text-[#5A5E6B] font-medium">
                        {company.country}
                      </span>
                    </td>

                    {/* Trade Button */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTradeAsset(company);
                        }}
                        className="px-3.5 py-1 rounded-full bg-[#F0F3FA] group-hover:bg-[#0049DB] group-hover:text-[#FFFFFF] text-[#5A5E6B] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
