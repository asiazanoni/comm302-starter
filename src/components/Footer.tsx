import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (item: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const directory = [
    {
      title: 'Products',
      links: [
        'Supercharts',
        'Pine Script®',
        'Stock Screener',
        'ETF Screener',
        'Crypto Screener',
        'Heatmaps',
        'Economic Calendar'
      ]
    },
    {
      title: 'Markets',
      links: [
        'Indices',
        'US Stocks',
        'World Stocks',
        'Crypto',
        'Futures',
        'Bonds & Yields',
        'Forex'
      ]
    },
    {
      title: 'Community',
      links: [
        'Social network',
        'Trading Ideas',
        'Educational Scripts',
        'Wall of Love',
        'Creator program',
        'House Rules'
      ]
    },
    {
      title: 'Business',
      links: [
        'Widgets',
        'Charting libraries',
        'Lightweight Charts™',
        'Brokerage integration',
        'Partner program',
        'Advertising'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Features & Plans',
        'Careers',
        'Help Center',
        'TradingView Store',
        'Status Page'
      ]
    },
    {
      title: 'Apps & Legal',
      links: [
        'Desktop App',
        'Mobile App',
        'Terms of Use',
        'Privacy Policy',
        'Cookies Policy',
        'Security & Bug Bounty'
      ]
    }
  ];

  return (
    <>
      <section className="w-full bg-[#F0F3FA] pt-12 pb-8 mt-12 border-t border-[#E0E3EB]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* 6-Column Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pb-8 border-b border-[#E0E3EB]">
            {directory.map((col) => (
              <div key={col.title} className="flex flex-col gap-2">
                <div className="text-xs font-bold text-[#181B24] uppercase tracking-wider mb-1">
                  {col.title}
                </div>
                {col.links.map((link) => (
                  <button
                    key={link}
                    onClick={() => onNavClick(link)}
                    className="text-left text-xs text-[#5A5E6B] hover:text-[#181B24] transition-colors cursor-pointer"
                  >
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Legal Footnote & Human Badge */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#5A5E6B]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#181B24]">
              <Heart className="w-4 h-4 text-[#0049DB] fill-current" />
              <span>Made by humans</span>
            </div>
            <p className="text-[11px] text-center md:text-right text-[#5A5E6B] max-w-2xl leading-relaxed">
              Select market data provided by ICE Data Services. Select reference data provided by
              FactSet. Copyright © 2026 FactSet Research Systems Inc. Copyright © 2026 American
              Bankers Association. CUSIP Database provided by FactSet.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-footer */}
      <footer className="w-full bg-[#F0F3FA] border-t border-[#E0E3EB] py-6">
        <div className="w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[#5A5E6B]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#181B24] flex items-center justify-center">
              <span className="text-[11px] text-white font-bold">TV</span>
            </div>
            <span className="text-xs">© 2024 TradingView Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <button
              onClick={() => onNavClick('Terms of Service')}
              className="hover:text-[#181B24] transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavClick('Privacy Policy')}
              className="hover:text-[#181B24] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavClick('Cookies Policy')}
              className="hover:text-[#181B24] transition-colors"
            >
              Cookies Policy
            </button>
            <button
              onClick={() => onNavClick('Security')}
              className="hover:text-[#181B24] transition-colors"
            >
              Security
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
