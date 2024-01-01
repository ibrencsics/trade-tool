import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, map, merge, startWith, switchMap } from 'rxjs';
import { DividendCommand } from 'src/app/dividend/dividend-command';
import { PythonClientService } from 'src/app/services/python-client.service';
import { Rule4, StockData } from 'src/app/services/stock-data';

@Component({
  selector: 'app-dividend-table',
  templateUrl: './dividend-table.component.html',
  styleUrls: ['./dividend-table.component.css']
})
export class DividendTableComponent implements AfterViewInit  {
  @Input({required: true}) command!: DividendCommand;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoadingResults = true;

  displayedColumns: string[] = [
    'symbol', 'company', 'sector', 'industry', 'price', 'pe', 'div_yield', 'avg_yield_5y', 
    'current_div', 'previous_div', 'dgr_1y', 'dgr_3y', 'dgr_5y', 'dgr_10y'];
  
  dataSource: StockData[] = [];
  
  constructor(private http: PythonClientService) {
    
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        console.log(this.sort.active + " " + this.sort.direction + " " + this.paginator.pageIndex);
        this.isLoadingResults = true;
        return this.http.getRule4(this.sort.active, this.sort.direction);
        // .pipe(catchError(() => observableOf(null)));
      }),
      map(data => {
        this.isLoadingResults = false;
        return data.stockData;
      })
    )
    .subscribe(data => (this.dataSource = data));
  }
}
