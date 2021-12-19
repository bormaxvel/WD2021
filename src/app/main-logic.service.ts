import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoForCard } from './info-for-card';

@Injectable({
  providedIn: 'root'
})
export class MainLogicService {

  url:string = "http://localhost:3000/data"

  
  constructor(private http:HttpClient) { }
  
  // Повертає список лаб з сервера
  getLaba():Observable<InfoForCard[]>{
    return this.http.get<InfoForCard[]>(this.url);
  }



  public inputs:string[] = ["", "", ""]
}
