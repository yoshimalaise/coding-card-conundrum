import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { EnvironmentCardComponent } from './components/environment-card/environment-card.component';
import { CodeCardComponent } from './components/code-card/code-card.component';
import { GoalCardComponent } from './components/goal-card/goal-card.component';
import { DeckOverviewComponent } from './components/deck-overview/deck-overview.component';
import { AddPlayersModalComponent } from './components/modals/add-players-modal/add-players-modal.component';
import { FormsModule } from '@angular/forms';
import { GoalReachedModalComponent } from './components/modals/goal-reached-modal/goal-reached-modal.component';
import { PlayerRankingModalComponent } from './components/modals/player-ranking-modal/player-ranking-modal.component';
import { TracetableModalComponent } from './components/modals/tracetable-modal/tracetable-modal.component';
import { GameOverModelComponent } from './components/modals/game-over-model/game-over-model.component';

@NgModule({
  declarations: [AppComponent, GameFieldComponent, EnvironmentCardComponent, CodeCardComponent, GoalCardComponent, 
    DeckOverviewComponent, AddPlayersModalComponent, GoalReachedModalComponent, PlayerRankingModalComponent,
    TracetableModalComponent, GameOverModelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
