export interface TimeAndValue {
    timestamp: string;
    value: number;
}

export interface DividendHistory {
    symbol: string;
    values: TimeAndValue[];
}

export interface StockPrice {
    symbol: string;
    values: TimeAndValue[];
}