import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../Interfaces/Game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private myAppUrl = 'https://localhost:7133/';
  private myApiUrl = 'api/Game/';

  constructor(private http: HttpClient) { }

  getListGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  saveGame(game: Game): Observable<Game>{
    return this.http.post<Game>(`${this.myAppUrl}${this.myApiUrl}`, game);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateGame(id: number, game: Game): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
