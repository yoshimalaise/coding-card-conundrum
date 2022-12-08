import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DeckOverviewComponent } from './components/deck-overview/deck-overview.component';
import { GameFieldComponent } from './components/game-field/game-field.component';
import { MobileGameFieldComponent } from './components/mobile-game-field/mobile-game-field.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'game-field',
    component: GameFieldComponent
  },
  {
    path: 'mobile-game-field',
    component: MobileGameFieldComponent
  },
  {
    path: 'deck-overview',
    component: DeckOverviewComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
