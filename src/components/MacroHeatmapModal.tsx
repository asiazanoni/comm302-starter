import React from 'react';
import { X, Globe2, TrendingUp, TrendingDown, Info } from 'lucide-react';

interface MacroHeatmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GLOBAL_MACRO_DATA = [
  { country: 'United States', flag: '🇺🇸', gdp: '+2.8%', gdpTrend: 'up', cpi: '2.4%', cpiTrend: 'down', policyRate: '4.75%', nextMeeting: 'Nov 07', debtToGdp: '122%' },
  { country: 'Eurozone', flag: '🇪🇺', gdp: '+0.9%', gdpTrend: 'up', cpi: '1.7%', cpiTrend: 'down', policyRate: '3.25%', nextMeeting: 'Dec 12', debtToGdp: '88%' },
  { country: 'Japan', flag: '🇯🇵', gdp: '-0.8%', gdpTrend: 'down', cpi: '2.5%', cpiTrend: 'up', policyRate: '0.25%', nextMeeting: 'Oct 31', debtToGdp: '261%' },
  { country: 'China', flag: '🇨🇳', gdp: '+4.6%', gdpTrend: 'up', cpi: '0.4%', cpiTrend: 'neutral', policyRate: '3.10%', nextMeeting: 'Nov 20', debtToGdp: '77%' },
  { country: 'United Kingdom', flag: '🇬🇧', gdp: '+0.7%', gdpTrend: 'up', cpi: '2.2%', cpiTrend: 'down', policyRate: '5.00%', nextMeeting: 'Nov 07', debtToGdp: '100%' },
  { country: 'Australia', flag: '🇦🇺', gdp: '+1.5%', gdpTrend: 'up', cpi: '2.8%', cpiTrend: 'neutral', policyRate: '4.35%', nextMeeting: 'Nov 05', debtToGdp: '53%' },
  { country: 'Canada', flag: '🇨🇦', gdp: '+1.2%', gdpTrend: 'up', cpi: '1.6%', cpiTrend: 'down', policyRate: '3.75%', nextMeeting: 'Dec 11', debtToGdp: '106%' },
  { country: 'Switzerland', flag: '🇨🇭', gdp: '+1.8%', gdpTrend: 'up', cpi: '0.8%', cpiTrend: 'down', policyRate: '1.00%', nextMeeting: 'Dec 12', debtToGdp: '39%' }
];

export const MacroHeatmapModal: React.FC<MacroHeatmapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E0E3EB] bg-[#FAF9FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E6F4F1] text-[#089981] flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#181B24]">Global Macro Economic Matrix</h3>
              <p className="text-xs text-[#5A5E6B]">Central bank policy, inflation gauges, and GDP growth metrics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5A5E6B] hover:text-[#181B24] hover:bg-[#E0E3EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="overflow-y-auto p-4 flex-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E0E3EB] text-[#5A5E6B] uppercase font-bold text-[10px] pb-2">
                <th className="py-2.5">Economy</th>
                <th className="py-2.5 text-center">GDP YoY</th>
                <th className="py-2.5 text-center">CPI Inflation</th>
                <th className="py-2.5 text-center">Central Bank Rate</th>
                <th className="py-2.5 text-center">Next Rate Decision</th>
                <th className="py-2.5 text-right">Debt / GDP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {GLOBAL_MACRO_DATA.map((row) => (
                <tr key={row.country} className="hover:bg-[#F0F3FA] transition-colors">
                  <td className="py-3 font-bold text-[#181B24] flex items-center gap-2">
                    <span className="text-base">{row.flag}</span>
                    <span>{row.country}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-numeric-table font-semibold ${
                        row.gdpTrend === 'up'
                          ? 'bg-[#E6F4F1] text-[#089981]'
                          : 'bg-[#FDECEE] text-[#F23645]'
                      }`}
                    >
                      {row.gdp}
                    </span>
                  </td>
                  <td className="py-3 text-center font-numeric-table font-semibold text-[#181B24]">
                    {row.cpi}
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 bg-[#F0F3FA] rounded font-numeric-table font-bold text-[#181B24]">
                      {row.policyRate}
                    </span>
                  </td>
                  <td className="py-3 text-center text-[#5A5E6B] font-medium">
                    {row.nextMeeting}
                  </td>
                  <td className="py-3 text-right font-numeric-table text-[#5A5E6B]">
                    {row.debtToGdp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E0E3EB] bg-[#FAF9FF] flex justify-between items-center text-xs text-[#5A5E6B]">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#0049DB]" />
            Sourced from Federal Reserve, ECB, BOJ, NBS, and IMF data services
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#181B24] text-white rounded-full font-semibold hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
