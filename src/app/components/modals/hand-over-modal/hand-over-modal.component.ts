import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/player.interface';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'app-hand-over-modal',
  templateUrl: './hand-over-modal.component.html',
  styleUrls: ['./hand-over-modal.component.scss'],
})
export class HandOverModalComponent implements OnInit {
  nextPlayer?: Player;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}
