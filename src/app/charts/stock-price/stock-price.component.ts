import { Component, ViewChild, OnChanges, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FinnhubClientService } from 'src/app/services/finnhub-client.service';
import { Candles } from 'src/app/services/candles';
import { tap, map } from 'rxjs';

//import Annotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-stock-price',
  templateUrl: './stock-price.component.html',
  styleUrls: ['./stock-price.component.css']
})
export class StockPriceComponent implements OnInit {
  private newLabel? = 'New label';

  constructor(private http: FinnhubClientService) {
    Chart.register(/*Annotation*/);
  }

  ngOnInit(): void {
    this.draw("AAPL");
  }

  draw(symbol: string) {
    this.http.getCandles(symbol, new Date(1695710710000), new Date(1698302710000)).pipe(
      tap(candles => console.log(candles)),
      map(candles => {
        this.lineChartData.datasets = [];

        this.lineChartData.datasets.push({
          data: candles.c,
          label: symbol,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        });
        
        this.lineChartData.labels = candles.t
          .map(d => new Date(d*1000))
          .map(d => d.toLocaleDateString());
          
        this.chart?.update();
      })
    ).subscribe();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      }
    },

    plugins: {
      legend: { display: true }
    },
    // responsive: true,
    // maintainAspectRatio: false,
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}