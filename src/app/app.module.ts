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

@NgModule({
  declarations: [AppComponent, GameFieldComponent, EnvironmentCardComponent, CodeCardComponent, GoalCardComponent, DeckOverviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
