import { Component, Input, OnInit } from '@angular/core';
import { CodeCard } from 'src/app/model/code-card.interface';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss'],
})
export class CodeCardComponent implements OnInit {
  @Input() codeCard?: CodeCard;

  constructor() { }

  ngOnInit() {}

}
