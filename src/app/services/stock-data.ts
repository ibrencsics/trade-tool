export interface StockData {
    symbol: string;
    company: string;
    sector: string;
    industry: string;
}

export interface Rule4 {
    stockData: StockData[];
}