import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Candles } from './candles';
import { StockChartData } from '../stocks/stock-chart-data';

interface CandlesDto {
  c: number[];
  t: number[];
}

@Injectable({
  providedIn: 'root'
})
export class FinnhubClientService {

  private url = 'https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1695710710&to=1698302710&token=bua8bcf48v6q418ga8d0&token=bua8bcf48v6q418ga8d0&token=bua8bcf48v6q418ga8d0'; 
  private baseUrl = 'https://finnhub.io/api/v1/stock/candle';
  private token = 'bua8bcf48v6q418ga8d0&token=bua8bcf48v6q418ga8d0';

  transform = new Map<string, QueryParams>([
    ["1d", { resolution: "30", timeframe: 24*3600 } ],
    ["1w", { resolution: "60", timeframe: 7*24*3600 } ],
    ["1m", { resolution: "D", timeframe: 30*24*3600 } ],
    ["1y", { resolution: "W", timeframe: 365*24*3600 } ],
    ["5y", { resolution: "M", timeframe: 5*365*24*3600 } ],
  ]);

  constructor(private http: HttpClient) {
    //this.getCandles().pipe(
    //  tap(val => console.log(val))
    //).subscribe();
  }

  getCandles_(stockChartData: StockChartData): Observable<Candles> {
    const symbol = stockChartData.symbol;
    const toUnix = Math.round(new Date().getTime() / 1000);
    const fromUnix = toUnix - Math.round((this.transform.get(stockChartData.timeframe)?.timeframe ?? 0));
    const resolution = this.transform.get(stockChartData.timeframe)?.resolution ?? "D";

    return this.http.get<Candles>(`${this.baseUrl}?symbol=${symbol}&resolution=${resolution}&from=${fromUnix}&to=${toUnix}&token=${this.token}`).pipe(
      map(candles => {
        return {
          c: candles.c,
          t: candles.t
        }
      })
    );
  }

  getCandles(symbol: string, from: Date, to: Date): Observable<Candles> {
    const fromUnix = from.getTime() / 1000;
    const toUnix = to.getTime() / 1000;
    return this.http.get<Candles>(`${this.baseUrl}?symbol=${symbol}&resolution=D&from=${fromUnix}&to=${toUnix}&token=${this.token}`).pipe(
      map(candles => {
        return {
          c: candles.c,
          t: candles.t
        }
      })
    );
  }
}

interface QueryParams {
  resolution: string,
  timeframe: number,
}