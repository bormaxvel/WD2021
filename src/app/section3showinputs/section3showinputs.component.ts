import { Component, OnInit } from '@angular/core';
import { MainLogicService } from '../main-logic.service';

@Component({
  selector: 'app-section3showinputs',
  templateUrl: './section3showinputs.component.html',
  styleUrls: ['./section3showinputs.component.sass']
})
export class Section3showinputsComponent implements OnInit {

  constructor(private service:MainLogicService) { }
  inputstoinsert:string[] = this.service.inputs
  ngOnInit(): void {
    if (this.inputstoinsert[0] == ""){
      this.inputstoinsert[0] = "'Not Imputted'";
    }
    if (this.inputstoinsert[1] == ""){
      this.inputstoinsert[1] = "'Not Imputted'";
    }
    if (this.inputstoinsert[2] == ""){
      this.inputstoinsert[2] = "'Not Imputted'";
    }
  }

}
