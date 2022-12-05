import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-deck-overview',
  templateUrl: './deck-overview.component.html',
  styleUrls: ['./deck-overview.component.scss'],
})
export class DeckOverviewComponent implements OnInit {

  constructor(public model: GameStateService) { }

  ngOnInit() {}

}
