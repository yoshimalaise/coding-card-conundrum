import { Component, Input, OnInit } from '@angular/core';
import { GoalCard } from 'src/app/model/goal-card.interface';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss'],
})
export class GoalCardComponent implements OnInit {
  @Input() goalCard?: GoalCard;

  constructor() { }

  ngOnInit() {}

}
