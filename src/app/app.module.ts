import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { TreasureComponent } from './treasure/treasure.component';

import { LandingComponent } from './landing/landing.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { HexcrawlComponent } from './hexcrawl/hexcrawl.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzRadioButtonModule, MzButtonModule, MzInputModule,
         MzCardModule, MzNavbarModule, MzSelectModule, MzSpinnerModule,
         MzModalModule, MzPaginationModule} from 'ngx-materialize';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DiceRollerComponent,
    HexcrawlComponent,
    WeatherTableComponent,
    TreasureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MzRadioButtonModule,
    MzButtonModule,
    MzInputModule,
    MzCardModule,
    MzNavbarModule,
    MzSelectModule,
    MzSpinnerModule,
    MzModalModule,
    MzPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
