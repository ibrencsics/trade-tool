import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DividendCommand } from 'src/app/dividend/dividend-command';
import { PythonClientService } from 'src/app/services/python-client.service';
import { StockData } from 'src/app/services/stock-data';

@Component({
  selector: 'app-dividend-table',
  templateUrl: './dividend-table.component.html',
  styleUrls: ['./dividend-table.component.css']
})
export class DividendTableComponent implements OnInit {
  @Input({required: true}) command!: DividendCommand;

  displayedColumns: string[] = ['symbol', 'company', 'sector', 'industry'];
  dataSource: StockData[] = []; 

  constructor(private http: PythonClientService) {
    
  }

  ngOnInit(): void {
    this.http.getRule4().pipe(
      map(r4 => {
        this.dataSource = r4.stockData;
      })
    ).subscribe();
  }
}
