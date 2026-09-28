import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface EarningsCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FULL_EARNINGS = [
  { symbol: 'KNDI', name: 'Kandi Technologies', time: 'Pre-Market', estEPS: '—', actualEPS: '—', estRev: '$32.4M', marketCap: '$240M' },
  { symbol: 'TAYD', name: 'Taylor Devices', time: 'After-Close', estEPS: '$0.92', actualEPS: '$1.04', estRev: '$14.8M', marketCap: '$180M' },
  { symbol: 'TRAK', name: 'ReposiTrak, Inc.', time: 'Post-Market', estEPS: '$0.09', actualEPS: '$0.11', estRev: '$5.2M', marketCap: '$385M' },
  { symbol: 'MTN', name: 'Vail Resorts', time: 'After-Close', estEPS: '-$5.35', actualEPS: '-$5.12', estRev: '$268M', marketCap: '$6.5B' },
  { symbol: 'FDX', name: 'FedEx Corporation', time: 'Tomorrow Pre-Market', estEPS: '$3.78', actualEPS: '—', estRev: '$22.1B', marketCap: '$72.4B' },
  { symbol: 'ADBE', name: 'Adobe Inc.', time: 'Thursday Post-Market', estEPS: '$4.65', actualEPS: '—', estRev: '$5.4B', marketCap: '$242.0B' },
  { symbol: 'LEN', name: 'Lennar Corp', time: 'Friday Pre-Market', estEPS: '$4.18', actualEPS: '—', estRev: '$9.8B', marketCap: '$46.8B' },
  { symbol: 'DRI', name: 'Darden Restaurants', time: 'Friday Pre-Market', estEPS: '$1.75', actualEPS: '—', estRev: '$2.8B', marketCap: '$19.2B' }
];

export const EarningsCalendarModal: React.FC<EarningsCalendarModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all');

  if (!isOpen) return null;

  const displayed = FULL_EARNINGS.filter((e) => {
    if (filter === 'today') return e.time.toLowerCase().includes('today') || e.time.toLowerCase().includes('market');
    if (filter === 'upcoming') return !e.time.toLowerCase().includes('today');
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E0E3EB] bg-[#FAF9FF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#0049DB] flex items-center justify-center">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#181B24]">Corporate Earnings Calendar</h3>
              <p className="text-xs text-[#5A5E6B]">Wall Street consensus estimates & reporting dates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5A5E6B] hover:text-[#181B24] hover:bg-[#E0E3EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-5 py-2.5 bg-[#F0F3FA] border-b border-[#E0E3EB] flex items-center gap-2">
          {(['all', 'today', 'upcoming'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === tab
                  ? 'bg-[#181B24] text-white'
                  : 'bg-white text-[#5A5E6B] hover:text-[#181B24] border border-[#E0E3EB]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table list */}
        <div className="overflow-y-auto p-4 flex-1">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E0E3EB] text-[#5A5E6B] uppercase font-bold text-[10px] pb-2">
                <th className="py-2">Company</th>
                <th className="py-2">Report Timing</th>
                <th className="py-2 text-right">EPS Est.</th>
                <th className="py-2 text-right">Actual</th>
                <th className="py-2 text-right">Revenue Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E3EB]">
              {displayed.map((item) => (
                <tr key={item.symbol} className="hover:bg-[#F0F3FA] transition-colors">
                  <td className="py-3">
                    <div className="font-bold text-[#181B24] text-xs">{item.symbol}</div>
                    <div className="text-[11px] text-[#5A5E6B] truncate max-w-[140px] sm:max-w-xs">
                      {item.name}
                    </div>
                  </td>
                  <td className="py-3 text-[#5A5E6B] font-medium">{item.time}</td>
                  <td className="py-3 text-right font-numeric-table font-semibold text-[#181B24]">
                    {item.estEPS}
                  </td>
                  <td className="py-3 text-right font-numeric-table font-semibold text-[#089981]">
                    {item.actualEPS}
                  </td>
                  <td className="py-3 text-right font-numeric-table text-[#5A5E6B]">
                    {item.estRev}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E0E3EB] bg-[#FAF9FF] flex justify-between items-center text-xs text-[#5A5E6B]">
          <span>Data updated live ahead of market opening bell</span>
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
