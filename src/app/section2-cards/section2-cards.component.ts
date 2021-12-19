import { Component, OnInit } from '@angular/core';
import { InfoForCard } from '../info-for-card';
import { MainLogicService } from '../main-logic.service';

@Component({
  selector: 'app-section2-cards',
  templateUrl: './section2-cards.component.html',
  styleUrls: ['./section2-cards.component.sass']
})
export class Section2CardsComponent implements OnInit {

  constructor(private service:MainLogicService) { }

  info: InfoForCard[]=[];

  ngOnInit(): void {

    this.ToSubscribe();
  }

  
  

  public ToSubscribe(): InfoForCard[]{
    this.service.getLaba().subscribe(
    (labs)=>{
      console.log(labs);
      this.info = labs;
    }
    );
    return (this.info);
  }

  public changeNumberOfCurrentLab(n:number): void {
    this.service.changeCount(n);
  }


}
