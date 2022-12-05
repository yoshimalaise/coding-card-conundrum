import { Component, Input, OnInit } from '@angular/core';
import { EnvironmentCard } from 'src/app/model/environment-card.interface';

@Component({
  selector: 'app-environment-card',
  templateUrl: './environment-card.component.html',
  styleUrls: ['./environment-card.component.scss'],
})
export class EnvironmentCardComponent implements OnInit {
  @Input() environmentCard?: EnvironmentCard;

  constructor() { }

  ngOnInit() {}

}
