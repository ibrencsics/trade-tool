import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Candles } from './candles';

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

  constructor(private http: HttpClient) {
    console.log("here");
    //this.getCandles().pipe(
    //  tap(val => console.log(val))
    //).subscribe();
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
