export interface StockData {
    symbol: string;
    company: string;
    sector: string;
    industry: string;
    no_years: number;
    price: number;
    pe: number;
    div_yield: number;
    avg_yield_5y: number;
    current_div: number;
    previous_div: number;
    dgr_1y: number;
    dgr_3y: number;
    dgr_5y: number;
    dgr_10y: number;
}

export interface Rule4 {
    stockData: StockData[];
}