import { Component, ViewChild, Input } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { DividendCommand } from 'src/app/dividend/dividend-command';
import { PythonClientService } from 'src/app/services/python-client.service';
import { BaseChartDirective } from 'ng2-charts';
import { tap, map } from 'rxjs';

@Component({
  selector: 'app-dividend-history',
  templateUrl: './dividend-history.component.html',
  styleUrls: ['./dividend-history.component.css']
})
export class DividendHistoryComponent {
  @Input({ required: true }) command!: DividendCommand;

  constructor(private http: PythonClientService) {
    Chart.register(/*Annotation*/);
  }

  ngOnInit(): void {
    this.draw();
  }

  draw() {
    this.http.getRule2(this.command.symbol ?? "").pipe(
      tap(divHistory => console.log(divHistory)),
      map(divHistory => {
        this.lineChartData.datasets = [];

        this.lineChartData.datasets.push({
          data: divHistory.values.map(v => v.value),
          label: this.command.symbol,
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        });
        
        this.lineChartData.labels = divHistory.values.map(v => v.timestamp);

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
