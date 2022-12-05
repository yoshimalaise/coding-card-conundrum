import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GoalCard } from 'src/app/model/goal-card.interface';
import { Player } from 'src/app/model/player.interface';

@Component({
  selector: 'app-goal-reached-modal',
  templateUrl: './goal-reached-modal.component.html',
  styleUrls: ['./goal-reached-modal.component.scss'],
})
export class GoalReachedModalComponent implements OnInit {
  card?: GoalCard;
  player?: Player;

  constructor(private modalCtrl: ModalController) { 
    if (this.player && this.card) {
    this.player.score += this.card?.score;
    }
  }

  ngOnInit() {}

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
}
