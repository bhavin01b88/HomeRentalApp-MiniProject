import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient : HttpClient) { }

  homes$ = new BehaviorSubject([]);

  loadHomes(homeTypeFilters : any){
    this.httpClient.get<any>('assets/homes.json').pipe(
      delay(2000),
      map(homes => {
        if(!homeTypeFilters.length){
          return homes;
        }
        return homes.filter((home : any) => homeTypeFilters.includes(home.type));
      })
    ).subscribe(homes => {
      this.homes$.next(homes);
    });
  }
}
