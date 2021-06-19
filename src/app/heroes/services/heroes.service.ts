import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>('http://localhost:3000/heroes');
  }

  public getHero(idHero: number): Observable<IHero> {
    return this.http.get<IHero>( `http://localhost:3000/heroes/${idHero}`)
  }

  public createHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>('http://localhost:3000/heroes', hero);
  }

  public editHero(hero: IHero): Observable<IHero> {
    return this.http.put<IHero>(`http://localhost:3000/heroes/${hero.id}`, hero);
  }


  public deleteHero(idHero: number): Observable<IHero> {
    return this.http.delete<IHero>(`http://localhost:3000/heroes/${idHero}`);
  }

}
