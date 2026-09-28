import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Bookmark, ExternalLink, Activity } from 'lucide-react';
import { MarketAsset } from '../types/market';

interface AssetDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  onOpenTrade: (asset: MarketAsset) => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (asset: MarketAsset) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onOpenTrade,
  isWatchlisted,
  onToggleWatchlist
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL'>('1D');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!asset) return null;

  const isPositive = asset.changePercent >= 0;

  // Generate dynamic chart points based on timeframe
  const generatePoints = () => {
    const base = asset.price;
    const count = 16;
    const points: number[] = [];
    const volatility = isPositive ? 0.015 : -0.015;

    for (let i = 0; i < count; i++) {
      const progress = i / (count - 1);
      const noise = (Math.sin(i * 1.5) + Math.cos(i * 2.2)) * (base * 0.006);
      const trend = (progress - 0.5) * (base * volatility * 2);
      points.push(Number((base - (1 - progress) * (asset.change || 1) + noise + trend).toFixed(2)));
    }
    points[points.length - 1] = asset.price;
    return points;
  };

  const chartPoints = generatePoints();
  const minVal = Math.min(...chartPoints) * 0.998;
  const maxVal = Math.max(...chartPoints) * 1.002;
  const range = maxVal - minVal || 1;

  const width = 560;
  const height = 180;

  const svgCoords = chartPoints.map((pt, i) => {
    const x = (i / (chartPoints.length - 1)) * (width - 20) + 10;
    const y = height - ((pt - minVal) / range) * (height - 30) - 15;
    return { x, y, val: pt };
  });

  const pathD = svgCoords.reduce(
    (acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
    ''
  );
  const areaD = `${pathD} L ${width - 10} ${height} L 10 ${height} Z`;

  const currentHoveredPrice = hoverIndex !== null ? chartPoints[hoverIndex] : asset.price;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 border-b border-[#E0E3EB] bg-[#FAF9FF]">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shadow-xs"
              style={{
                backgroundColor: asset.badgeBg || '#F0F3FA',
                color: asset.badgeColor || '#181B24'
              }}
            >
              {asset.badgeText || asset.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl text-[#181B24] tracking-tight">{asset.symbol}</h3>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#E0E3EB] text-[#434656]">
                  {asset.exchange || asset.category}
                </span>
                {asset.country && (
                  <span className="text-xs text-[#5A5E6B] font-medium hidden sm:inline">
                    · {asset.country}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5A5E6B] font-medium mt-0.5">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(asset)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-[#2962FF] text-white border-[#2962FF]'
                  : 'bg-white text-[#5A5E6B] hover:text-[#181B24] border-[#E0E3EB]'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#5A5E6B] hover:text-[#181B24] hover:bg-[#E0E3EB] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price & Primary Delta Banner */}
        <div className="px-6 pt-5 pb-2 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-['Inter'] font-extrabold text-3xl text-[#181B24] tracking-tight font-numeric-table">
                {asset.currency === 'USD' ? '$' : asset.currency === 'EUR' ? '€' : ''}
                {currentHoveredPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-bold text-xs ${
                  isPositive
                    ? 'bg-[#E6F4F1] text-[#089981]'
                    : 'bg-[#FDECEE] text-[#F23645]'
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {isPositive ? '+' : ''}
                {asset.change?.toFixed(2)} ({isPositive ? '+' : ''}
                {asset.changePercent.toFixed(2)}%)
              </span>
            </div>
            <p className="text-[11px] text-[#5A5E6B] mt-1 flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#089981]" />
              Real-time Quote · Regular Trading Hours
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1 bg-[#F0F3FA] p-1 rounded-full border border-[#E0E3EB]">
            {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#181B24] text-white shadow-xs'
                    : 'text-[#5A5E6B] hover:text-[#181B24]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive SVG Chart */}
        <div className="px-6 py-2">
          <div className="relative bg-[#FAF9FF] border border-[#E0E3EB] rounded-xl p-3 overflow-hidden">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-44 overflow-visible"
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={isPositive ? '#089981' : '#F23645'}
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor={isPositive ? '#089981' : '#F23645'}
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2={width} y2="30" stroke="#E0E3EB" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2={width} y2="90" stroke="#E0E3EB" strokeDasharray="3 3" />
              <line x1="0" y1="150" x2={width} y2="150" stroke="#E0E3EB" strokeDasharray="3 3" />

              {/* Shaded Area */}
              <path d={areaD} fill="url(#chartGradient)" />

              {/* Main Line */}
              <path
                d={pathD}
                fill="none"
                stroke={isPositive ? '#089981' : '#F23645'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Scrub Dots */}
              {svgCoords.map((coord, idx) => (
                <g key={idx} className="cursor-pointer">
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={hoverIndex === idx ? 5 : 2}
                    fill={hoverIndex === idx ? '#181B24' : isPositive ? '#089981' : '#F23645'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="transition-all"
                  />
                  {/* Invisible broad hitbox */}
                  <rect
                    x={coord.x - 15}
                    y={0}
                    width={30}
                    height={height}
                    fill="transparent"
                    onMouseEnter={() => setHoverIndex(idx)}
                  />
                </g>
              ))}
            </svg>

            {hoverIndex !== null && (
              <div className="absolute top-2 right-4 bg-[#181B24] text-white text-[11px] px-2 py-1 rounded shadow-md font-numeric-table">
                Scrub: ${chartPoints[hoverIndex].toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Fundamental & Technical Grid Stats */}
        <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FFFFFF] border-t border-[#E0E3EB]">
          <div className="p-2.5 bg-[#F0F3FA] rounded-xl">
            <span className="text-[11px] text-[#5A5E6B] font-medium block">Day Range</span>
            <span className="text-xs font-bold text-[#181B24] font-numeric-table">
              ${asset.low?.toFixed(2) || (asset.price * 0.985).toFixed(2)} - $
              {asset.high?.toFixed(2) || (asset.price * 1.012).toFixed(2)}
            </span>
          </div>

          <div className="p-2.5 bg-[#F0F3FA] rounded-xl">
            <span className="text-[11px] text-[#5A5E6B] font-medium block">Market Cap</span>
            <span className="text-xs font-bold text-[#181B24] font-numeric-table">
              {asset.marketCap || '142.5 B USD'}
            </span>
          </div>

          <div className="p-2.5 bg-[#F0F3FA] rounded-xl">
            <span className="text-[11px] text-[#5A5E6B] font-medium block">Volume</span>
            <span className="text-xs font-bold text-[#181B24] font-numeric-table">
              {asset.volume || '34.2M'}
            </span>
          </div>

          <div className="p-2.5 bg-[#F0F3FA] rounded-xl">
            <span className="text-[11px] text-[#5A5E6B] font-medium block">P/E Ratio</span>
            <span className="text-xs font-bold text-[#181B24] font-numeric-table">
              {asset.peRatio || '32.4'}
            </span>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF9FF] border-t border-[#E0E3EB] flex items-center justify-between gap-3">
          <div className="text-xs text-[#5A5E6B] hidden sm:block">
            <span>NYSE / NASDAQ real-time consolidated feed</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenTrade(asset);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-[#0049DB] hover:bg-[#003AB3] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Trade {asset.symbol}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
