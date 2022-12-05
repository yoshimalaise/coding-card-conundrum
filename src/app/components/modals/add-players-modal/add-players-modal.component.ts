import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/model/player.interface';
import { GameStateService } from 'src/app/services/game-state.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-players-modal',
  templateUrl: './add-players-modal.component.html',
  styleUrls: ['./add-players-modal.component.scss'],
})
export class AddPlayersModalComponent implements OnInit {
  name: string = "";

  constructor(public model: GameStateService, private modalCtrl: ModalController) { }

  ngOnInit() {}

  addPlayer() {
    this.model.players.push({
      name: this.name,
      score: 0,
      hand: []
    });
    this.name = '';
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  removePlayer(p: Player) {
    this.model.players = this.model.players.filter(pp => pp !== p);
  }
}
