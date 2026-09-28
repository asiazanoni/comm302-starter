import React, { useState } from 'react';
import { Search, Globe, User, Bookmark } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenAuth,
  onOpenWatchlist,
  watchlistCount,
  activeNav,
  setActiveNav
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const languages = ['EN', 'DE', 'FR', 'ES', 'JA', 'ZH'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] border-b border-[#E0E3EB]">
      <div className="h-16 w-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Brand + Search + Nav */}
        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
          <a
            href="#"
            className="flex items-center gap-1 focus:outline-none"
            aria-label="TradingView Home"
          >
            <div className="w-9 h-9 rounded bg-[#181B24] flex items-center justify-center shadow-xs">
              <span className="text-[17px] leading-none text-[#FFFFFF] tracking-tight font-bold font-['Inter']">
                TV
              </span>
            </div>
          </a>

          {/* Search Trigger Bar */}
          <div className="relative hidden xl:flex items-center">
            <button
              onClick={onOpenSearch}
              type="button"
              className="flex items-center w-64 h-9 px-3 rounded-full bg-[#F0F3FA] text-[#5A5E6B] hover:bg-[#E0E3EB] transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#0049DB]"
            >
              <Search className="w-4 h-4 mr-2 text-[#5A5E6B]" />
              <span className="text-xs text-[#5A5E6B] flex-1">Search (Ctrl+K)</span>
              <span className="px-1.5 py-0.5 bg-[#FFFFFF] rounded text-[10px] font-['Inter'] font-semibold text-[#5A5E6B] border border-[#E0E3EB]">
                ⌘K
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveNav(item)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F0F3FA] text-[#181B24]'
                      : 'text-[#434656] hover:bg-[#F0F3FA] hover:text-[#181B24]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Watchlist + Lang + Profile + Get Started */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="xl:hidden w-8 h-8 rounded-full bg-[#F0F3FA] flex items-center justify-center text-[#181B24] hover:bg-[#E0E3EB] transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Watchlist Toggle */}
          <button
            onClick={onOpenWatchlist}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#F0F3FA] text-[#181B24] transition-colors cursor-pointer border border-[#E0E3EB]"
            title="Saved Watchlist"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#2962FF]" />
            <span className="text-xs font-semibold hidden sm:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#2962FF] text-white text-[10px] font-bold flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-[#F0F3FA] text-[#181B24] transition-colors cursor-pointer text-xs font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-[#5A5E6B]" />
              <span>{currentLang}</span>
              <span className="material-symbols-outlined text-[15px] text-[#5A5E6B]">
                expand_more
              </span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-[#FFFFFF] rounded-xl shadow-lg border border-[#E0E3EB] py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#F0F3FA] flex items-center justify-between ${
                      currentLang === lang ? 'text-[#0049DB] font-bold' : 'text-[#181B24]'
                    }`}
                  >
                    <span>{lang}</span>
                    {currentLang === lang && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User profile avatar */}
          <button
            onClick={onOpenAuth}
            className="w-8 h-8 rounded-full bg-[#0049DB] text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="User profile"
          >
            <User className="w-4 h-4 text-white" />
          </button>

          {/* Get started button */}
          <button
            onClick={onOpenAuth}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2962FF] to-[#7B1FA2] text-[#FFFFFF] text-xs font-semibold shadow-xs hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
