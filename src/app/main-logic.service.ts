import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
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

  public count$ = new Subject<number>();
  public ID$:number = 0;

	public changeCount(count: number) {
    // this.count$.next(count);
    this.ID$ = count;
  }
}
