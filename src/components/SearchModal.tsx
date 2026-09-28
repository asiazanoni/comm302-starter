import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { ALL_SEARCHABLE_ASSETS } from '../data/marketData';
import { MarketAsset } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectAsset }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent if listened or we can listen globally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stock', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'index', label: 'Indices' },
    { id: 'commodity', label: 'Commodities' },
    { id: 'forex', label: 'Forex' },
    { id: 'etf', label: 'ETFs' }
  ];

  const filtered = ALL_SEARCHABLE_ASSETS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.sector && item.sector.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#E0E3EB] gap-3 bg-[#FFFFFF]">
          <Search className="w-5 h-5 text-[#5A5E6B] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search markets, symbols, or companies (e.g. NVDA, Bitcoin, Gold)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#181B24] placeholder-[#5A5E6B] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#5A5E6B] hover:text-[#181B24] p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-[#5A5E6B] hover:text-[#181B24] bg-[#F0F3FA] rounded-md font-medium"
          >
            ESC
          </button>
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#E0E3EB] bg-[#F0F3FA] overflow-x-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-[#181B24] text-white shadow-xs'
                  : 'bg-white text-[#5A5E6B] hover:text-[#181B24] border border-[#E0E3EB]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#E0E3EB] p-2 flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#5A5E6B]">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-[#5A5E6B] mt-1">
                Try searching for "NVIDIA", "Dow", "Crypto", or "Gold"
              </p>
            </div>
          ) : (
            filtered.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.id + item.symbol}
                  onClick={() => {
                    onSelectAsset(item);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F3FA] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#F0F3FA] group-hover:bg-[#E0E3EB] flex items-center justify-center font-bold text-xs text-[#181B24] flex-shrink-0">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-[#181B24] truncate">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#E0E3EB] text-[#5A5E6B]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A5E6B] truncate">{item.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 text-right">
                    <div>
                      <div className="font-numeric-table font-semibold text-xs sm:text-sm text-[#181B24]">
                        {item.currency === 'USD' ? '$' : item.currency === 'EUR' ? '€' : ''}
                        {item.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4
                        })}
                      </div>
                      <div
                        className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>
                          {isPositive ? '+' : ''}
                          {item.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5A5E6B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
