import { Component } from '@angular/core';
import { SignalRService } from '../../../../core/services/signalR/signal-r.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  constructor(private signalRService: SignalRService){}

  hubInvoke(){
    this.signalRService.initializeConnection();
  }
}
