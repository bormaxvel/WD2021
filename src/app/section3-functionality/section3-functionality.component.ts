import { Component, OnInit } from '@angular/core';
import { MainLogicService } from '../main-logic.service';

@Component({
  selector: 'app-section3-functionality',
  templateUrl: './section3-functionality.component.html',
  styleUrls: ['./section3-functionality.component.sass']
})
export class Section3FunctionalityComponent implements OnInit {

  constructor(private service:MainLogicService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this.service.inputs[0] = (<HTMLInputElement>document.getElementById("name")).value;
    this.service.inputs[1] = (<HTMLInputElement>document.getElementById("email")).value;
    this.service.inputs[2] = (<HTMLInputElement>document.getElementById("text")).value;
    
  }
}
