export interface TimeAndValue {
    timestamp: string;
    value: number;
}

export interface DividendHistory {
    symbol: string;
    values: TimeAndValue[];
}