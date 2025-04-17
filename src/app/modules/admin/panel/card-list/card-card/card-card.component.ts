import { Component, Input } from '@angular/core';
import { CardDTO } from '../../../../../core/models/card/cardDTO';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-card',
  imports: [],
  templateUrl: './card-card.component.html',
  styleUrl: './card-card.component.css'
})
export class CardCardComponent {

  @Input() card!: CardDTO;

}
