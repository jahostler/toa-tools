import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { HexcrawlComponent } from './hexcrawl/hexcrawl.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'dice',
    component: DiceRollerComponent
  },
  {
    path: 'hexcrawl',
    component: HexcrawlComponent
  },
  {
    path: 'weather',
    component: WeatherTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
