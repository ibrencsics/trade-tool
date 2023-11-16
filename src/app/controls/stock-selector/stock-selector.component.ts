import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StockChartData } from 'src/app/stocks/stock-chart-data';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.css'],
})
export class StockSelectorComponent {
  symbols: string[] = [
    'AAPL',
    'MSFT',
    'PG',
  ];
  timeframes: string[] = [
    "1d", "1w", "1m", "1y", "5y"
  ]

  @Output() selected = new EventEmitter<StockChartData>();

  profileForm = new FormGroup({
    symbol: new FormControl(this.symbols.at(0)),
    timeframe: new FormControl(this.timeframes.at(0)),
  });

  constructor() {
    this.profileForm.controls.symbol.valueChanges.subscribe(s => {
      console.log(`The selected value is ${s}`);
    });
  }

  onSubmit() {
    console.info(this.profileForm.value);
    this.selected.emit({
      symbol: this.profileForm.value.symbol as any,
      timeframe: this.profileForm.value.timeframe as any
    });
  }
}
