import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShepherdService } from 'angular-shepherd';
import { CardTrail } from 'src/app/model/card-trail.interface';
import { CodeCard } from 'src/app/model/code-card.interface';
import { GoalCard } from 'src/app/model/goal-card.interface';
import { Player } from 'src/app/model/player.interface';
import { GameStateService } from 'src/app/services/game-state.service';
import { initializeTracetable } from 'src/app/utils/initiliaze-tracetable';
import { GameOverModelComponent } from '../modals/game-over-model/game-over-model.component';
import { GoalReachedModalComponent } from '../modals/goal-reached-modal/goal-reached-modal.component';
import { PlayerRankingModalComponent } from '../modals/player-ranking-modal/player-ranking-modal.component';
import { TracetableModalComponent } from '../modals/tracetable-modal/tracetable-modal.component';

@Component({
  selector: 'app-mobile-game-field',
  templateUrl: './mobile-game-field.component.html',
  styleUrls: ['./mobile-game-field.component.scss'],
})
export class MobileGameFieldComponent implements OnInit {
  currentPlayer: Player;
  selectedEnvironment?: CardTrail = undefined;
  showCards = true;

  constructor(public model: GameStateService, private modalCtrl: ModalController, 
    private router: Router, private shepherdService: ShepherdService) { 
    this.currentPlayer = model.getNextPlayer();
  }

  ngOnInit() {}

  selectEnvironment(t: CardTrail) {
    this.selectedEnvironment = t;
  }

  selectCard(c: CodeCard) {
   
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