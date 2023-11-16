import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { StockChartData } from './stock-chart-data';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {
  private breakpointObserver = inject(BreakpointObserver);

  charts = ["Test"];

  onSelected(stockChartData: StockChartData) {
    this.charts.push(stockChartData.symbol + " : " + stockChartData.timeframe);
  }

  remove(chart: string) {
    console.info("Remove " + chart);
    const index = this.charts.indexOf(chart);
    this.charts.splice(index, 1);
  }

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );
}
