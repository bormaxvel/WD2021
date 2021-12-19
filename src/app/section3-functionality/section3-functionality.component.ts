import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section3-functionality',
  templateUrl: './section3-functionality.component.html',
  styleUrls: ['./section3-functionality.component.sass']
})
export class Section3FunctionalityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.changeVisibility();
  }
  inputName$:string = "";
  inputEmail$:string = "";
  inputText$:string = "";

  onSubmit(){
    this.inputName$ = (<HTMLInputElement>document.getElementById("inputName")).value;
    this.inputEmail$ = (<HTMLInputElement>document.getElementById("inputEmail")).value;
    this.inputText$ = (<HTMLInputElement>document.getElementById("inputText")).value;
    if (this.inputName$ == ""){
      this.inputName$ = "'Not Imputted'";
    }
    if (this.inputEmail$ == ""){
      this.inputEmail$ = "'Not Imputted'";
    }
    if (this.inputText$ == ""){
      this.inputText$ = "'Not Imputted'";
    }
    this.changeVisibility();
  }


  visibility:string = "";
  changeVisibility(){
    if (this.visibility == ""){
      this.visibility = "invisible"
    }
    else{
      this.visibility = ""
    }
  }
}
