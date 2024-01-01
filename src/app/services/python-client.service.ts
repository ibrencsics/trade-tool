import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DateValue } from './date-value';
import { Rule4 } from './stock-data';

@Injectable({
  providedIn: 'root'
})
export class PythonClientService {

  private urlRule4 = "http://localhost:8000/dividend/rule/4";
  private urlRule2 = "http://localhost:8000/dividend/rule/2";

  constructor(private http: HttpClient) { 
    // this.http.get<string[]>(this.url).pipe(
    //   tap(val => console.log(val))
    // ).subscribe()
  }

  getRule4(sort_column: string, sort_direction: string): Observable<Rule4> {
    let params = new HttpParams()
      .set('sort_column', sort_column)
      .set('sort_direction', sort_direction)
      ;
    return this.http.get<Rule4>(this.urlRule4, {params}).pipe(
      tap(val => console.log(val))
    )
  };

  getRule2(symbol: string): Observable<DateValue[]> {
    return this.http.get<DateValue[]>(`${this.urlRule2}/${symbol}`);
  }
}
