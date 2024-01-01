import { Component } from '@angular/core';
import { DestatisClientService } from '../services/destatis-client.service';

@Component({
  selector: 'app-destatis',
  templateUrl: './destatis.component.html',
  styleUrls: ['./destatis.component.css']
})
export class DestatisComponent {

  constructor(client: DestatisClientService) {}
}
