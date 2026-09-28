/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IndicesSection } from './components/IndicesSection';
import { WorldIndicesStrip } from './components/WorldIndicesStrip';
import { USStocksSection } from './components/USStocksSection';
import { EarningsStrip } from './components/EarningsStrip';
import { WorldStocksTable } from './components/WorldStocksTable';
import { CryptoSection } from './components/CryptoSection';
import { FuturesForexBondsSection } from './components/FuturesForexBondsSection';
import { ETFsAndHeatmapSection } from './components/ETFsAndHeatmapSection';
import { Footer } from './components/Footer';

import { SearchModal } from './components/SearchModal';
import { AssetDetailModal } from './components/AssetDetailModal';
import { TradeModal } from './components/TradeModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { AuthModal } from './components/AuthModal';
import { EarningsCalendarModal } from './components/EarningsCalendarModal';
import { MacroHeatmapModal } from './components/MacroHeatmapModal';

import {
  MAJOR_INDICES,
  WORLD_INDICES,
  ALL_SEARCHABLE_ASSETS
} from './data/marketData';
import { MarketAsset, MarketRegion } from './types/market';
import { Clock, Check, Sparkles } from 'lucide-react';

export default function App() {
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [tradeAsset, setTradeAsset] = useState<MarketAsset | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isEarningsCalendarOpen, setIsEarningsCalendarOpen] = useState(false);
  const [isMacroModalOpen, setIsMacroModalOpen] = useState(false);

  // Region dropdown & category filter
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<MarketRegion>('global');
  const [activeCategory, setActiveCategory] = useState('indices');
  const [activeNav, setActiveNav] = useState('Markets');

  // Market hours status indicator modal
  const [showMarketHoursInfo, setShowMarketHoursInfo] = useState(false);
  const [liveSimActive, setLiveSimActive] = useState(true);

  // Live indices state for simulation
  const [indices, setIndices] = useState<MarketAsset[]>(MAJOR_INDICES);
  const [worldIndices, setWorldIndices] = useState<MarketAsset[]>(WORLD_INDICES);

  // Watchlist in localStorage
  const [watchlist, setWatchlist] = useState<MarketAsset[]>(() => {
    try {
      const saved = localStorage.getItem('tv_markets_watchlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [MAJOR_INDICES[0], MAJOR_INDICES[1], ALL_SEARCHABLE_ASSETS[1]]; // S&P 500, Nasdaq 100, NVDA
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleWatchlist = (asset: MarketAsset) => {
    const exists = watchlist.some((item) => item.id === asset.id);
    let updated: MarketAsset[];
    if (exists) {
      updated = watchlist.filter((item) => item.id !== asset.id);
      showToast(`Removed ${asset.symbol} from Watchlist`);
    } else {
      updated = [...watchlist, asset];
      showToast(`Added ${asset.symbol} to Watchlist`);
    }
    setWatchlist(updated);
    try {
      localStorage.setItem('tv_markets_watchlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveFromWatchlist = (id: string) => {
    const updated = watchlist.filter((item) => item.id !== id);
    setWatchlist(updated);
    try {
      localStorage.setItem('tv_markets_watchlist', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Keyboard shortcut listener for Ctrl+K / ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Subtle real-time price fluctuation simulation
  useEffect(() => {
    if (!liveSimActive) return;
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((idx) => {
          const delta = (Math.random() - 0.48) * (idx.price * 0.0003);
          const newPrice = Number((idx.price + delta).toFixed(2));
          const newChange = Number((idx.change + delta).toFixed(2));
          const newChangePercent = Number(((newChange / idx.prevClose!) * 100).toFixed(2));
          return {
            ...idx,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [liveSimActive]);

  const categoryPills = [
    { id: 'indices', label: 'Indices', href: '#indices' },
    { id: 'us-stocks', label: 'US stocks', href: '#us-stocks' },
    { id: 'world-stocks', label: 'World stocks', href: '#world-stocks' },
    { id: 'crypto', label: 'Crypto', href: '#crypto' },
    { id: 'futures', label: 'Futures', href: '#futures' },
    { id: 'forex', label: 'Forex', href: '#forex' },
    { id: 'bonds', label: 'Government bonds', href: '#bonds' },
    { id: 'corporate-bonds', label: 'Corporate bonds', href: '#bonds' },
    { id: 'etfs', label: 'ETFs', href: '#etfs' },
    { id: 'economy', label: 'Economy', href: '#economy' }
  ];

  const handlePillClick = (e: React.MouseEvent, pillId: string, href: string) => {
    e.preventDefault();
    setActiveCategory(pillId);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuickTicker = (symbol: string) => {
    const found = ALL_SEARCHABLE_ASSETS.find(
      (a) => a.symbol.toUpperCase() === symbol.toUpperCase()
    );
    if (found) {
      setSelectedAsset(found);
    }
  };

  const regionTitles: Record<MarketRegion, string> = {
    global: 'Markets, everywhere',
    americas: 'US & Americas Markets',
    europe: 'European Markets',
    asia: 'Asia-Pacific Markets',
    crypto: 'Crypto & Digital Assets'
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#181B24] font-['Inter',sans-serif] antialiased flex flex-col">
      {/* Fixed Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content Body */}
      <main className="w-full pt-16 flex-1">
        {/* Title & Primary Filter Navigation */}
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Main Interactive Title with Region Dropdown */}
            <div className="relative">
              <div
                onClick={() => setRegionMenuOpen(!regionMenuOpen)}
                className="flex items-center gap-2 group cursor-pointer select-none"
              >
                <h1 className="font-['Inter'] text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#181B24] tracking-tight flex items-center gap-2">
                  <span>{regionTitles[selectedRegion]}</span>
                  <span
                    className={`material-symbols-outlined text-[32px] sm:text-[36px] text-[#181B24] mt-1 transition-transform ${
                      regionMenuOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
                    }`}
                  >
                    expand_more
                  </span>
                </h1>
              </div>

              {/* Region Selector Popover */}
              {regionMenuOpen && (
                <div className="absolute left-0 mt-3 w-72 bg-[#FFFFFF] rounded-2xl shadow-xl border border-[#E0E3EB] py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 text-[11px] font-bold uppercase text-[#5A5E6B] border-b border-[#E0E3EB]">
                    Select Market Focus
                  </div>
                  {[
                    { id: 'global', label: 'Markets, everywhere (Global)', sub: 'Worldwide benchmarks' },
                    { id: 'americas', label: 'US & Americas Markets', sub: 'NYSE, NASDAQ, Russell' },
                    { id: 'europe', label: 'European Markets', sub: 'LSE, DAX, CAC 40' },
                    { id: 'asia', label: 'Asia-Pacific Markets', sub: 'Nikkei, Hang Seng, NIFTY' },
                    { id: 'crypto', label: 'Crypto & Digital Assets', sub: '24/7 Global Liquidity' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setSelectedRegion(r.id as MarketRegion);
                        setRegionMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-[#F0F3FA] transition-colors flex items-center justify-between cursor-pointer ${
                        selectedRegion === r.id ? 'bg-[#F0F3FA] font-bold text-[#0049DB]' : 'text-[#181B24]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold">{r.label}</div>
                        <div className="text-[10px] text-[#5A5E6B]">{r.sub}</div>
                      </div>
                      {selectedRegion === r.id && <Check className="w-4 h-4 text-[#0049DB]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Markets Open Pill & Live Ticking Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMarketHoursInfo(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F0F3FA] rounded-full cursor-pointer hover:bg-[#E0E3EB] transition-colors shadow-2xs border border-transparent hover:border-[#E0E3EB]"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#089981] animate-pulse"></span>
                <span className="text-xs text-[#181B24] font-semibold">Markets Open</span>
                <span className="text-xs text-[#5A5E6B]">NYSE / NASDAQ</span>
              </button>

              <button
                onClick={() => {
                  setLiveSimActive(!liveSimActive);
                  showToast(liveSimActive ? 'Live updates paused' : 'Live updates active');
                }}
                className={`p-1.5 rounded-full border transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                  liveSimActive
                    ? 'bg-[#E6F4F1] text-[#089981] border-[#089981]/30'
                    : 'bg-[#F0F3FA] text-[#5A5E6B] border-[#E0E3EB]'
                }`}
                title="Toggle live price ticks"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Category Navigation Pills Strip */}
          <div className="w-full overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1 p-1 bg-[#F0F3FA] rounded-full w-max">
              {categoryPills.map((pill) => {
                const isActive = activeCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={(e) => handlePillClick(e, pill.id, pill.href)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#181B24] text-white shadow-xs'
                        : 'text-[#5A5E6B] hover:text-[#181B24] hover:bg-white'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 1. Featured Major Indices */}
        <IndicesSection
          indices={indices}
          onSelectAsset={setSelectedAsset}
          onSeeAll={() => setIsSearchOpen(true)}
        />

        {/* 2. World Indices Bar */}
        <WorldIndicesStrip
          indices={worldIndices}
          onSelectAsset={setSelectedAsset}
        />

        {/* 3. US Stocks Section */}
        <USStocksSection
          onSelectAsset={setSelectedAsset}
          onOpenQuickTicker={handleOpenQuickTicker}
        />

        {/* 4. Earnings Calendar Ticker Strip */}
        <EarningsStrip
          onOpenCalendar={() => setIsEarningsCalendarOpen(true)}
          onSelectTicker={handleOpenQuickTicker}
        />

        {/* 5. World Biggest Companies Table */}
        <WorldStocksTable
          onSelectAsset={setSelectedAsset}
          onTradeAsset={(company) => setTradeAsset(company)}
          onSeeAll={() => setIsSearchOpen(true)}
        />

        {/* 6. Crypto Section */}
        <CryptoSection
          onSelectAsset={setSelectedAsset}
          onSeeAllCoins={() => setIsSearchOpen(true)}
        />

        {/* 7. Futures, Forex & Government Bonds */}
        <FuturesForexBondsSection
          onSelectAsset={setSelectedAsset}
          onOpenMacroModal={() => setIsMacroModalOpen(true)}
        />

        {/* 8. ETFs & Economic Indicators Heatmap */}
        <ETFsAndHeatmapSection
          onSelectAsset={setSelectedAsset}
          onOpenMacroModal={() => setIsMacroModalOpen(true)}
        />
      </main>

      {/* Complete Footer */}
      <Footer
        onNavClick={(item) => {
          showToast(`Navigating to ${item}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Interactive Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onOpenTrade={(asset) => setTradeAsset(asset)}
        isWatchlisted={selectedAsset ? watchlist.some((w) => w.id === selectedAsset.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
      />

      <TradeModal
        asset={tradeAsset}
        isOpen={!!tradeAsset}
        onClose={() => setTradeAsset(null)}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={handleRemoveFromWatchlist}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <EarningsCalendarModal
        isOpen={isEarningsCalendarOpen}
        onClose={() => setIsEarningsCalendarOpen(false)}
      />

      <MacroHeatmapModal
        isOpen={isMacroModalOpen}
        onClose={() => setIsMacroModalOpen(false)}
      />

      {/* Market Hours Status Modal */}
      {showMarketHoursInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowMarketHoursInfo(false)}
        >
          <div
            className="w-full max-w-sm bg-[#FFFFFF] rounded-2xl p-5 shadow-2xl border border-[#E0E3EB]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3 text-[#089981]">
              <Clock className="w-5 h-5" />
              <h4 className="font-bold text-sm text-[#181B24]">NYSE & NASDAQ Market Status</h4>
            </div>
            <div className="space-y-2 text-xs text-[#5A5E6B] mb-4">
              <div className="flex justify-between py-1 border-b border-[#E0E3EB]">
                <span>Pre-market session</span>
                <span className="font-semibold text-[#181B24]">4:00 AM – 9:30 AM EST</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0E3EB]">
                <span>Regular trading</span>
                <span className="font-bold text-[#089981]">9:30 AM – 4:00 PM EST (OPEN)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E0E3EB]">
                <span>After-hours session</span>
                <span className="font-semibold text-[#181B24]">4:00 PM – 8:00 PM EST</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Crypto & Forex</span>
                <span className="font-semibold text-[#181B24]">24 Hours / 7 Days</span>
              </div>
            </div>
            <button
              onClick={() => setShowMarketHoursInfo(false)}
              className="w-full py-2 bg-[#181B24] text-white rounded-full text-xs font-semibold hover:bg-black transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Quick Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[#181B24] text-white text-xs font-semibold rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-[#089981]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
