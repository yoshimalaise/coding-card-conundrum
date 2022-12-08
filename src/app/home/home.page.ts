import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStateService } from '../services/game-state.service';
import { ModalController } from '@ionic/angular';
import { AddPlayersModalComponent } from '../components/modals/add-players-modal/add-players-modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private model: GameStateService, private modalCtrl: ModalController, private deviceDetector: DeviceDetectorService) {}

  async startGame() {
    // this.model.players = [{name: 'Player one', hand: [], score: 0}];
    this.model.showTutorial = false;
    const modal = await this.modalCtrl.create({
      component: AddPlayersModalComponent,
      backdropDismiss:false
    });
    modal.present();
    await modal.onWillDismiss();
    this.model.setup();
    this.router.navigate([this.deviceDetector.isMobile() ? 'mobile-game-field' : 'game-field']);
  }

  showDeckOverview() {
    // this.model.players = [{name: 'Player one', hand: [], score: 0}];
    this.model.setup();
    this.router.navigate(['deck-overview']);
  }

  startTutorial() {
    this.model.players = [{name: 'Demo Player', hand: [], score: 0}];
    this.model.showTutorial = true;
    this.model.setup();
    this.router.navigate([this.deviceDetector.isMobile() ? 'mobile-game-field' : 'game-field']);
  }

}
