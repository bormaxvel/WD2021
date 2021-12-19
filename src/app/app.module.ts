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
import { Section3showinputsComponent } from './section3showinputs/section3showinputs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Section2CardsComponent,
    Section3FunctionalityComponent,
    Section3showinputsComponent,
    Section3showinputsComponent
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
