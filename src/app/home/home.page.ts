import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private model: GameStateService) {}

  startGame() {
    this.model.players = [{name: 'Player one', hand: [], score: 0}];
    this.model.setup();
    this.router.navigate(['game-field']);
  }

  showDeckOverview() {
    this.model.players = [{name: 'Player one', hand: [], score: 0}];
    this.model.setup();
    this.router.navigate(['deck-overview']);
  }

}
