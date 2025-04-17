import { Component } from '@angular/core';
import { BoardComponent } from '../forms/board/board.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
