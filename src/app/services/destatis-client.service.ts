import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestatisClientService {

  private url = "https://www-genesis.destatis.de/genesisWS/rest/2020/helloworld/logincheck?username=DE2L03T5WP&password=gidePass004...";

  constructor(private http: HttpClient) { 

    this.http.get<string>(this.url).pipe(
      tap(val => console.log(val))
    ).subscribe()
  }
}
