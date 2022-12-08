import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CardTrail } from 'src/app/model/card-trail.interface';
import { CodeCard } from 'src/app/model/code-card.interface';
import { Player } from 'src/app/model/player.interface';
import { GameStateService } from 'src/app/services/game-state.service';
import { ModalController } from '@ionic/angular';
import { AddPlayersModalComponent } from '../modals/add-players-modal/add-players-modal.component';
import { GoalReachedModalComponent } from '../modals/goal-reached-modal/goal-reached-modal.component';
import { EnvironmentCard } from 'src/app/model/environment-card.interface';
import { PlayerRankingModalComponent } from '../modals/player-ranking-modal/player-ranking-modal.component';
import { initializeTracetable } from 'src/app/utils/initiliaze-tracetable';
import { TracetableModalComponent } from '../modals/tracetable-modal/tracetable-modal.component';
import { GameOverModelComponent } from '../modals/game-over-model/game-over-model.component';
import { Router } from '@angular/router';
import { HandOverModalComponent } from '../modals/hand-over-modal/hand-over-modal.component';
import { GoalCard } from 'src/app/model/goal-card.interface';
import { ShepherdService } from 'angular-shepherd';
import { defaultStepOptions } from 'src/app/tutorial/options';
import { tutorialSteps } from 'src/app/tutorial/steps';


@Component({
  selector: 'app-game-field',
  templateUrl: './game-field.component.html',
  styleUrls: ['./game-field.component.scss'],
})
export class GameFieldComponent implements OnInit, AfterViewInit {
  currentPlayer: Player;
  selectedCard?: CodeCard;
  showCards = true;

  constructor(public model: GameStateService, private modalCtrl: ModalController, 
    private router: Router, private shepherdService: ShepherdService) { 
    this.currentPlayer = model.getNextPlayer();
  }

  ngAfterViewInit(): void {
    if (this.model.showTutorial) {
      this.shepherdService.defaultStepOptions = defaultStepOptions;
      this.shepherdService.modal = true;
      this.shepherdService.confirmCancel = false;
      this.shepherdService.addSteps(tutorialSteps);
      this.shepherdService.start();
    }
  }

  ngOnInit() {}

  selectCard(c: CodeCard) {
    this.selectedCard = c;
  }

  async addCard(t: CardTrail) {
    if (!this.selectedCard) {
      return
    }

    // add the card to the trail
    t.codeCards.push(this.selectedCard);
    this.currentPlayer.hand = this.currentPlayer.hand.filter(c => c !== this.selectedCard);

    // allow the user to update the trace table
    await this.showTraceTable(t);

    // draw new card and check for game progress
    this.currentPlayer.hand.push(this.model.drawCodeCard());
    this.selectedCard = undefined;
    await this.checkForGoals(t, this.currentPlayer);
    await this.checkForGameOver();

    // start handover to next player if in a multiplayer game
    if (this.model.players.length > 1) {
      this.showCards = false;
      this.currentPlayer = this.model.getNextPlayer();
      const modal = await this.modalCtrl.create({
        component: HandOverModalComponent,
        componentProps: {
          nextPlayer: this.currentPlayer
        },
        backdropDismiss:false
      });
      modal.present();
      await modal.onWillDismiss();
      this.showCards = true;
    } else {
      this.currentPlayer = this.model.getNextPlayer();
    }
    
  }

  /**
   * New rules, 
   * only check for goal once a card has been played on a trail,
   * only check for that trail of cards and for the player who just played
   */
  async checkForGoals(t: CardTrail, p: Player) {
    
    const trailCode = assertDeclaration + t.environmentCard.declarationsSnippet + '\n' + t.codeCards.map(c => c.snippet).join("\n");
    const code = trailCode + '\n' + p.goal?.assertionSnippet;
    try {
      let result = eval(code);
      console.log('checking for: ', code, result);
      if (result) {
        // draw a new goal card
        this.model.discardedGoalCards.push(p.goal as GoalCard);
        p.goal = this.model.drawGoalCard();
        // increate the player score
        p.score += p.goal?.score ?? 0;
        //show the goal reached modal
        const modal = await this.modalCtrl.create({
          component: GoalReachedModalComponent,
          componentProps: { 
            card: p.goal,
            player: p
          },
          backdropDismiss:false
        });
        modal.present();
        await modal.onWillDismiss();
        // start a new trail with new environment card
        t.codeCards.forEach(c => this.model.discardedCodeCards.push(c));
        this.model.discardedEnvironmentCards.push(t.environmentCard);
        t.codeCards = [];
        t.environmentCard = this.model.drawEnvironmentCard();
        initializeTracetable(t);
      }
    } catch {
    }
  }

  async checkForGameOver() {
    await Promise.all(this.model.players.map(async p => {
      if (p.score >= this.model.targetScore) {
        const modal = await this.modalCtrl.create({
          component: GameOverModelComponent,
          componentProps: {
            winningPlayer: p
          },
          backdropDismiss:false
        });
        modal.present();
        await modal.onWillDismiss();
        this.router.navigate(['home'])
      }
    }));
  }
  
  async showTraceTable(t: CardTrail) {
    // TracetableModalComponent
    const modal = await this.modalCtrl.create({
      component: TracetableModalComponent,
      componentProps: {
        trail: t
      },
      backdropDismiss:false
    });
    modal.present();
    await modal.onWillDismiss();
  }

  async showPlayerRanking() {
    const modal = await this.modalCtrl.create({
      component: PlayerRankingModalComponent,
      componentProps: {
        sortedPlayers: this.model.players.sort((a, b) => b.score - a.score),
        targetScore: this.model.targetScore
      },
      backdropDismiss:false
    });
    modal.present();
    await modal.onWillDismiss();
  }
}

const assertDeclaration = `
function assert(condition, message) {
  return condition;
}
`;