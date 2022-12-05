import { Component, OnInit } from '@angular/core';
import { CardTrail } from 'src/app/model/card-trail.interface';
import { CodeCard } from 'src/app/model/code-card.interface';
import { Player } from 'src/app/model/player.interface';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent implements OnInit {
  currentPlayer: Player;
  selectedCard?: CodeCard;

  constructor(public model: GameStateService) { 
    this.currentPlayer = model.getNextPlayer();
  }

  ngOnInit() {}

  handleDrop(event: any) {
    console.log(event);
  }

  selectCard(c: CodeCard) {
    this.selectedCard = c;
  }

  addCard(t: CardTrail) {
    if (!this.selectedCard) {
      return
    }
    t.codeCards.push(this.selectedCard);
    this.currentPlayer.hand = this.currentPlayer.hand.filter(c => c !== this.selectedCard);
    this.currentPlayer.hand.push(this.model.codeCards.pop() as CodeCard);
    this.selectedCard = undefined;
    this.checkForWinCondition();
    this.currentPlayer = this.model.getNextPlayer();
  }

  checkForWinCondition() {

  }

}
