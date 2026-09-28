export type AssetCategory = 
  | 'index' 
  | 'stock' 
  | 'crypto' 
  | 'commodity' 
  | 'forex' 
  | 'bond' 
  | 'etf';

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  category: AssetCategory;
  price: number;
  currency: string;
  change: number;
  changePercent: number;
  low?: number;
  high?: number;
  open?: number;
  prevClose?: number;
  volume?: string;
  avgVolume?: string;
  marketCap?: string;
  peRatio?: string;
  dividendYield?: string;
  fiftyTwoWeekRange?: { low: number; high: number };
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: string;
  country?: string;
  sparkline: number[];
  sector?: string;
}

export interface MacroIndicator {
  country: string;
  gdpYoY: string;
  gdpStatus: 'up' | 'down' | 'neutral';
  inflation: string;
  inflationStatus: 'up' | 'down' | 'neutral';
  rate: string;
  unemployment: string;
}

export interface EarningsItem {
  id: string;
  symbol: string;
  name: string;
  date: string;
  estimate: string;
  actual?: string;
  revenueEst?: string;
  marketCap?: string;
}

export type MarketRegion = 'global' | 'americas' | 'europe' | 'asia' | 'crypto';
