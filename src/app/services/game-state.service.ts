import { Injectable } from '@angular/core';
import { CardTrail } from '../model/card-trail.interface';
import { CodeCard } from '../model/code-card.interface';
import { EnvironmentCard } from '../model/environment-card.interface';
import { GoalCard } from '../model/goal-card.interface';
import { Player } from '../model/player.interface';
import { initializeTracetable } from '../utils/initiliaze-tracetable';
import { shuffleArray } from '../utils/shuffle-array';
import { CardGeneratorService } from './card-generator.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  targetScore = 10;
  cardTrails: CardTrail[] = [];
  players: Player[] = [];
  currentPlayer: number = 0;
  trails: CardTrail[] = [];

  // decks
  goalCards: GoalCard[] = [];
  codeCards: CodeCard[] = [];
  environmentCards: EnvironmentCard[] = [];

  // discard piles
  discardedGoalCards: GoalCard[] = [];
  discardedCodeCards: CodeCard[] = [];
  discardedEnvironmentCards: EnvironmentCard[] = [];


  constructor(private generator: CardGeneratorService) {
  }

  setup() {
    this.currentPlayer = 0;
    this.goalCards = this.generator.getGoalCards();
    this.codeCards = this.generator.getCodeCards();
    this.environmentCards = this.generator.getEnvironmentCards();
    this.discardedCodeCards = [];
    this.discardedEnvironmentCards = [];
    this.discardedGoalCards = [];

    // decks are generated, time to deal the cards
    this.players.forEach( p => {
      p.score = 0

      // every player gets 5 cards from the code deck
      const pHand = [];
      for (let i = 0; i < 5; i++) {
        pHand.push(this.drawCodeCard());
      }
      p.hand = pHand;

      // every player gets 1 goal card
      p.goal = this.drawGoalCard();
    });

    // reveal the first x starting environments and setup the trails
    this.trails = [];
    for (let i = 0; i < this.players.length + 1; i++) {
      this.trails.push({ environmentCard: this.drawEnvironmentCard(), codeCards: [], tracetable: [] });
    }
    this.trails.forEach(t => initializeTracetable(t));

    // 1 or 2 players play to 20, 3 to 15, 4 to 10
    this.targetScore = this.players.length < 3 ? 20 : this.players.length < 4 ? 15 : 20;
  }

  getNextPlayer(): Player {
    return this.players[this.currentPlayer++ % this.players.length];
  }

  drawGoalCard(): GoalCard {
    if (this.goalCards.length === 0) {
      shuffleArray(this.discardedGoalCards).forEach(c => this.goalCards.push(c));
      this.discardedGoalCards = []; 
    }
    return this.goalCards.pop() as GoalCard;
  }

  drawEnvironmentCard(): EnvironmentCard {
    if (this.environmentCards.length === 0) {
      shuffleArray(this.discardedEnvironmentCards).forEach(c => this.environmentCards.push(c));
      this.discardedEnvironmentCards = []; 
    }
    return this.environmentCards.pop() as EnvironmentCard;
  }

  drawCodeCard(): CodeCard {
    if (this.codeCards.length === 0) {
      shuffleArray(this.discardedCodeCards).forEach(c => this.codeCards.push(c));
      this.discardedCodeCards = []; 
    }
    return this.codeCards.pop() as CodeCard;
  }
}

