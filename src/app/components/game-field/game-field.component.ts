import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player.interface';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent implements OnInit {
  currentPlayer: Player;

  constructor(public model: GameStateService) { 
    this.currentPlayer = model.getNextPlayer();
  }

  ngOnInit() {}

}
