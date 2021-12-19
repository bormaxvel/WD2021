import { Component, OnInit } from '@angular/core';
import { InfoForCard } from '../info-for-card';
import { MainLogicService } from '../main-logic.service';

@Component({
  selector: 'app-section2-cards',
  templateUrl: './section2-cards.component.html',
  styleUrls: ['./section2-cards.component.sass']
})
export class Section2CardsComponent implements OnInit {

  constructor(private service:MainLogicService) { 
}

  info: InfoForCard[]=[];

  ngOnInit(): void {
    this.changeVisibility(0);
    this.changeVisibility(1);
    this.changeVisibility(2);
    this.ToSubscribe();
  }

  visibility:string[] = ["","",""];


  public ToSubscribe(): InfoForCard[]{
    this.service.getLaba().subscribe(
    (labs)=>{
      console.log(labs);
      this.info = labs;
    }
    );
    return (this.info);
  }

  changeVisibility(n:number){
    if (this.visibility[n] == ""){
      this.visibility[n] = "invisible"
      console.log(this.visibility[n])
    }
    else{
      this.visibility[n] = ""
      console.log(this.visibility[n])
    }
    

    
  }


  
  
}
