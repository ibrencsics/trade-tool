import {Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
    // TODO: Use EventEmitter with form value
    console.info(this.profileForm.value);
  }
}
