import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section3-functionality',
  templateUrl: './section3-functionality.component.html',
  styleUrls: ['./section3-functionality.component.sass']
})
export class Section3FunctionalityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  inputName$:string = "";
  inputEmail$:string = "";
  inputText$:string = "";

  onSubmit(){
    this.inputName$ = (<HTMLInputElement>document.getElementById("inputName")).value;
    this.inputEmail$ = (<HTMLInputElement>document.getElementById("inputEmail")).value;
    this.inputText$ = (<HTMLInputElement>document.getElementById("inputText")).value;
  }
}
