import {Component} from '@angular/core';

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
}
