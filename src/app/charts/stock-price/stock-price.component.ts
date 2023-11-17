import { Component, ViewChild, OnChanges, OnInit, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FinnhubClientService } from 'src/app/services/finnhub-client.service';
import { Candles } from 'src/app/services/candles';
import { tap, map } from 'rxjs';
import Annotation from 'chartjs-plugin-annotation';
import { StockChartData } from 'src/app/stocks/stock-chart-data';

@Component({
  selector: 'app-stock-price',
  templateUrl: './stock-price.component.html',
  styleUrls: ['./stock-price.component.css']
})
export class StockPriceComponent implements OnInit {
  @Input({ required: true }) stockChartData!: StockChartData;

  constructor(private http: FinnhubClientService) {
    Chart.register(/*Annotation*/);
  }

  ngOnInit(): void {
    this.draw();
  }

  draw() {
    // this.http.getCandles(symbol, new Date(1695710710000), new Date(1698302710000)).pipe(
    this.http.getCandles_(this.stockChartData).pipe(
      tap(candles => console.log(candles)),
      map(candles => {
        this.lineChartData.datasets = [];

        this.lineChartData.datasets.push({
          data: candles.c,
          label: this.stockChartData.symbol,
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
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
    // responsive: true,
    // maintainAspectRatio: false,
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}