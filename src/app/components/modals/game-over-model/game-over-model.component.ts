import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/player.interface';

@Component({
  selector: 'app-game-over-model',
  templateUrl: './game-over-model.component.html',
  styleUrls: ['./game-over-model.component.scss'],
})
export class GameOverModelComponent implements OnInit {
  winningPlayer?: Player;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}
