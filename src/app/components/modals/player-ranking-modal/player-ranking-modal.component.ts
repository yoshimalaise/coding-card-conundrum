import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/player.interface';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-player-ranking-modal',
  templateUrl: './player-ranking-modal.component.html',
  styleUrls: ['./player-ranking-modal.component.scss'],
})
export class PlayerRankingModalComponent implements OnInit {
  sortedPlayers: Player[] = [];
  targetScore: number = 0;

  constructor(private modalCtrl: ModalController) {
   }

  ngOnInit() {}

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
