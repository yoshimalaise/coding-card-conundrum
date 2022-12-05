import { Injectable } from '@angular/core';
import { CardTrail } from '../model/card-trail.interface';
import { CodeCard } from '../model/code-card.interface';
import { EnvironmentCard } from '../model/environment-card.interface';
import { GoalCard } from '../model/goal-card.interface';
import { Player } from '../model/player.interface';
import { CardGeneratorService } from './card-generator.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  cardTrails: CardTrail[] = [];
  players: Player[] = [];

  // decks
  goalCards: GoalCard[] = [];
  codeCards: CodeCard[] = [];
  environmentCards: EnvironmentCard[] = [];


  constructor(private generator: CardGeneratorService) {
   }

  setup() {
    this.players.forEach( p => p.score = 0);
    this.goalCards = this.generator.getGoalCards();
    this.codeCards = this.generator.getCodeCards();
    this.environmentCards = this.generator.getEnvironmentCards();
  }
}
