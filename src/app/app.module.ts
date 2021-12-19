import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Section2CardsComponent } from './section2-cards/section2-cards.component';
import { Section3FunctionalityComponent } from './section3-functionality/section3-functionality.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Section2CardsComponent,
    Section3FunctionalityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
