import { Component, EventEmitter, Output } from '@angular/core';
import { DividendCommand } from 'src/app/dividend/dividend-command';

@Component({
  selector: 'app-dividend-selector',
  templateUrl: './dividend-selector.component.html',
  styleUrls: ['./dividend-selector.component.css']
})
export class DividendSelectorComponent {

  @Output() command = new EventEmitter<DividendCommand>();

  onRule4() {
    this.command.emit({
      runRule4: true
    });
  }
}
