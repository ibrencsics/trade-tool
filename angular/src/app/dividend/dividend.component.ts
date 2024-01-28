import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component';
import { PythonClientService } from 'src/app/services/python-client.service';
import { DividendCommand } from './dividend-command';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.css']
})
export class DividendComponent extends BaseComponent implements OnInit {

  charts: DividendCommand[] = [];

  constructor(private http: PythonClientService) {
    super();
  }

  override ngOnInit(): void {
    
  }

  onCommand(command: DividendCommand) {  
    this.charts.push(command);

    // if (command.runRule4) {
    //   this.http.getRule4().subscribe();
    // } else {
    //   this.http.getRule2("msft").pipe(
    //     tap(val => console.log(val))
    //   ).subscribe();
    // }
  }

  remove(command: DividendCommand) {

  }
}
