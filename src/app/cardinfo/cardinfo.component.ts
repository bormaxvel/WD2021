import { Component, OnInit } from '@angular/core';
import { InfoForCard } from '../info-for-card';
import { MainLogicService } from '../main-logic.service';

@Component({
  selector: 'app-cardinfo',
  templateUrl: './cardinfo.component.html',
  styleUrls: ['./cardinfo.component.sass']
})
export class CardinfoComponent implements OnInit {

  constructor(private service:MainLogicService) {
    
   }

  info: InfoForCard[]=[];
  N: number = this.service.ID$;




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


  
}