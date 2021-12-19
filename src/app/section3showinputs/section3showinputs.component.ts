import { Component, OnInit } from '@angular/core';
import { MainLogicService } from '../main-logic.service';

@Component({
  selector: 'app-section3showinputs',
  templateUrl: './section3showinputs.component.html',
  styleUrls: ['./section3showinputs.component.sass']
})
export class Section3showinputsComponent implements OnInit {

  constructor(private service:MainLogicService) { }
  inputs:string[] = this.service.inputs

  ngOnInit(): void {
  }

}
