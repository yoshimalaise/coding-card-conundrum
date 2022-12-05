import { Injectable } from '@angular/core';
import { CardTrail } from '../model/card-trail.interface';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  cardTrails: CardTrail[] = [];

  constructor() { }
}
