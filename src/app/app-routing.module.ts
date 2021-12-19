import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Section3FunctionalityComponent } from './section3-functionality/section3-functionality.component';
import { Section3showinputsComponent } from './section3showinputs/section3showinputs.component';

const routes: Routes = [
  {path: '', component: Section3FunctionalityComponent},
  {path: 'showinputs', component: Section3showinputsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
