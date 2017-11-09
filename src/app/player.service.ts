import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PlayerService {
  serverApi= 'http://138.197.210.245:80';
  constructor(private http: Http) {}
  getPlayers(): Observable<any> {
    let URI = `${this.serverApi}/scoreboard/`;
    return this.http.get(URI)
      .map(res => res.json());
  }
  getPlayer(player_id): Observable<any> {
    let URI = `${this.serverApi}/scoreboard/${player_id}`;
    return this.http.get(URI)
      .map(res => res.json());
  }
  saveProgress(player): Observable<Response>{
    let URI = `${this.serverApi}/scoreboard/${player._id}`;
    let headers = new Headers;
    let body = JSON.stringify(player);
    headers.append('Content-Type', 'application/json');
    return this.http.put(URI, body,{headers: headers})
      .map(res => res.json());
  }
  savePlayer(player): Observable<any>{
    let URI = `${this.serverApi}/scoreboard/`;
    let headers = new Headers;
    let body = JSON.stringify(player);
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body ,{headers: headers})
      .map(res => res.json());
  }
}
