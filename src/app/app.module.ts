import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Section2CardsComponent } from './section2-cards/section2-cards.component';
import { Section3FunctionalityComponent } from './section3-functionality/section3-functionality.component';
import { CardinfoComponent } from './cardinfo/cardinfo.component';
import { VOIDComponent } from './void/void.component';

const routes: Routes = [
  {path: 'cardInfo', component: CardinfoComponent},
  {path: '', component: Section2CardsComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Section2CardsComponent,
    Section3FunctionalityComponent,
    CardinfoComponent,
    VOIDComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
