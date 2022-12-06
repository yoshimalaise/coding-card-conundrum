import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';
import { ModalController } from '@ionic/angular';
import { AddPlayersModalComponent } from '../components/modals/add-players-modal/add-players-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private model: GameStateService, private modalCtrl: ModalController) {}

  async startGame() {
    // this.model.players = [{name: 'Player one', hand: [], score: 0}];
    const modal = await this.modalCtrl.create({
      component: AddPlayersModalComponent,
      backdropDismiss:false
    });
    modal.present();
    await modal.onWillDismiss();
    this.model.setup();
    this.router.navigate(['game-field']);
  }

  showDeckOverview() {
    // this.model.players = [{name: 'Player one', hand: [], score: 0}];
    this.model.setup();
    this.router.navigate(['deck-overview']);
  }

}
